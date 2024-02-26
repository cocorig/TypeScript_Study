//infer 키워드를 사용해 함수나 클래스의 타입을 파라미터화할 때 파라미터 타입을 추론함.
//예시 1)
// T extends infer U ? X : Y
type Todo<T> = T extends { a: infer U; b: infer U } ? U : never;
type myT10 = Todo<{ a: string; b: string }>; // type myT10 = string
type myT11 = Todo<{ a: string; b: number }>; // type myT11 = string | number

//예시 2)
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;
type T20 = Bar<{ a: (x: string) => void; b: (x: string) => void }>; // string
type T21 = Bar<{ a: (x: string) => void; b: (x: number) => void }>; // string & number

//예시3)함수의 매개변수 타입과 리턴 타입을 뽑아서 반환할 수 있음
//fn는 number,string,boolean을 매개변수로 받고,string | void를 반환하는 함수이다.
function fn(num: number, str: string, bool: boolean): string | void {
  return num.toString();
}

// `<T extends (...args: any) => any` 는 제네릭 타입 T가 함수인지 확인함
type My_ReturnType<T extends (...args: any) => any> = T extends (
  // T가 함수타입이야?
  ...args: any
) => infer R // infer R은 함수가 반환하는 타입을 추론
  ? R
  : any;
type My_Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer R //infer R은 매개변수들을 추론
) => any
  ? R
  : never;

type Return_Type = My_ReturnType<typeof fn>; // 함수의 리턴 타입을 반환
// type Return_Type = string | voi

type Parameters_Type = My_Parameters<typeof fn>; // 함수의 파라미터들의 타입을 반환
// type Parameters_Type = [num: number, ste: string, bool: boolean]

const myA: My_ReturnType<typeof fn> = "Hello";

const myB: My_Parameters<typeof fn> = [123, "Hello", true];
