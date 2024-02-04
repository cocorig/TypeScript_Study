// 인터페이스

interface IUser {
  username: string;
  email: string;
  age: number;
}
interface IEmployee extends IUser {
  // 확장
  employeeId: number;
  // username: string;  있는거랑 마찬가지
  // email: string;
  // age: number;
}

const emp: IEmployee = {
  username: "leehayeon",
  email: "hayeon@gmail.com",
  age: 26,
  employeeId: 304035402032,
};
const client: IUser = {
  username: "sangho",
  email: "sangho@gmail.com",
  age: 30,
};
// 제너릭

interface IAuthor {
  id: number;
  username: string;
}

interface ICategory {
  id: number;
  title: string;
}
// 게시물의 정보를 가져온다고 하면 유저 정보도 같이 가져올 수 있다고 가졍
interface IPost {
  id: number;
  title: string;
  desc: string;
}

interface IPostBetter<T> {
  id: number;
  title: string;
  desc: string;
  extra: T[];
}

const bestPost: IPostBetter<String> = {
  //제너릭 안에 타입으로 interface 적용
  id: 1,
  title: "제목",
  desc: "설명",
  extra: ["str", "str"],
};

const testPost: IPostBetter<IAuthor> = {
  id: 2,
  title: "제목",
  desc: "설명",
  extra: [
    { id: 1, username: "bob" },
    { id: 2, username: "jon" },
  ],
};
const testCategory: IPostBetter<ICategory> = {
  id: 3,
  title: "제목",
  desc: "설명",
  extra: [
    { id: 1, title: "dev" },
    { id: 2, title: "design" },
  ],
};
