import type Name from "./module4";
import type { Age } from "./module4"; //값이 아니라 타입을 불러온다. (Type-Only import/export)라고 부른다,
const name: Name = {
  first: "zero",
  last: "cho",
};

const age: Age = {
  american: 28,
  korean: 30,
};
//Type-Only import/export 주의 점
// 이렇게 같이 한번에 쓸 수 없다.
//import type Name, { Age } from "./module4";//형식 전용 가져오기는 기본 가져오기 또는 명명된 바인딩을 지정할 수 있지만, 둘 다 지정할 수는 없다.
