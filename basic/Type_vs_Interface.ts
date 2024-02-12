// Type과 Interface의 차이

// 객체 형태로만 가능, 원시 자료형에 대한 타입 선언이 불가능하다.
interface User {
  name: string;
  age: number;
  email: string;
}

interface AdminUser extends User {
  createAt: Date;
}

const adminInterface: AdminUser = {
  name: "toto",
  age: 30,
  email: "test@toto.com",
  createAt: new Date(),
};
//,타입은 원시 자료형이 호환이 된다.primitive data type이라 부름
type UserName = string;

type User1 = {
  name: string;
  age: number;
  email: string;
};
type AdminUser1 = User & {
  createAt: Date;
};

const adminType: AdminUser1 = {
  name: "toto",
  age: 30,
  email: "test@toto.com",
  createAt: new Date(),
};
// 타입은 튜플 가능,배열 인덱스 별로 타입이 다른 것을 쉽게 선언해 줄 수 있다.
type User2 = [number, string];
const aUser: User2 = [1, "happy"];
// 보안상의 이유로 특정한 필드를 제외하고 싶을 때
type DisplayUerType = Omit<User1, "email" | "age">;
/*
type DisplayUerType = {
    name: string;
}
*/

// 인터페이스 Omit도 가능, 뒤에 빈 브라켓을 붙여줘야 함, 이 경우 타입이 더 깔끔
interface DisplayUserInter extends Omit<User, "email"> {}
const displayUser: DisplayUserInter = {
  name: "toto",
  age: 30,
  //email : "toto@gmail.com" //Error
};
// 인터페이스의 문제?
// 같은 이름으로 선언한 인터페이스는 속성이 합쳐서 처리되기 때문에 에러를 야기할 수 있다.
// 개발자의 의도와 다르게 처리될 수도 있다.
// A 개발자
interface Admin {
  name: string;
  privileges: string[];
}
// A 개발자가 쓴 인터페이스를 못보고 같은 이름으로 선언한 B 개발자
interface Admin {
  age: number;
}

// const adminError: Admin = {//Error
//   // name: "Admin",
//   // privileges: ["create-server"],
//   age: 30,
// };
// 특정한 객체의 타입을 선언할 때는 인터페이스를 많이 사용한다.
// 그 외 단순한 형태는 타입으로 선언해 사용한다.타입 같은 경우 기능이 더 많다.
type union = string | number;
const payload = {
  id: 1,
  name: "coco",
  job: {
    developer: true,
  },
} as const;
//타입으로 뽑을 수 있디!!! 편리
type TPayload = typeof payload;
/*
type TPayload = {
    id: number;
    name: string;
    job: {
        developer: boolean;
    };
}
 */

// as const를 붙이면 상수(변경 하지 않는 값)로 처리할 수 있다.
// readonly(읽기전용)값으로 다 네스티드 된 데이터들로 바뀐 걸 볼 수 있다. 변경 불가능
/*
const payload: {
    readonly id: 1;
    readonly name: "coco";
    readonly job: {
        readonly developer: true;
    };
}
*/
