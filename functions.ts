function SayHi(age: number | undefined, name: string): string {
  if (age !== undefined) {
    return `Hello, ${name}. you are ${age}.`;
  } else {
    return `Hello, ${name}`;
  }
}

console.log(SayHi(undefined, "하연"));
console.log(SayHi(20, "하연"));

function add(...nums: number[]) {
  return nums.reduce((result, num) => result + num, 0);
}

add(1, 3, 4);

/// this의 타입을 정할 때
interface Cat {
  name: string;
  age: number;
  gender?: string;
}
const Coco: Cat = { name: "coco", age: 4 };

// 함수의 첫 번째 매개변수 자리에 this: 타입을 입력해준다.
function showName(this: Cat, age: number, gender: "m" | "f") {
  console.log(this.name, age, gender);
}

const coco2 = showName.bind(Coco);
coco2(2, "m");

///함수 오버로드(Overloading) 여러 가지 매개변수와 반환 유형을 가진 여러 버전의 함수를 정의하는 기능
// 다양한 형태의 입력을 받아 다른 방식으로 처리, 다양한 반환 유형을 가질 수 있는 경우 유용

function combine(a: number, b: number): number; // 시그니처 1
function combine(a: string, b: string): string; // 시그니처 2
function combine(a: any, b: any): any {
  // 구현
  return a + b;
}

const result1 = combine(1, 2); // 인자는 숫자이므로 시그니처 1이 선택됩니다.
const result2 = combine("Hello", "World"); // 인자는 문자열이므로 시그니처 2가 선택됩니다.
// const result3 = combine(true, false); // 오류: 시그니처와 일치하는 타입이 없으므로 에러 발생
interface UserInfo {
  name: string;
  age: number;
}

function join(name: string, age: string): string;
function join(name: string, age: number): UserInfo;
// 전달 받은 매개변수의 타입에 따라서 리턴해주는 결과 값이 달라짐 -> 오버로드 사용
function join(name: string, age: number | string): UserInfo | string {
  if (typeof age === "number") {
    return {
      name,
      age,
    };
  } else {
    return "나이는 숫자로 입력해주세요.";
  }
}

const hayeon: UserInfo = join("hayeon", 10);
console.log(hayeon); //{ name: 'hayeon', age: 10 }
const hahah: string = join("haha", "10");
console.log(hahah); //나이는 숫자로 입력해주세요.

function processData(data: string): string;
function processData(data: number): number;
function processData(data: string | number): string | number {
  if (typeof data === "string") {
    return data.toUpperCase(); // 문자열이면 대문자로 변환하여 반환
  } else {
    return data * 2; // 숫자면 2를 곱한 값을 반환
  }
}
console.log(processData("hello")); // 결과: 'HELLO' (문자열을 대문자로 변환)
console.log(processData(10)); // 결과: 10 (숫자에 2를 곱함)
