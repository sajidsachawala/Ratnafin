import { GridSize, GridSpacing, GridDirection } from "@material-ui/core/Grid";
import {
  AllTextFieldProps,
  AllSelectFieldProps,
  AllCheckboxGroupProps,
  AllCheckboxProps,
  AllDatePickerProps,
  AllDateTimePickerProps,
  AllTimePickerProps,
  AllRadioProps,
  AllRatingProps,
  AllSliderProps,
  AllSwitchGroupProps,
  AllSwitchProps,
  AllNumberFormatProps,
  AllPasswordFieldProps,
  AllSpacerProps,
  AllToggleButtonGroupProps,
  AllInputMaskProps,
} from "./typesFields";
import {
  TextFieldPropsOptional,
  SelectPropsOptional,
  CheckboxGroupPropsOptional,
  CheckboxPropsOptional,
  DatePickerPropsOptional,
  DateTimePickerPropsOptional,
  TimePickerPropsOptional,
  RadioPropsOptional,
  RatingPropsOptional,
  SliderPropsOptional,
  SwitchPropsOptional,
  SwitchGroupPropsOptional,
  NumberFormatPropsOptional,
  PasswordFieldPropsOptional,
  ToggleButtonGroupPropsOptional,
  InputMaskPropsOptional,
} from "./typesFields";
import { To } from "history";

export interface FormRenderConfigType {
  ordering: "auto" | "sequence";
  renderType: "simple" | "tabs" | "stepper" | "accordian"; //implimentation pending
  labels?: {
    next?: string;
    prev?: string;
    complete?: string;
  };
  groups?: string[];
  gridConfig: {
    item?: {
      xs?: GridSize;
      sm?: GridSize;
      md?: GridSize;
      spacing?: GridSpacing;
    };
    container: {
      direction?: GridDirection;
      spacing?: GridSpacing;
    };
  };
}

export interface FormMetaDataType {
  name: string;
  label: string;
  resetFieldOnUmnount: boolean;
  validationRun: "onBlur" | "onChange" | "all";
  render: FormRenderConfigType;
  componentProps: ComponentTypeProps;
  navigation: {
    nextPage: To;
  };
}

export interface ComponentTypeProps {
  textField?: TextFieldPropsOptional;
  select?: SelectPropsOptional;
  checkbox?: CheckboxPropsOptional;
  checkboxGroup?: CheckboxGroupPropsOptional;
  datetimePicker?: DateTimePickerPropsOptional;
  datePicker?: DatePickerPropsOptional;
  timePicker?: TimePickerPropsOptional;
  radio?: RadioPropsOptional;
  rating?: RatingPropsOptional;
  slider?: SliderPropsOptional;
  switch?: SwitchPropsOptional;
  switchGroup?: SwitchGroupPropsOptional;
  numberFormat?: NumberFormatPropsOptional;
  passwordField?: PasswordFieldPropsOptional;
  toggleButtonGroup?: ToggleButtonGroupPropsOptional;
  inputMask?: InputMaskPropsOptional;
}

export interface MetaDataType {
  form: FormMetaDataType;
  fields: FieldMetaDataType[];
}

export type FieldMetaDataType =
  | AllTextFieldProps
  | AllSelectFieldProps
  | AllCheckboxGroupProps
  | AllCheckboxProps
  | AllDatePickerProps
  | AllDateTimePickerProps
  | AllTimePickerProps
  | AllRadioProps
  | AllRatingProps
  | AllSliderProps
  | AllSwitchGroupProps
  | AllSwitchProps
  | AllNumberFormatProps
  | AllPasswordFieldProps
  | AllToggleButtonGroupProps
  | AllSpacerProps
  | AllInputMaskProps;

/* Yup Rules Types*/
export interface YupSchemaMetaDataType {
  type: string;
  rules?: YupRulesType[];
}

interface YupRulesType {
  name: string;
  params: any[];
}

export interface RenderedFieldsType {
  fields: JSX.Element[];
  sequence: number[];
  fieldNames: string[];
}

export interface GroupWiseRenderedFieldsType {
  [key: string]: RenderedFieldsType;
}
