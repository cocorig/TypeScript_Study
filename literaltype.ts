// literal type

// 1. 문자열 리터럴 타입
const userName1 = "Bob"; //const userName1: "Bob" 변할 수 없으니 Bob외 의 값은 가질 수 없다.
let userName2 = "kgk"; //let userName2: string , 변할 수 있으니 string타입으로 정의
// 최초할당량 값에 따라 타입이 정해짐
let userName3: string | number = "하연";
userName3 = 3;

type Job = "police" | "developer" | "teacher";

interface UserJob {
  name: string;
  job: Job;
}
// 2. 숫자형 리터널타입
interface HighSchoolStudent {
  name: string;
  grade: 1 | 2 | 3;
}
const dev: UserJob = {
  name: "하연",
  job: "developer",
};

const school: HighSchoolStudent = {
  name: "우성고",
  grade: 3,
};
console.log(school.grade);

// 유니온타입
interface Car {
  name: "car";
  start(): void;
}
interface Subway {
  name: "subway";
  stop(): void;
}
function getGift(gift: Car | Subway) {
  console.log(gift.name); // 둘 다 속해있어서 오류는 안님

  if (gift.name === "car") {
    //식별가능한 유니온타입
    gift.start();
  } else {
    gift.stop();
  }
  // Car에만 있어서 오류남 , 이 전에 뭔지 확인
}

const myCar1: Car = {
  name: "car",
  start: () => console.log("Starting the car!"),
};

const mySubway: Subway = {
  name: "subway",
  stop: () => console.log("Stopping the subway!"),
};
getGift(myCar1);
getGift(mySubway);

// 교차타입 (Intersection Types) : 여러 타입을 합쳐서 사용 AND
