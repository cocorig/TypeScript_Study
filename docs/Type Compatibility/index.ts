// 클래스 이름이 다르지만 둘 다 문자열 유형의 단일 속성 name을 가집니다.
class Programmer {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Manager {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  manage() {}
}
// 동일한 구조를 갖기 때문에 호환가능
let employee: Programmer = new Manager("Hayeon");
// employee.manage() // Error : 'Programmer' 형식에 'manage' 속성이 없습니다.
//상위 타입 (Super Type)은 더 일반적인 개념을 나타내며, 하위 타입 (Sub Type)은 더 구체적인 개념을 나타냅니다. 상위 타입은 하위 타입을 포괄하고 있는 관계입니다.
// 1. 구조적 타입 시스템 기본 규칙  y가 최소한 x와 동일한 멤버를 가지고 있으면 x와 y는 호환가능하다.
interface Named {
  name: string;
}
let x: Named;
// y의 추론된 타입은 { name: string; location: string; } 입니다.
let y = { name: "Alice", location: "Seattle" };
x = y; // y는 x에 할당할 수 있을까? 예스 -> y의 속성이 모두 x는 가지고있기 때문입니다.

// 반면 반대로 x는 y에 할당할 수 있을까? 놉 -> x의 속성은 y의 속성을 가지고 있지 못하기 때문입니다.
// 할당받는 쪽 =  할당하는 쪽
// 할당하는 쪽은 할당 받는 쪽의 속성을 모두 가지고 있어야 합니다.
// y = x; //Error : 'location' 속성이 'Named' 형식에 없지만 '{ name: string; location: string; }' 형식에서 필수입니다.

// y를 x에 할당할 수 있을지 검사하기 위해, 컴파일러는 x의 각 속성을 검사해 y에 상응하는 호환 가능한 속성을 찾습니다. 이 경우 y는 name이라는 문자열 멤버를 가지고 있어야하므로 할당이 가능힙니다.

//2. 함수 호출 인수를 검사할 때 동일한 할당 규칙이 적용됩니다
function greet(n: Named) {
  console.log("Hello, " + n.name);
}
greet(y); // 성공
/*
y는 location 속성을 추가적으로 가지고 있지만 오류가 발생하지않습니다.
그 이유는 호환성을 검사할 때는 오직 매개변수 타입의 멤버(이 경우는 Named)만 고려되기때문에 y를 매개변수로 할당해도 y에 name 속성이 있으므로 할당이 가능한 것입니다.
*/

//3.두 함수 비교 (Comparing two functions)
// 3.1 매개변수 목록만 다른 두 함수의 경우
//함수의 매개변수 타입은 대상 함수의 매개변수 타입의 상위 타입이어야 합니다.
let z = (a: number) => 0;
let q = (b: number, s: string) => 0;
q = z; // OK
//z = q; // Error : '(b: number, s: string) => number' 형식은 '(a: number) => number' 형식에 할당할 수 없습니다.

/* 덜 구체적인 = 더 구체적인
위의 코드를 살펴보면 z를 q에 할당할 수 있는지 검사하기 위해,먼저 매개변수의 목록을 살펴 봐야합니다.
z의 각 매개변수는 호환 가능한 타입을 가진 q의 해당 매개변수를 갖고 있어야 하고,
이때 매개변수의 이름은 고려하지않고, 타입만 검사한다는 점을 유의해야 합니다.
이 경우 z의 모든 매개변수는 q에 상응하는 호환 가능한 매개변수를 가지므로 할당이 가능합니다.

반면 q는 z에 없는 두 번째 매개변수를 가지고 있기 때문에 할당이 허용되지않아 오류가 발생합니다.
예를 들어 forEach메서드를 사용해 콜백함수에게 3 가지 매개변수인 배열 요소, 그 요소의 인덱스 그리고  배열을 제공합니다. 하지만 아래 예시처럼 첫 번째 매개변수만 사용하는 콜백을 제공합니다.
*/
let items = [1, 2, 3];
// 추가 매개변수를 사용하지 않아도 된다.
items.forEach((item, index, array) => console.log(item));
items.forEach((item) => console.log(item));

// 3.2 반환 타입이 다른 두 함수의 타입 호환성
let i = () => ({ name: "Alice" });
let p = () => ({ name: "Alice", location: "Seattle" });
i = p; // OK
// p = i; // Error , 'location' 속성이 '{ name: string; }' 형식에 없지만 '{ name: string; location: string; }' 형식에서 필수입니다.

/*
함수의 반환 타입이 대상 함수의 반환 타입의 하위 타입이어야 합니다.
위의 코드를 보면 i = p으로 p함수는 i함수에 할당이 가능합니다. 그 이유는 i 함수의 반환 타입은 name 속성만을 갖고 있고, p 함수의 반환 타입인 객체의 모든 속성을 포함하고 있기때문에 i 함수의 반환 타입은 p 함수의 반환 타입의 하위 타입이라고 할 수 있습니다.
반면, i함수를  p함수에 할당하면 에러가 발생합니다. p함수의 반환 타입은 i함수의 반환 타입의 하위타입이 아니기때문에 할당이 불가능합니다.
*/
// 여기서 대상 함수란 할당하려는 함수,i 변수에 p 함수를 할당할 때
// i = p 코드에서 "대상 함수"는 p 함수입니다. 이 코드는 p 함수를 i 변수에 할당하는 것을 의미합니다.

//2. Function Parameter Bivariance.

interface MyEvent {
  type: string;
}

interface MyMouseEvent extends MyEvent {
  x: number;
  y: number;
}

function listenEvent(eventName: string, callback: (e: MyEvent) => void) {
  const event = { type: "some-event-type" };
  callback(event);
}

// listenEvent("click", (e: MyMouseEvent) => {});// Error : 'e' 및 'e' 매개 변수의 형식이 호환되지 않습니다.'MyEvent' 형식에 'MyMouseEvent' 형식의 x, y 속성이 없습니다.

//3. 선택적 매개변수와 나머지 매개변수 (Optional Parameters and Rest Parameters)
function invokeLater(args: number[], callback: (...args: number[]) => void) {
  /* ... Invoke callback with 'args' ... */
  callback();
}

// Unsound - invokeLater "might" provide any number of arguments
const myCallback = (x: number, y: number) => console.log(x + ", " + y);
invokeLater([1, 2], myCallback);

// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));

/*
함수의 호환성을 비교할 때 Optional 매개변수와 필수 매개변수를 서로 바꿔서 사용할 수 있습니다.
나머지 매개변수를 가지는 함수는 Optional 매개변수로 처리될 수 있습니다. 이는 타입 시스템 관점에서는 바람직하지 않을 수 있지만, 대부분의 함수에서 해당 위치에 undefined를 전달하는 것이 일반적이기 때문에 런타임 관점에서는 문제가 되지 않습니다. */

//4. 오버로드 함수 (Functions with overloads)
//TypeScript에서는 오버로딩된 함수의 각 시그니처가 대상 함수의 시그니처와 호환되어야 합니다. 즉, 오버로딩된 함수의 각 시그니처는 대상 함수의 시그니처와 일치하거나 더 구체적이어야 합니다.

function oo(a: number): number;
function oo(a: string): string;
function oo(a: number | string) {
  return a;
}

function bb(a: boolean): boolean;
function bb(a: number): number;
function bb(a: string): string;
function bb(a: number | string | boolean) {
  return a;
}

let ooFunc: typeof oo = bb;
//let yFunc: typeof bb = oo; // Error : 'a' 및 'a' 매개 변수의 형식이 호환되지 않습니다.
