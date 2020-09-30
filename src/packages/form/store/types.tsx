import {
  FormArrayFieldRowsAtomType,
  FormFieldRegistryAtomType,
} from "../types";
import { DBSchema } from "idb";

export interface StoreType {
  setFormField: (formField: FieldType[]) => Promise<void>;
  getFormName: () => Promise<boolean | undefined>;

  setFormName: () => Promise<string>;
  setFormFieldRegistry: (
    formFields: FormFieldRegistryAtomType
  ) => Promise<string>;
  setArrayFields: (arrayField: FormArrayFieldRowsAtomType) => Promise<string>;
  getFormFieldsRegistry: () => Promise<FormFieldRegistryAtomType | undefined>;
  getArrayFields: () => Promise<FormArrayFieldRowsAtomType | undefined>;
  getFormFields: () => Promise<
    | {
        [key: string]: FieldType;
      }
    | undefined
  >;
  clearFormStore: () => Promise<void>;
}

export interface FieldType {
  name: string;
  fieldKey: string;
  value: any;
  touched: boolean;
  error: string | null;
}

export interface RecoilFormsDB extends DBSchema {
  persistance: {
    value: boolean;
    key: string;
  };
  formfields: {
    value: {
      [key: string]: FieldType;
    };
    key: string;
  };
  formFieldsRegistry: {
    value: FormFieldRegistryAtomType;
    key: string;
  };
  arrayFields: {
    value: FormArrayFieldRowsAtomType;
    key: string;
  };
}
