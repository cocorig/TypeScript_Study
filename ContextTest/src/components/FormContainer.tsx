import React from "react";
import TextInput from "./TextInput";
type Props = {};

const FormContainer = () => {
  return (
    <div className="container">
      <h5>FormContainer</h5>
      <TextInput value="first" />
      <TextInput value="last" />
    </div>
  );
};

export default FormContainer;
