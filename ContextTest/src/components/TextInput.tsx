import React, { ChangeEvent } from "react";
import createFastContext from "../contexts/createFastContext";

const { useStore } = createFastContext({
  first: "",
  last: "",
});
const TextInput = ({ value }: { value: "first" | "last" }) => {
  const [fieldValue, setFieldValue] = useStore((store) => store.first);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue({ first: e.target.value });
  };

  return (
    <div className="field">
      First: <input value={fieldValue} onChange={handleChange} />
    </div>
  );
};

export default TextInput;
