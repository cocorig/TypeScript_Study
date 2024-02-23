// let A: Array<string> = []; // 서브 타입
// let B: Array<string | number> = []; //슈퍼 타입

// B = A; // Ok
// A = B; // Error

type T<Param> = (param: Param) => void;
let A: T<number> = (param) => {
  // 매개변수로 number를 받는 A함수 => 서브타입(좁은 범위)
  console.log(param); // (parameter) param: number
};
let B: T<string | number> = (param) => {
  // 매개변수로 string | number를 받는 B함수 => 슈퍼타입(넓은 범위)
  console.log(param); // (parameter) param: string | number
};
A = B; // OK : 서브타입 = 슈퍼타입 (슈퍼타입이 서브타입에 대입이 가능하다.)
B = A; // Error : 'T<number>' 형식은 'T<string | number>' 형식에 할당할 수 없습니다.
