///extends ------
type SomeType = string;
type MyConditionalType = SomeType extends string ? string : null;

function someFunc<T>(value: T) {
  type A = T extends boolean
    ? "Type A"
    : T extends string
    ? "Type B"
    : T extends number
    ? "Type C"
    : "Type D";
  const someOtherFunc = (args: T extends boolean ? "Type A" : "Type B") => {
    const a: "Type A" | "Type B" = args;
  };
  return someOtherFunc;
}

const resultType = someFunc(""); //resultType의 타입 ->const resultType: (args: "Type B") => void

const resultType1 = someFunc(true);
//const resultType1: (args: "Type A") => void

type StringOrNot<T> = T extends string ? string : never; // never사용 필터링
type AUnion = string | boolean | never; //type AUnion = string | boolean
type ResultType = Exclude<"a" | "b" | "c", "a" | "b">;

/*
'a' extends 'a' | 'b' ? never : 'a' => never
'b' extends 'a' | 'b' ? never : 'b' => never
'c' extends 'a' | 'b' ? never : 'c' => 'c'
*/

// type MyType<T> = (() => T) extends () => string | number ? T : never;
type MyType<T> = [T] extends () => [string | number] ? T : never;
type MyResult = MyType<number | number>;

///infer ------

type InferSomeThing<T> = T extends infer U ? U : any;
type Inferred = InferSomeThing<"나는 문자열이지롱">;

type InfersSomeThing2<T> = T extends { a: infer A; b: infer B } ? A & B : any;
type Inferred2 = InfersSomeThing2<{
  a: { somePropA: 1 };
  b: { somePropB: "B" };
}>;
//type Inferred2 = "안녕"
type MyFuncReturnValue = ReturnType<() => true>;

// T extends U ? X : Y ------

// 예시 1
// 제네릭이 string이면 문자열배열, 아니면 넘버배열
type StringOrNumber<T> = T extends string ? string[] : number[];

type T1 = StringOrNumber<string>; // type T1 = string[]
type T2 = StringOrNumber<number>; // type T2 = number[]

const animeNames: T1 = ["주술회전", "너의 이름은", "센과 치히로"];
const releaseYears: T2 = [2021, 2016, 2001];

// 예시 2
interface AnimeData<T extends boolean> {
  //<T extends boolean>이게 true면 data프로퍼티는 string타입,아니면 number타입으로 할당된다.
  // T는 boolean으로 제한
  titleOrYear: T extends true ? string : number;
  isTitle: T; // 조건없이 할당
}

const animeTitle: AnimeData<true> = {
  titleOrYear: "주술회전", //(property) AnimeData<true>.titleOrYear: string
  isTitle: true, //(property) AnimeData<true>.isTitle: true
};

const animeReleaseYear: AnimeData<false> = {
  titleOrYear: 2021, //(property) AnimeData<false>.titleOrYear: number
  isTitle: false, //(property) AnimeData<false>.isTitle: false
};

// 가독성이 안좋음
/*
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

type T0 = TypeName<string>; // "string"
type T1 = TypeName<"a">; // "string"
type T2 = TypeName<true>; // "boolean"
type T3 = TypeName<() => void>; // "function"
type T4 = TypeName<string[]>; // "object"
 */

///never---------
// 조건부 타입에서 never타입으로 분산될 경우 이 타입은 제외 시킨다는 특징이 있음.

type Never<T> = T extends number ? T : never; //T가  number이 아니면 다 제거하겠다~.

type Types = number | string | object;
//type myT2 = Never<Types>; // type myT2 = number
// 분산과정
// 1.(number extends number ? T : never) | (string extends number ? T : never) | (object extends number ? T : never) // 각각 분배

// 2. number | never | never
// 3. number

// 예시 1) 유니온 타입을 받아 T와 U를 비교해 U와 겹치는 타입들은 제외한 T를 반환하는 타입
type MyExclude<T, U> = T extends U ? never : T;

type myT2 = MyExclude<1 | 3 | 5 | 7, 1 | 5 | 9>; // U 제네릭(1 | 5 | 9)에 속해있지 않은 3 | 7 만 반환됨 ,type myT2 = 3 | 7
type myT3 = MyExclude<string | number | (() => void), Function>; // U 제네릭(Function)에 속해있지 않은 string | number 만 반환 됨//type myT3 = string | number
export {};

//예시 2) 유니온 타입을 받아 T와 U를 비교해 U와 겹치는 타입들만 재구성해 T를 반환하는 타입
type My_Extract<T, U> = T extends U ? T : never;

type T4 = My_Extract<1 | 3 | 5 | 7, 1 | 5 | 9>; // U 제네릭에(1 | 5 | 9) 속해있는 1 | 5 만 반환됨
//type T4 = 1 | 5
export {};
