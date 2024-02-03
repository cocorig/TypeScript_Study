import React from "react";

type ShapeType = "cube" | "square" | "rectangle" | "circle";
type TwoDShapeType = Exclude<ShapeType, "cube">;
// type TwoDShapeType = "square" | "rectangle" | "triangle"
type ThemeType = "dark" | "light";
type ColorType = "red" | "blue" | "yellow";

type ItemProps = {
  // color: `${ThemeType}-${ColorType}`;
  shape: ShapeType;
  color: Exclude<`${ThemeType}-${ColorType}`, "dark-yellow">;
};
/*
(property) color: "dark-red" | "dark-blue" | "light-red" | "light-blue" | "light-yellow"

 */
const Shape = (props: ItemProps) => {
  const ShapeStyle = `shape ${props.shape} ${props.color}`;

  return (
    <div className={ShapeStyle}>
      <p>{props.color}</p>
    </div>
  );
};

export default Shape;

/* 
Exclude<T, U> U에 할당할 수 있는 유형은 T에서 제외
T extends U ? X : Y -> 조건식 결과에 따라 X가 될 수도, Y가 될 수도 있다.
T에 오는 타입들 중 U에 오는 것들은 제외하겠다는 의미이다.
type Exclude<T, U> = T extends U ? never : T;
어떤 유니온 타입에서 특정한 타입들을 제외하려고 할 때 보통 사용하게 된다.
*/
