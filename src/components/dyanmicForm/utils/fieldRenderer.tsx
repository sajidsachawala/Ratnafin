import { lazy, FC } from "react";

import {
  FormRenderConfigType,
  ComponentTypeProps,
  FieldMetaDataType,
} from "../types";

const CheckboxGroup = lazy(() =>
  import("components/common/checkbox").then((module) => ({
    default: module.CheckboxGroup,
  }))
);

const Checkbox = lazy(() =>
  import("components/common/checkbox").then((module) => ({
    default: module.Checkbox,
  }))
);

const SwitchGroup = lazy(() =>
  import("components/common/switch").then((module) => ({
    default: module.SwitchGroup,
  }))
);

const Switch = lazy(() =>
  import("components/common/switch").then((module) => ({
    default: module.Switch,
  }))
);

const DatePicker = lazy(() =>
  import("components/common/datetime").then((module) => ({
    default: module.DatePicker,
  }))
);
const DateTimePicker = lazy(() =>
  import("components/common/datetime").then((module) => ({
    default: module.DateTimePicker,
  }))
);
const TimePicker = lazy(() =>
  import("components/common/datetime").then((module) => ({
    default: module.TimePicker,
  }))
);
const TextField = lazy(() => import("components/common/textField"));
const Select = lazy(() => import("components/common/select"));
const Radio = lazy(() => import("components/common/radio"));
const Slider = lazy(() => import("components/common/slider"));
const Rating = lazy(() => import("components/common/rating"));
const Spacer = lazy(() => import("components/common/spacer"));
const ToggleButtonGroup = lazy(
  () => import("components/common/toggleButtonGroup")
);
const NumberFormat = lazy(() => import("components/derived/numberFormat"));
const PasswordField = lazy(() => import("components/derived/passwordField"));
const InputMask = lazy(() => import("components/derived/inputMask"));

const EmptyComponent: FC<{ componentType: string }> = ({ componentType }) => {
  return <div>No Component of type: ${componentType}</div>;
};

export const renderField = (
  fieldObj: FieldMetaDataType,
  formRenderConfig: FormRenderConfigType,
  componentProps: ComponentTypeProps
) => {
  const { render, schemaValidation, defaultValue, ...others } = fieldObj;
  let Component: any = null;
  switch (render.componentType) {
    case "textField":
      Component = TextField;
      break;
    case "select":
      Component = Select;
      break;
    case "checkbox":
      Component = Checkbox;
      break;
    case "checkboxGroup":
      Component = CheckboxGroup;
      break;
    case "radio":
      Component = Radio;
      break;
    case "switch":
      Component = Switch;
      break;
    case "switchGroup":
      Component = SwitchGroup;
      break;
    case "slider":
      Component = Slider;
      break;
    case "rating":
      Component = Rating;
      break;
    case "datePicker":
      Component = DatePicker;
      break;
    case "timePicker":
      Component = TimePicker;
      break;
    case "datetimePicker":
      Component = DateTimePicker;
      break;
    case "passwordField":
      Component = PasswordField;
      break;
    case "numberFormat":
      Component = NumberFormat;
      break;
    case "toggleButtonGroup":
      Component = ToggleButtonGroup;
      break;
    case "inputMask":
      Component = InputMask;
      break;
    case "spacer":
      Component = Spacer;
      break;
    default:
      Component = EmptyComponent;
      break;
  }
  if (Component === EmptyComponent) {
    return <Component componentType={render.componentType} />;
  } else if (Component === Spacer) {
    return <Component key={others.name} {...others} />;
  } else {
    const currentComponentTypeProps = componentProps[render.componentType];
    const allProps = { ...currentComponentTypeProps, ...others };
    const gridConfigOverrides = {
      ...formRenderConfig?.gridConfig?.item,
      ...others?.GridProps,
    };
    return (
      <Component
        {...allProps}
        fieldKey={others.name}
        key={others.name}
        enableGrid={true}
        GridProps={{
          item: true,
          xs: gridConfigOverrides?.xs ?? "auto",
          md: gridConfigOverrides?.sm ?? "auto",
          xl: gridConfigOverrides?.xs ?? "auto",
        }}
      />
    );
  }
};
