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

// 공변성
type Novel = () => "Harry Potter"; //서브타입, 더 구체적인 반환 타입
type Book = () => string; //슈퍼타입, 더 일반적인 반환 타입

let novelFunc: Novel = () => "Harry Potter";
let bookFunc: Book = () => "Book";

bookFunc = novelFunc; // OK: Novel은 Book의 서브타입이므로 할당 가능
novelFunc = bookFunc; // Error: 'Book' 형식은 'Novel' 형식에 할당할 수 없습니다.

// 반공변성 ----------------------------------------------------------------

type Novel = (title: "Harry Potter") => void; // 서브 타입
type Book = (title: string) => void; // 슈퍼타입

let novelFunc: Novel = (title) => {
  /*..*/
};
let bookFunc: Book = (title) => {
  /*..*/
};

novelFunc = bookFunc; // OK
bookFunc = novelFunc; // Error : 'Novel' 형식은 'Book' 형식에 할당할 수 없습니다.

//객체일 때 ----------------------------------------------------------------
interface Beverage {
  // 슈퍼타입
  name: string;
  size: string;
}

interface Coffee extends Beverage {
  // 서브타입
  kind: string;
}

let orderBeverage = (beverage: Beverage) =>
  console.log(
    `손님이 ${beverage.size} 사이즈의 ${beverage.name}를 주문하셨습니다.`
  );
let orderCoffee = (coffee: Coffee) =>
  console.log(
    `손님이 ${coffee.size} 사이즈의 ${coffee.kind} 커피를 주문하셨습니다.`
  );

orderCoffee = orderBeverage; // Ok
orderBeverage = orderCoffee; // Error : 'coffee' 및 'beverage' 매개 변수의 형식이 호환되지 않습니다.

// 매개변수 개수가 다를 경우----------------------------------------------------------------

type LoginProp = (email: string, name: string) => void;
type ResetPasswordProp = (email: string) => void;

let login: LoginProp = (email, name) => {
  console.log(`환영합니다, ${name}님! ${email} 계정으로 로그인하셨습니다`);
};

let resetPassword: ResetPasswordProp = (email) => {
  console.log(`${email}으로 비밀번호 재설정 메일이 전송되었습니다.`);
};

login("user@example.com", "이하연"); // "환영합니다, 이하연님! user@example.com 계정으로 로그인하셨습니다"
login = resetPassword; // Ok
login("user@example.com", "이하연"); // "user@example.com으로 비밀번호 재설정 메일이 전송되었습니다."

resetPassword = login; // Error : 'LoginFunc' 형식은 'ResetPasswordFunc' 형식에 할당할 수 없습니다.
// 만약 허용한다면
resetPassword("user@example.com"); // "환영합니다, undefined님! user@example.com 계정으로 로그인하셨습니다"
