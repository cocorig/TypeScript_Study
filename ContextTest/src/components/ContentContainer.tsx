import React from "react";
import FormContainer from "./FormContainer";
import DisplayContainer from "./DisplayContainer";
const ContentContainer = () => {
  console.log("ContentContainer");
  return (
    <div className="container">
      <h5>ContentContainer</h5>

      <FormContainer />
      <DisplayContainer />
    </div>
  );
};

export default ContentContainer;
