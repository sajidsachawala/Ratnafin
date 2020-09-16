import * as React from "react";
import { RecoilRoot } from "recoil";
import {
  TextField,
  FormFeedBack,
  ArrayField,
  Checkbox,
  CheckboxGroup,
  Radio,
  Switch,
  SwitchGroup,
  Slider,
  Select,
  DatePicker,
  TimePicker,
  Rating,
} from "components/common";

import { useForm, TimeTravelObserver } from "packages/form";
import Button from "@material-ui/core/Button";
import * as yup from "yup";
import { yupValidationHelper } from "components/utils/yupValidator";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormNameContext } from "packages/form";

const App = () => {
  return (
    <RecoilRoot>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormNameContext.Provider value={"demoForm"}>
          <MainApp />
          <TimeTravelObserver />
        </FormNameContext.Provider>
      </MuiPickersUtilsProvider>
    </RecoilRoot>
  );
};

const MainApp = () => {
  const onSubmitHandler = (values, submitStart, submitEnd, setFieldsError) => {
    submitStart();
    setTimeout(() => {
      console.log(values);
      submitEnd(false, "Invalid request");
      setFieldsError({ firstName: "errr email taken" });
    }, 3000);
  };

  const { handleSubmit, handleReset, handleClear } = useForm({
    onSubmit: onSubmitHandler,
    inititalValues: {
      firstName: "deva@gmail.com",
      password: "dsfdssddfgdfs",
      contact: [
        { tel: 34353445, tag: 12 },
        { tel: 3335, tag: 13 },
      ],
    },
  });

  return (
    <React.Fragment>
      <FormFeedBack />
      <TextField
        name="firstName"
        fieldKey="firstName"
        type="email"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="username email"
        validate={yupValidationHelper(
          yup
            .string()
            .required("email is required")
            .email("should be valid email")
        )}
      />
      <TextField
        name="password"
        fieldKey="password"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        autoComplete="current-password"
        validate={yupValidationHelper(
          yup.string().required("password is required")
        )}
      />
      <Checkbox name="rememberMe" fieldKey="rememberMe" label="rememberMeee" />
      <CheckboxGroup
        fieldKey="food"
        name="food"
        label="pick flavor"
        options={[
          { label: "ice-cream", value: "ic" },
          { label: "oreo", value: "o" },
        ]}
      />
      <Switch
        fieldKey="rememberMeee"
        name="rememberMeee"
        label="rememberMeee"
      />
      <SwitchGroup
        fieldKey="foodo"
        name="foodo"
        label="pick flavor"
        options={[
          { label: "ice-cream", value: "ic" },
          { label: "oreo", value: "o" },
        ]}
      />
      <Radio
        name="gender"
        fieldKey="gender"
        label="Gender"
        options={[
          { label: "Male", value: "m" },
          { label: "Female", value: "f" },
        ]}
      />
      <Select
        name="candy"
        fieldKey="candy"
        label="Candy"
        autoWidth={true}
        options={[
          { label: "Orange", value: "o" },
          { label: "Mango", value: "m" },
          { label: "Peach", value: "p" },
          { label: "Berry", value: "b" },
        ]}
      />
      <Slider
        fieldKey="ranking"
        name="ranking"
        key="ranking"
        label="My Ranking"
      />
      <Select
        name="candyx"
        fieldKey="candyx"
        label="Candy-X"
        autoWidth={true}
        options={(dependentFields) => {
          return [
            { label: "OrangeX", value: "o" },
            { label: "MangoX", value: "m" },
            { label: "PeachX", value: "p" },
            { label: "BerryX", value: "b" },
          ];
        }}
      />
      <DatePicker
        name="todays"
        fieldKey="todays"
        label="todaysData"
        placeholder="dd/mm/yyyy"
        format="dd/MM/yyyy"
      />
      <TimePicker
        name="tonight"
        fieldKey="tonight"
        label="tonight"
        placeholder="HH:MM:SS"
        mask="__:__ _M"
      />
      <Rating fieldKey="grade" name="grade" label="Grading" />
      <ArrayField
        arrayFieldName="contact"
        template={{ tel: "", tag: "" }}
        renderRowsFn={(props) => {
          const { row, removeFn, fields, rowIndex } = props;
          const oneRow = fields.map((field) => {
            return (
              <TextField
                name={row.cells[field].name}
                fieldKey={row.cells[field].key}
                key={row.cells[field].key}
                type="text"
                variant="outlined"
                margin="normal"
                label={field}
                validate={yupValidationHelper(
                  yup.number().required("this is required field")
                )}
              />
            );
          });
          return (
            <div key={row.fieldKey}>
              {oneRow}
              <button onClick={() => removeFn(rowIndex)}>Remove Key</button>
            </div>
          );
        }}
        renderParentFn={({ rows, key, push }) => {
          return (
            <div key={key}>
              <button onClick={() => push()}>Add</button>
              {rows}
            </div>
          );
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Sign In
      </Button>
      <Button
        component="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClear}
      >
        Clear
      </Button>
    </React.Fragment>
  );
};

export default App;