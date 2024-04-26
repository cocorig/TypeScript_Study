import calc from "../calc-ts";

const a = calc.plus(1, 2, 3, 4);
const b = calc.minus(a, 4);
calc.divide(b, 3);
calc.multiply(1, 2, 3, 4);
console.log(a, b);

/**
 *
 * use calc 폴더에서 ts-node로 index2를 실행하면 에러가 발생한다. 그 이유는 index.js 파일이 없기 때문에 발생하는 에러이다. 결국 Node.js가 실행하는건 자바스크립트 파일이므로 calc-ts도 자바스크립트 파일을 갖고 있어야 한다.
 *
 * 다만 js 파일을 src 폴더에 생성되지 않고, ts 파일과 js파일을 분리하기 위해  dist 폴더에 생성되게 만들어야 한다.
 *
 * calc-ts 의 tsconfig.json에서 다음 세 옵션을 주석 해제하고 다음과 같이 수정한다.
 */
