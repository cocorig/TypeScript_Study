import React from "react";

const TextInput = ({ value }: { value: "first" | "last" }) => {
  return (
    <div className="field">
      {value}: <input />
    </div>
  );
};

export default TextInput;
