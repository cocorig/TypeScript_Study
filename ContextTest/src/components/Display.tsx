import React from "react";
import createFastContext from "../contexts/createFastContext";

const { useStore } = createFastContext({
  first: "",
  last: "",
});
const Display = ({ value }: { value: "first" | "last" }) => {
  const [fieldValue] = useStore((store) => store[value]);
  return (
    <div className="value">
      {value}: {fieldValue}
    </div>
  );
};

export default Display;
