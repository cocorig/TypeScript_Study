// Generic

// function getSize(arr : number[] | string[]) {
//   return arr.length;
// }

// const arr1 = [1,2,3];
// getSize(arr1)

// const arr2 = ['1','2','3'] // 이럴경우 유니온, 오버로드로 해결가능
// getSize(arr2)

function getSize<T>(arr: T[]): number {
  return arr.length;
}

const arr1 = [1, 2, 3];
getSize<number | string>(arr1);
const arr2 = ["1", "2", "3"]; // 이럴경우 유니온, 오버로드로 해결가능
getSize<string>(arr2);
const arr3 = [true, false, true]; // 이럴경우 유니온, 오버로드로 해결가능
getSize<boolean>(arr3);

// 제너릭을 사용해서 하나의 interface를 만든 후 각각 다른 타입의 객체를 생성할 수 있다/
interface MacBook<T> {
  name: string;
  price: number;
  option: T; //any-> 어떤 데이터가 올지모름 -> 제너릭 사용 -> T
}
const m1: MacBook<object> = {
  name: "m1",
  price: 10000,
  option: {
    color: "silver",
    coupon: false,
  },
};
const m2: MacBook<string> = {
  name: "m2",
  price: 10000,
  option: "good",
};
const pro: MacBook<{ color: string; coupon: boolean }> = {
  name: "pro",
  price: 10000,
  option: {
    color: "darkblue",
    coupon: true,
  },
};

interface Person {
  name: string;
  age: number;
}

interface Book {
  price: number;
}
interface Notebook {
  name: string;
  color: string;
}

const person: Person = { name: "gkdus", age: 20 };
const notebook: Notebook = { name: "m2", color: "silver" };
const book: Book = { price: 23000 };

function showName<T extends { name: string }>(data: T): string {
  return data.name;
} // 오직 name 속성이 있는 객체만을 전달할 수 있도록 검사

showName(person);
showName(notebook);
// 에러 -> showName(book)
/*'Book' 유형의 인수는 '{name: string; }' 유형의 매개 변수에 할당할 수 없습니다.
속성 'name'이(가) 'Book' 유형에는 없지만 '{name: string; }' 유형에는 필요합니다. */

//extends { name: string }: 이 타입 매개변수 T는 { name: string } 형태의 객체(속성 이름이 name이고, 문자열 타입인 객체)만을 받을 수 있음을 의미
