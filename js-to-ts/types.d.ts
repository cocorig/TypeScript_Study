declare const plus: (...args: number[]) => number;
declare const minus: (a: number, b: number) => number;
declare const multiply: (...args: number[]) => number;
declare const divide: (a: number, b: number) => number;

export { plus, minus, multiply, divide };

// 자바스크립트 패키지이므로 타입 선언을 따로 해야한다.
// 그 다음 package.json의 types 속성에 등록해서 해당 파일이 이 패키지를 대표하는 타입 피일임을 알려야 한다.
// main 속성은 src/index.js로 수정하여 src/index.js가 이 패키지를 대표하는 자바스크립트 파일임을 알린다.
