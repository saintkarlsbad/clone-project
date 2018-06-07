import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import CheckBox from 'material-ui/Checkbox';
import Checkbox from 'material-ui/Checkbox/Checkbox';
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";

function disablePastDates(date) {
    if (date.getTime() < Date.now()) return true;
}

export function cabinDatePicker(props) {
    return (
        <DatePicker
            name={props.name}
            floatingLabelText={props.label}
            shouldDisableDate={disablePastDates}
            autoOk={true}
            value={props.input.value ? props.input.value : {}}
            onChange={(event, value, index) => {
                props.input.onChange(value);
            }}
            hintText={props.label}
            errorText={props.meta.touched && props.meta.error}
        />
    );
}

export const showCheckbox = props => {
    return (
        <Checkbox
            label={props.label}
            checked={props.input.value ? props.input.value : false}
            value={props.input.value}
            onCheck={(event, value) => {
                props.input.onChange(event, value)
            }}
        />
    )
}

export const showSimpleCheckbox = props => {
    return (
        <Checkbox
            label={props.label}
            checked={props.input.value}
            onCheck={props.input.onChange}
        />
    )
}

export function showSelectedField(formProps) {
    return (
        <SelectField
            name={formProps.name}
            floatingLabelText={formProps.label}
            errorText={formProps.meta.touched && formProps.meta.error}
            {...formProps.input}
            children={formProps.children}
            onChange={(event, index, value) => {
                formProps.input.onChange(value);
            }}
        />
    )
}

export function showSelectFieldControlled(formProps) {
    return (
      <SelectField
        floatingLabelText={formProps.label}
        errorText={formProps.meta.touched && formProps.meta.error}
        {...formProps.input}
        children={formProps.children}
        value={formProps.number}
        onChange={(event, index, value) => {
          formProps.clearErrors();
          formProps.input.onChange(value);
        }}
      />
    );
  }
  
  export function showSimpleSelectField(formProps) {
    return (
      <SelectField
        floatingLabelText={formProps.label}
        errorText={formProps.meta.touched && formProps.meta.error}
        {...formProps.input}
        children={formProps.children}
        onChange={(event, index, value) => {
          formProps.clearErrors();
          formProps.input.onChange(value);
        }}
      />
    );
  }


  export function showPriceField(props) {
    let value = 0;
  
    if (isNaN(props.input.value)) {
      value = "";
    } else if (typeof props.input.value === "string") {
      if (props.input.value === "") {
        value = "";
      } else {
        value = Number(props.input.value);
      }
    } else {
      value = props.input.value;
    }
  
    return (
      <TextField
        hintText={props.label}
        floatingLabelText={props.label}
        value={value}
        onChange={props.input.onChange}
        disabled={props.disabled}
        errorText={props.meta.touched && props.meta.error}
      />
    );
  }
  
  export function showTextField(props) {
    return (
      <TextField
        hintText={props.label}
        floatingLabelText={props.label}
        value={props.input.value}
        errorText={props.meta.touched && props.meta.error}
        {...props.input}
        type={props.type}
        disabled={props.disabled}
        rows={props.rows}
        multiLine={props.multiLine}
        rowsMax={props.rowsMax}
      />
    );
  }
  
