// let user: object;

// user = {
//   name: "xx",
//   age: 30,
// };
// console.log(user.name);
//JavaScript와 달리 TypeScript는 변수의 타입을 명시적으로 선언하지 않으면, 그 변수는 어떤 타입의 값이든 할당할 수 있는 any 타입으로 간주
// 때문에 user 변수가 어떤 형태의 객체든 할당할 수 있기 때문에 TypeScript는 해당 객체의 속성이 무엇인지 알 수 없다.
// ->  user.name과 같이 속성에 접근하려고 하면  'object' 형식에 'name' 속성이 없습니다. 오류남
// -> 해결방법  : 변수에 타입을 명시~ ,

// 인터페이스(Interface)는 TypeScript에서 객체의 구조를 정의
// 언제 사용할까?
// 객체의 구조를 명확히 해야 할 때: 코드에서 객체의 형태를 정의하여 일관성을 유지하고 싶을 때 사용한다. 예를 들어, 다양한 객체가 유사한 속성을 갖고 있을 때 이를 통합하여 관리할 수 있다.

// 타입 검사를 강화해야 할 때: TypeScript는 인터페이스를 사용하여 타입을 검사하므로, 코드에서 오류를 사전에 방지할 수 있다.

// 객체의 사용 방법을 명시할 때: 객체를 사용하는 부분에서 해당 객체가 가져야 하는 속성이나 메서드를 명시하여, 사용 방법을 문서화하거나 팀 내에서의 코드 이해도를 높일 수 있다.
interface User1 {
  name: string;
  age: number;
  email?: string; // 선택적 속성
  greet(): void; // void는  함수가 아무것도 반환하지 않음을 나타내는 타입. 콘솔 , 무한
}
//콘솔에 로그를 출력하는 함수는 값을 반환하지 않으므로 그 반환 타입으로 void를 사용
function welcome(user: User1) {
  console.log(`Welcome, ${user.name}!`);
  user.greet();
}

const newUser: User1 = {
  name: "John",
  age: 30,
  greet() {
    console.log("Hello!");
  },
};

welcome(newUser); // 인터페이스를 따르는 객체를 전달하여 사용

let user: object;

user = {
  name: "xx",
  age: 30,
};

// console.log(user.name)

// 객체 정의
type Score = "A" | "B" | "C" | "F";
interface User {
  name: string;
  age: number;
  gender?: string;
  readonly birthYear: number;
  [grade: number]: Score; //key가 number,value가 string인  속성을 여러개 가질 수 있다.
}
// value로 뭐가 오는 지도 정해놓을 수 있다.
let user1: User = {
  name: "하연",
  age: 21,
  birthYear: 1000,
  1: "A",
};
let user2: User = {
  name: "상연",
  age: 22,
  birthYear: 2000,
  2: "B",
};
user1.name = "이하연";
console.log(user1.name);
//user1.birthYear = 3000 //Cannot assign to 'birthYear' because it is a read-only
console.log(user1.birthYear);

// 함수 정의 , 괄호 , 인자 값 , 리턴 값
interface Add {
  (num1: number, num2: number): number;
}

const sum: Add = function (x, y) {
  return x + y;
};
sum(10, 20);

// 나이를 받아서 성인인지 판별하는 함수
interface IsAdult {
  (age: number): boolean;
}

// const age : IsAdult = function(num){
//     if(num >= 19){
//         return true
//     }else{
//         return false
//     }
// }

const age: IsAdult = (num) => {
  return num > 19;
};
console.log(age(20));

// 클래스 정의

//implements
interface Car {
  color?: string;
  start(): void;
}

// Bmw 클래스
class Bmw implements Car {
  color; // 속성(멤버 변수)
  wheel;
  constructor(c: string, w: number) {
    // // 생성자.. 초기화
    this.color = c;
    this.wheel = w;
  }
  start() {
    //   // 메서드.동작
    console.log("출바알~~");
  }
}
//myCar 인스턴스(객체) 생성 = bmw 클래스
const myCar = new Bmw("black", 5);
const myCar2 = new Bmw("pink", 3);

console.log(myCar.start);
myCar.start();
/*
Bmw: {
  "wheels": 4,
  "color": "black"
} 
 */

// 확장가능 extends

interface Benz extends Car {
  door: number;
  stop(): void;
  // color? : string,
  // start(): void;
}

class Benz implements Benz {
  door = 4;
  wheel;
  stop() {
    console.log("멈춰~~");
  }
  start() {
    console.log("시작~");
  }
  constructor(w: number) {
    this.wheel = w;
  }
}

const myCar3 = new Benz(3);
console.log(myCar3);

// 여러개 확장가능

interface Toy {
  name: string;
}

interface ToyCar extends Car, Toy {
  price: number;
  // name : string;
  color: string;
  // start(): void;
}

class TomCar implements ToyCar {
  price = 10000;
  name;
  color;
  constructor(n: string, c: string) {
    this.name = n;
    this.color = c;
  }
  start() {
    console.log("범블비");
  }
}
const myCar4 = new TomCar("범블비", "yellow");

console.log(myCar4);
