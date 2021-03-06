import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface WrapperStyleProps {
  wrapper: BaseCSSProperties;
}

export type WrapperStyleNamesProps = Record<keyof WrapperStyleProps, string>;

export const wrapperStyles = (): any => ({
  wrapper: {
    background:
      "linear-gradient(0deg, rgba(94,231,131,1) 0%, rgba(70,199,165,1) 44%, rgba(33,150,218,1) 100%)",
    minHeight: "100vh",
  },
});
