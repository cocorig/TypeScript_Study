import React from "react";

const Display = ({ value }: { value: "first" | "last" }) => {
  return (
    <div className="value">
      {value}: {""}
    </div>
  );
};

export default Display;
