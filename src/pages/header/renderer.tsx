/**
 * Nav --->
 *         NavItem
 *         UnControlledDropDown
 *                            ---->
 *                                 DropDownToggle
 *                                          ----->
 *                                              TextNode
 *                                              AnchorTag
 *                                 DropDownMenu
 *                                          ----->
 *                                               UnControlledDropDown
 *                                               DropdownItem
 */

import { FC, useState } from "react";
import {
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import { NavItemType, NavBarType } from "./types";
import { HeaderNameProps } from "./style";
import { useNavigate } from "react-router-dom";

export interface NavRendererType {
  metaData: NavBarType;
  classes: HeaderNameProps;
}

const overrideMetaData = (metaData: NavBarType) => {
  if (Array.isArray(metaData.navItems)) {
    return metaData.navItems.map((one) => {
      let result = one;
      if (one.isRouterLink !== true && Boolean(one.href)) {
        result = { ...metaData.config, ...one };
        if (!Boolean(one.href)) {
          result.href = "#";
        }
      } else if (!Boolean(one.href) && !Array.isArray(one.children)) {
        result.href = "/notFound";
      }
      if (result.children !== undefined && Array.isArray(result.children)) {
        result.children = overrideMetaData({
          navItems: result.children,
          config: metaData.config,
        });
      }
      return result;
    });
  } else {
    return [];
  }
};

export const NavRenderer: FC<NavRendererType> = ({ metaData, classes }) => {
  const navigate = useNavigate();
  const newMetaData = overrideMetaData({ ...metaData });
  let result;
  if (Array.isArray(newMetaData) && newMetaData.length > 0) {
    result = newMetaData.map((item) => {
      if (Array.isArray(item.children)) {
        return <NestedNavItem key={item.label} item={item} classes={classes} />;
      } else {
        return (
          <NavItem key={item.label}>
            {Boolean(item.isRouterLink) === true ? (
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href !== undefined) {
                    navigate(item.href, {
                      state: { formCode: item.formCode },
                    });
                  }
                }}
              >
                {item.label}
              </NavLink>
            ) : (
              <NavLink href={item.href} target={item.target} rel={item.rel}>
                {item.label}
              </NavLink>
            )}
          </NavItem>
        );
      }
    });
  } else {
    result = <div>Invalid metadata for navigation</div>;
  }
  return result;
};

export interface NestedNavItemProps {
  item: NavItemType;
  classes: HeaderNameProps;
  direction?: string;
}

const NestedNavItem: FC<NestedNavItemProps> = ({
  item,
  classes,
  direction,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleShow = (e) => {
    e?.stopPropogation?.();
    if (open === false) {
      setOpen(true);
    }
  };
  const handleHide = (e) => {
    e?.stopPropogation?.();
    if (open === true) {
      setOpen(false);
    }
  };
  const toggle = () => {
    setOpen((prev) => !prev);
  };
  let result;
  if (Array.isArray(item.children)) {
    result = (
      <Dropdown
        tag="li"
        key={item.label}
        direction={Boolean(direction) ? direction : undefined}
        inNavbar={true}
        isOpen={open}
        onMouseOver={handleShow}
        onMouseLeave={handleHide}
        toggle={toggle}
      >
        <DropdownToggle tag="div" className="nav-link pointer" caret={true}>
          {Boolean(item.isRouterLink) === true || !Boolean(item.href) ? (
            <NavLink
              onClick={(e) => {
                e.preventDefault();
                if (item.href !== undefined) {
                  navigate(item.href, {
                    state: { formCode: item.formCode },
                  });
                }
              }}
            >
              {item.label}
            </NavLink>
          ) : (
            <NavLink href={item.href} target={item.target} rel={item.rel}>
              {item.label}
            </NavLink>
          )}
        </DropdownToggle>
        <DropdownMenu tag="ul" className={classes.headerDropdown + " onestep"}>
          {item.children.map((one) => {
            if (Array.isArray(one.children)) {
              return (
                <NestedNavItem
                  key={one.label}
                  item={one}
                  classes={classes}
                  direction="right"
                />
              );
            } else {
              return Boolean(
                one.isRouterLink === true || !Boolean(one.href)
              ) ? (
                <DropdownItem
                  tag="a"
                  key={one.label}
                  onClick={(e) => {
                    e.preventDefault();
                    if (one.href !== undefined) {
                      navigate(one.href, {
                        state: { formCode: one.formCode },
                      });
                    }
                    handleHide(e);
                    //this is a stupid hack, but works for now, need to find a proper workaround
                    document.getElementById("root")?.click();
                  }}
                >
                  {one.label}
                </DropdownItem>
              ) : (
                <DropdownItem
                  tag="a"
                  key={one.label}
                  href={one.href}
                  rel={one.rel}
                  target={one.target}
                  onClick={(e) => {
                    handleHide(e);
                    //this is a stupid hack, but works for now, need to find a proper workaround
                    document.getElementById("root")?.click();
                  }}
                >
                  {one.label}
                </DropdownItem>
              );
            }
          })}
        </DropdownMenu>
      </Dropdown>
    );
  } else {
    result = <div>oops</div>;
  }
  return result;
};