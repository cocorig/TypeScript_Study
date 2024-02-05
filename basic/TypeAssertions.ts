type One = string;
type Two = string | number;
type Three = "hello";

let o: One = "hello";
let t = o as Two; // less specific
let h = o as Three; // more specific
//let w = Three as number; // Three라는 타입이 "hello"라는 특정 문자열만을 허용하는 타입이기 때문에 에러가 발생합니다. 즉, 이 두 타입 간에는 상속 관계가 없습니다.
let w = <One>"world";
let e = <string | number>"world";

const addOrConcat = (
  a: number,
  b: number,
  c: "add" | "concat"
): number | string => {
  if (c === "add") {
    return a + b;
  } else {
    return "" + a + b;
  }
};

let myVal: string = addOrConcat(2, 2, "concat") as string;
console.log(myVal);
// 오류는 없지만 string을 반환한다.
let nextVal: number = addOrConcat(3, 3, "concat") as number;
console.log(typeof nextVal); // string
/*
nextVal 변수는 타입 단언을 통해 강제로 as number로 형변환하고 있다.
이렇게 되면 실제 값은 문자열이지만 TypeScript는 해당 값을 number로 취급하게 되지만,
실제 값이 문자열이기 때문에 typeof 연산자로 실제타입을 출력해보면 문자열이 출력되고 있는걸 확인할 수 있다.
let nextVal: number로 추론되지만 콘솔로 nextVal타입을 출력해보면 string 타입 인걸 알 수 있다.
 */

/* 강제 캐스팅,다중 캐스팅 , 다중 단언
 */
10 as unknown as string;
// : 10을 unknown 타입으로 캐스팅한다. 이는 TypeScript에게 해당 값이 어떤 타입이든 될 수 있다는 것을 알려주는 것이다. unknown 값을 이번에는 string 타입으로 캐스팅힌디. 이는 TypeScript에게 해당 값은 문자열로 취급해도 된다는 것을 명시적으로 나타낸다.

/*
img와 myImg는 선택된 요소가 없을 경우 null이 될 수 있기 때문에 src 속성에 접근하려고 할 때 TypeScript에서는 오류가 발생한다. 따라서 이럴 경우엔 아래와 같은 타입 단언 얀산자를 사용해 타입 단언을 할 수 있다.
하지만 선택된 요소가 없을 경우에 null이 되기때문에 오류가 발생할 수 있다.
따라서 선택된 요소가 실제로 존재하는지 확인한 후에 src 속성에 접근하는 것이 좋다.
*/

// Dom
// 1. non-null assertion 연산자사용,null이 될 가능성이 없다고 알려줌
const img = document.querySelector("img")!;
//const img: HTMLImageElement | null
//img의 타입은 HTMLImageElement 또는 null로 추론된다.
// 2.as단언 ,  해당 표현식을 HTMLImageElement 타입으로 강제로 딘언하게 한다.
const myImg = document.getElementById("#myImg") as HTMLImageElement;
// myImg의 타입은 HTMLElement 또는 null로 추론된더.
// const myImg: HTMLElement | null
// 3. <> 단언 ,
const nextImg = <HTMLImageElement>document.getElementById("#Img");

img.src; //img'은(는) 'null'일 수 있습니다.
myImg.src; //'myImg'은(는) 'null'일 수 있습니다
