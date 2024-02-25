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
