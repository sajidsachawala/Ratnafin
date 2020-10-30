import { MetaDataType } from "components/dyanmicForm/types";
import { getPropertyCity, getMiscVal } from "meta/fns";

const CommercialIndustrialSalariedQuesMetaData: MetaDataType = {
  form: {
    name: "questions1-1",
    label: "Step 1",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    navigation: {
      nextPage: "/",
    },
    render: {
      ordering: "auto",
      renderType: "stepper",
      groups: ["Step 1", "Step 2"],
      gridConfig: {
        item: {
          xs: 12,
          sm: 4,
          md: 4,
        },
        container: {
          direction: "row",
          spacing: 2,
        },
      },
    },
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
    },
  },

  fields: [
    {
      render: {
        componentType: "inputMask",
        group: 0,
      },
      name: "panNumber",
      type: "text",
      label: "Pan Card Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Pan Number is required"] },
          {
            name: "matches",
            params: [
              /([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/,
              "Please enter valid Pan Card Number",
            ],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      MaskProps: {
        mask: /^\w+$/,
        prepare: function (str) {
          return str.toUpperCase();
        },
        lazy: true,
      },
    },
    {
      render: {
        componentType: "inputMask",
        group: 0,
      },
      name: "aadharNumber",
      type: "text",
      label: "Aadhar Card Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Aadhar Number is required"] },
          {
            name: "matches",
            params: [/^\d{4}\d{4}\d{4}$/, "Please enter valid Aadhar Number"],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      MaskProps: {
        mask: "0000` 0000` 0000",
        lazy: true,
      },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "proprtyCity",
      label: "Property City",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getPropertyCity,
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Propert City is Required";
        }
      },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "proprtyType",
      label: "Type of Property",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("PROPERTY_TYPE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Select Valid Option";
        }
      },
    },
    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "monthlyEmiPay",
      type: "text",
      label: "Total Monthly Emi Pay",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },

      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["This field is required"] },
          { name: "required", params: ["This field is required"] },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
      },
      validationRun: "onChange",
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "otherSourceOfIncome",
      label: "Any Other Source of Income",
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("INCOME_SOURCE"),
      runPostValidationHookAlways: true,
      // validate: (fieldData) => {
      //   if (fieldData.value === "0") {
      //     return "Select Valid Option";
      //   }
      // },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "presentResidentialStatus",
      label: "Present Residential Status",
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("RESI_STATUS"),
      runPostValidationHookAlways: true,
      // validate: (fieldData) => {
      //   if (fieldData.value === "0") {
      //     return "Select Valid Option";
      //   }
      // },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "offeredByRBI",
      label: "Availed Moratorium offered by RBI",
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select option", value: "0" },
              { label: "Yes", value: "Y" },
              { label: "No", value: "N" },
            ]);
          }, 1000);
        });
      },
      // runPostValidationHookAlways: true,
      // validate: (fieldData) => {
      //   if (fieldData.value === "0") {
      //     return "Propert City is Required";
      //   }
      // },
    },
  ],
};

export default CommercialIndustrialSalariedQuesMetaData;