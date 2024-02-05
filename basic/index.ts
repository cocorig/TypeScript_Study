// original js code

// const year = document.getElementById("year"); // const year: HTMLElement | null
// const thisYear = new Date().getFullYear();
// year.setAttribute('datetime', thisYear)
// year.textContent = thisYear

//const year: HTMLSpanElement
// const year = document.getElementById("year") as HTMLSpanElement;
// const thisYear: string = new Date().getFullYear().toString();
// year.setAttribute("datetime", thisYear);
// year.textContent = thisYear;

function getNetPrice(
  price: number,
  discount: number,
  format: boolean
): number | string {
  let netPrice = price * (1 - discount);
  return format ? `$${netPrice}` : netPrice;
}
//netPrice은 타입스크립트가 number로 추론하고있음,format이 true면 문자열로 빈환되고, false면 숫자로 반환하게 된다.
// as 키워드를 사용하여 컴파일러에게 netPriceAsString에 할당된 값이 문자열임을 알려준다.
let netPriceAsString = getNetPrice(100, 0.05, true) as string;
console.log(netPriceAsString);
//비슷하게, getNetPrice() 함수의 반환 값이 숫자임을 컴파일러에게 알려준다.
let netPriceAsNumber = getNetPrice(100, 0.05, false) as number;
console.log(netPriceAsNumber);
// 타입 딘언은 런타임에서 해당 값이 실제로 변하지 않고, 컴파일러에게만 특정 값이 어떤 타입으로 취급되어야 하는지 알려주는 역할을 한다.
//타입 단언이 실제로 어떤 타입 캐스팅(런타임에서 해당 값이 실제로 변화시킴)을 수행하지 않는다는 것

let value: any = "123";

// 타입 단언을 사용하여 컴파일러에게 이 값은 숫자로 다루어져야 한다고 알려줌
let numberValue: number = value as number; // 컴파일러에게 알려줌
console.log(typeof numberValue); // 출력: string, 런타임

// 위의 코드에서  컴파일러에게 value를 number로 취급하겠다고 알려주지만, 실제론 numberValue는 여전히 string타입이다.
//이러한 특성 때문에 타입 단언은 주로 컴파일 타임에서의 타입 체크를 위해 사용되고, 런타임에서는 실제 값의 형태를 변환하지 않는다.
// 즉 타입 단언은 TypeScript 코드를 JavaScript로 컴파일할 때만 영향을 미치며, 런타임에는 아무런 영향을 주지 않는다.

// 타입 단언은 주로 컴파일러에게 개발자의 의도를 전달하기 위한 용도일 뿐 런타임에서 실제 값의 타입을 변환하진 않습니다.
//
interface INameable {
  name: string;
}
let obj: object = { name: "Jack" };

let name1 = (<INameable>obj).name; //(<타입>객체) 형태의 타입 단언
let name2 = (obj as INameable).name; // (객체 as 타입) 형태의 타입 단언
console.log(name1, name2);
// 단언과 캐스팅이 문법은 같은데
// - 타입 단언 : 이건 이거야!!
// - 타입 캐스팅 : A 타입을 B 타입으로 바꿔야겠다!
let n: number = 15;
let var1: string = n as unknown as string;
//let var1: string = n as string; 에러
/*'number' 형식을 'string' 형식으로 변환한 작업은 실수일 수 있습니다. 두 형식이 서로 충분히 겹치지 않기 때문입니다. 의도적으로 변환한 경우에는 먼저 'unknown'으로 식을 변환합니다.*/

console.log(typeof var1); //number

/*타입단언(as)으로 해결했을 때 문제점 
코드에서 numOrStr 함수는 number 또는 string을 받을 수 있는데, a as number로 타입 단언을 하고 있습니다. 이러한 타입 단언은 TypeScript 컴파일러에게 "나는 a를 number로 취급해도 괜찮다"라고 말하는 것이지만, 런타임에서는 실제로 a의 값이 어떤 타입인지 보장할 수 없습니다.

따라서, 런타임에서 a에 문자열이 전달되면 toFixed 메소드는 문자열에 대해 정의되어 있지 않기 때문에 에러가 발생합니다.

이런 상황에서 타입 가드(Type Guard)를 사용하여 더 안전하게 코드를 작성할 수 있습니다.*/
function numOrStr(a: number | string) {
  (a as number).toFixed(2); // 위험한 코드임. a가 number라고 TS를 안심시키는 행위.
}
console.log(numOrStr("123.1111")); // TypeError: a.toFixed is not a function

// function isNumber(value: number | string): value is number {
//   return typeof value === "number";
// }

// function numOrStr(a: number | string) {
//   if (isNumber(a)) {
//     a.toFixed(2); // 안전한 코드
//   }
// }

// console.log(numOrStr("123.1111"));

// type Person1 = {
//   name: string;
//   age: number;
// };

// let person1: Person1 = {}; //. '{}' 형식에 'Person1' 형식의 name, age 속성이 없습니다.
// person1.name = "";
// person1.age = 23;

// let arr = [100, "hello"] as const;
// // let arr: readonly [100, "hello"]
// arr.push(); // Error : P
