// 기본적으로 타입 간의 할당이 가능한지에 대한 것과 타입 간의 호환성은 어떻게 판단하는지에 대해 알아보겠습니다. number타입의 값에 OneDigitOdd 타입의 값을 할당할 때 OneDigitOdd 타입이 가질 수 있는 값인 1 | 3 | 5 | 7 | 9모두 number에 속한다.
type OneDigitOdd = 1 | 3 | 5 | 7 | 9;
const three: OneDigitOdd = 3;
const num: number = three;
const four: number = 4;
const oneDigitOdd: OneDigitOdd = four; // Error : 'number' 형식은 'OneDigitOdd' 형식에 할당할 수 없습니다.

interface Color {
  R: number;
  G: number;
  B: number;
}
const white: Color = {
  R: 255,
  G: 255,
  B: 255,
  //A: 1, //Error : 개체 리터럴은 알려진 속성만 지정할 수 있으며 'Color' 형식에 'A'이(가) 없습니다.
  // 할당하는 값이 변수나 표현식이 아닌 객체 리터럴이기 때문에 할당 받는 타입에 존재하지 않는 속성을 포함한다면 타입 에러가 발생한다.
};
//어떤 타입의 값에 객체 리터럴이 직접 할당하는 경우, 할당 받는 타입에 존재하지 않는 속성을 포함하면 에러가 발생한다.아래와 같이 할당하는 값이 변수나 표현식으로 바꾸면 변수 black은 Color을 갖고 someColor객체는 black에 할당이 가능하게 된다.

const someColor = {
  R: 255,
  G: 255,
  B: 255,
  A: 255,
};
const black: Color = someColor;
interface SquareConfig {
  width?: number;
  color?: string;
}
const squareConfig: SquareConfig = {
  width: 100,
  //colour: red, //Error:  개체 리터럴은 알려진 속성만 지정할 수 있지만 'SquareConfig' 형식에 'colour'이(가) 없습니다. 'color'을(를) 쓰려고 했습니까?
};
//구조적 타입 시스템의 원칙에 따르면 위 할당에는 문제가 없지만 객체 리터럴에 알려지지 않은 속성이 존재한다면, 과잉 속성 검사를 통해 컴파일러가 오류를 잡을 수 있게 된다.
// 이렇게 알려지지 않은 속성이 없는지 추가적으로 시행하는 검사를 과잉 속성 검사(excess property checking)라고 한다.
// 알려짖 않은 속성은 할당 받는 타입에 존재하지 않는 속성을 포함한다는 것과 같은 의미다.
