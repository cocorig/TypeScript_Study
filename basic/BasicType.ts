// Tuple
let demo1: [string, number];

demo1 = ["X", 1];
let s = demo1[0].toLowerCase();

// null , undefined

let demo2: null = null;
let demo3: undefined = undefined;

console.log(a, c);

console.log(s);

// void , never

// void
// 1.콜백 함수는 주로 비동기 작업에서 사용: 콜백함수가 반환하는 값이 필요하지 않을 때 void 사용
function fetchData(callback: (data: string) => void) {
  // 비동기 작업을 수행한 후 콜백 함수 호출
  const data = "some data";
  callback(data);
}

//2.HTML 요소 이벤트 핸들러 , 이벤트 핸들러는 주로 void를 반환
// 주로 어떤 동작을 수행하고 값을 반환하지 않아야 할 때 이를 나타내는 데 활용

// 아무 값도 반환하지 않는 함수에는 void
function sayHello(): void {
  console.log(s);
}

// 에러를 밤환하거나 영원히 끝나지 않는 타입으로 사용
function showError(): never {
  throw new Error();
}

function infLoop(): never {
  while (true) {}
}

// 특정 값만 입력할 수 있게 강조 & 그 값들이 공통점이 있을 때
// enume : 비슷한 값들 끼리 묶어줌, 자동으로 0부터 1씩 증가해 할당됨
enum Os {
  Window = 2,
  Ios = 4,
  Android,
}

// 양방향 mapping
// var Os;
// (function (Os) {
//     Os[Os["Window"] = 2] = "Window";
//     Os[Os["Ios"] = 4] = "Ios";
//     Os[Os["Android"] = 5] = "Android";
// })(Os || (Os = {}));

console.log(Os.Window); // 2
console.log(Os.Ios); // 4
console.log(Os.Android); // 5
console.log(Os[2]); // 'Window'
console.log(Os[4]); // 'Ios'
console.log(Os[5]); // 'Android'

enum OS {
  Window = "win",
  Ios = "ios",
  Android = "and",
}
// 단방향 mapping
// var OS;
// (function (OS) {
//     OS["Window"] = "win";
//     OS["Ios"] = "ios";
//     OS["Android"] = "and";
// })(OS || (OS = {}));

console.log(OS.Window);

let myWindowOs: OS;

myWindowOs = OS.Window;
console.log("myWindow:" + myWindowOs);

let one: number[] = [1, 2]; //콜론: TYPE(변수생성할때)
let two: string[] = ["li", "1"]; //때로는 TS가 그냥 추론하게해도
let three: boolean[] = [true];

// const player : {} = { //
//   name : 'nico'
// }
// player.name  => ty는 player에 name이 존재하는지 모른다고
//optional parameter(선택적 변수)를 지정하는 방법
const player: {
  name: string; //player의 타입을 알려줌 player의 타입은 object고
  age?: number; //object는 name:string을 가지고있음,?는 옵션임!!ㅇ
} = {
  name: "hayeon", //age를 옵션으로 ?을 써주면 값이 number|undefined가 나옴
};
// if(player.age  < 10){ 값이 지정되있지않으므로 typescript는 조건문실행을 시키지않음

// }
if (player.age && player.age < 10) {
  //player.age값이 존재하는지 확
}

//Alias(별칭) 타입을 생성->반복적인 일을 적은 코드를 쓸수있음,재사용할수있
type Player = {
  name: string;
  age?: number;
};

// const playerHayeon : {
//     name: 'hayeon',
//     age : 26
// }
// const playerNico :  {
//     name: 'nico'
// }
const Hayeon: Player = {
  //type을 player로
  name: "hayeon",
};
const Nico: Player = {
  name: "nico",
};

//Alias(별칭) 타입을 생성->반복적인 일을 적은 코드를 쓸수있음,재사용할수있
// type Player = {
//     name: string,
//     age? : number
// }

// // const playerHayeon : {
// //     name: 'hayeon',
// //     age : 26
// // }
// // const playerNico :  {
// //     name: 'nico'
// // }
// const Hayeon : Player = { //type을 player로
//     name: 'hayeon'
// }
// const Nico : Player = {
//     name: 'nico'
// }
