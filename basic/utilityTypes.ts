// keyof :  주어진 타입의 모든 속성 이름을 유니온 타입으로 가져오는 데 사용

interface User {
  id: number;
  name: string;
  age: number;
  gender: "m" | "f";
}

type UserKey = keyof User; // 'id' | 'name' | 'age' | 'gender'

const uk: UserKey = "age";

// 속성 이름이 변경되어도 타입 안정성을 유지
function getProperty(obj: User, key: keyof User) {
  return obj[key];
}

const user: User = {
  id: 1,
  name: "Alice",
  age: 30,
  gender: "f",
};

console.log(getProperty(user, "name")); // 'Alice'
console.log(getProperty(user, "age")); // 30
console.log(getProperty(user, "gender")); // 'f'

let admin: Partial<User> = {
  id: 1,
  name: "하연",
};

// Required<T>  반대로 모든 속성을 써야함
// Readonly<T> 읽기전용  ,처음 할당가능 ㅡ수정 불가능

let admin1: Readonly<User> = {
  id: 2,
  name: "코코",
  age: 4,
  gender: "f",
};
// 에러 admin1.age = 1

// Record<K,T>  , <키 타입,값 타입>
//Record<K, T>는 K라는 키의 타입과 T라는 값의 타입을 갖는 새로운 객체를 생성
// 특정 키와 특정 값 타입을 갖는 객체를 동적으로 생성, 데이터를 구조화하거나 특정 형식으로 매핑하는 데 유용
const admin2: Record<string, User> = {
  user1: { id: 1, name: "루룰", age: 3, gender: "m" },
  user2: { id: 1, name: "랄라", age: 3, gender: "m" },
};

function isValid(user: User) {
  const result: Record<keyof User, boolean> = {
    id: user.id > 0,
    name: user.name !== "",
    age: user.age > 0,
    gender: user.gender === "m",
  };
  return result;
}

const user: User = {
  id: 1,
  name: "John Doe",
  age: 25,
  gender: "m",
};

const validationResult = isValid(user);
console.log(validationResult);

/*
 {
  "id": true,
  "name": true,
  "age": true,
  "gender": true
} 
*/

// Pick<T, K> :  T 타입에서 K라는 키를 가진 일부 속성을 선택하여 새로운 타입을 만듬
type UserBasicInfo = Pick<User, "id" | "name">;
/* 같은 내용
type UserBasicInfo = {
    id: number;
    name: string;
}
*/

const admin3: UserBasicInfo = {
  id: 4,
  name: "졸려",
};

// Omit<T,K> : Pink과 반대로 프로퍼티 제외
type UserWithoutAge = Omit<User, "age" | "gender">;

/*
type UserWithoutAge = {
    id: number;
    name: string;
}
*/

//Exclude<T1,T2> : 첫 번째 타입(T1)에서 두 번째 타입(T2)에 할당 가능한 모든 속성을 제외하여 새로운 타입을 생성
type AllowedColors = "red" | "green" | "blue";
type PrimaryColors = "red" | "blue";
type RemainingColors = Exclude<AllowedColors, PrimaryColors>;

// NonNullable<Type>
type T1 = string | null | undefined | void;
type T2 = NonNullable<T1>;
