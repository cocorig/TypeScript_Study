import React from "react";
import Shape from "./Shape";

const ShapeList = () => {
  return (
    <div>
      <Shape color="light-yellow" shape="cube" />
      <Shape color="dark-blue" shape="rectangle" />
      <Shape color="light-blue" shape="circle" />
    </div>
  );
};

export default ShapeList;
