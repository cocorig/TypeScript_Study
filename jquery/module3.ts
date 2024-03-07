import * as module1 from "./module1";
import * as module2 from "./module2";

// 같은 이름의 Test 인터페이스가 있지만 모듈파일이므로 서로 합쳐지지 않는다.
// 즉 존재하지 않는 속성에서 에러가 발생한다.
const ex1: module1.Test = {
  name: "hi",
  //name2: "error", // Error
};
const ex2: module2.Test = {
  //name: "error", // Error
  name2: "hi",
};

// import * as 네임스페이스  from 모듈
// -> 이 문법은 해당 모듈에 존재하는 모든 export를 지정한 네임스페이스의 멤버로 가져오는 것이다.
//module1.ts는 Test 인터페이스와 export default한 함수를 갖고 있고,이 둘은 module3.ts에서 각각 module1.Test,module1.default로 불러 올 수 있다.
// 따라서 모듈 파일에서는 보통 네임스페이스를 사용하지 않는다.
