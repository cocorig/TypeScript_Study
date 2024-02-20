//1. 매개변수 수가 같은 경우 함수 타입간의 할당 규칙
// 할당을 받는 함수의 타입을 Target이라하고, 할당하려는 함수의 타입을 Source라고 하면
// 매개변수 이름이 다르더라도 매개변수의 타입과 순서가 일치하면 할당이 가능합니다.
type Source = {
  prop1: number;
  prop2: string;
};

type Target = {
  prop1: number;
  prop2: string;
};

let source: Source = { prop1: 1, prop2: "hello" };
const target: Target = source;

// 할당이 가능한 이유:
//Source와 Target은 동일한 구조를 갖고 있으며, 각 프로퍼티의 타입도 동일하기 때문입니다.
// 매개변수 타입 할당 가능성: Source의 매개변수 타입이 Target의 매개변수 타입에 할당 가능한가?
// 반환 타입 할당 가능성: Target의 반환 타입이 Source의 반환 타입에 할당 가능한가?
// 만약 두 가지 모두 통과라면, Target은 Source에 할당 가능합니다.
// 1.1 할당이 가능한 경우
type Sum = (sumFirst: number, sumSecond: number) => number;
type Multiply = (mulFirst: number, mulSecond: number) => number;
const sum: Sum = (sumFirst: number, sumSecond: number) => {
  return sumFirst + sumSecond;
};
// sum 함수를 multiply에 할당
const multiply: Multiply = sum;

// Sum함수의 모든 매개변수 타입은 number로, 서로 할당 가능하고, Multiply의 반환 타입인 number는 Sum의 반환 타입인 number에 할당 가능합니다.

// 1.2 할당이 불가능한 경우
interface Pokemon {
  //더 일반적인 타입
  name: string;
}

interface Pikachu extends Pokemon {
  //더 구체적인 타입
  level: number;
}

let getName = (pokemon: Pokemon) => {
  return pokemon.name;
};

let getLevel = (pikachu: Pikachu) => {
  return pikachu.level;
};

//getLevel = getName;// 'string' 형식은 'number' 형식에 할당할 수 없습니다.
//getName = getLevel; //Error : 'pikachu' 및 'pokemon' 매개 변수의 형식이 호환되지 않습니다.
// 넓은 -> 좁은 x
/*
getName을 getLevel에 할당하는 경우 getName은 string 타입을 반환하는 반면에 함수 getLevel은 number 타입을 반환합니다.따라서 이 두 함수의 반환 타입이 서로 다르기 때문에 할당할 수 없습니다.
반면에 getLevel 함수를 getName에 할당하는 경우, getLevel 함수의 매개변수 타입이 더 구체적인 Pikachu이고, getName 함수의 매개변수 타입은 더 일반적인 Pokemon입니다.
*/
//Pikachu는 Pokemon을 확장하는 인터페이스이기때문에 Pikachu는 Pokemon보다 더 많은 속성을 가지고 있습니다.
// 따라서 더 구체적인 타입인 getLevel를 더 일반적인 getName에 할당할 수 없습니다 .
// 추가적인 level 속성을 가지고 있지 않기때문에 오류가 발생합니다.
// 더 일반적인 타입: 반대로, 더 일반적인 타입은 더 적은 정보를 제공합니다. 더 일반적인 타입은 더 넓은 범위의 값을 포함합니다. 예를 들어, Pokemon은 모든 포켓몬의 공통 속성인 name을 가지고 있습니다. 이것은 Pokemon이 더 일반적인 타입이라는 것을 의미합니다.
//TypeScript에서는 함수의 매개변수 타입이 더 구체적인 경우에만 공변성이 적용되기 때문에  Pikachu를 받는 함수 getLevel는 Pokemon을 받는 함수getName로 할당할 수 없습니다.
// 또한 Pikachu는 Pokemon을 확장하는데, Pikachu에는 level 속성이 추가로 필요합니다.
// getName은 Pikachu의 모든 속성을 포함하지 않으므로 할당할 수 없습니다.
// 좁은 타입에 넓은 타입을 넣을 수 있는 것을 공변성(Covariance),
//2. 매개변수 수가 다른 경우

// 2.1 할당하는 함수의 매개변수 수가 더 많은 경우: 이 경우 할당은 불가능합니다. 왜냐하면 호출할 때에는 더 적은 수의 인수를 사용할 수 있어야 하기 때문입니다. 추가 매개변수가 있는 함수를 호출할 때는 그 매개변수를 무시할 수 없으므로, 더 적은 수의 매개변수를 요구하는 함수에 할당할 수 없습니다.

//2.2 할당받는 함수의 매개변수 수가 더 많은 경우: 이 경우 초과 매개변수는 무시됩니다. 즉, 할당받는 함수의 매개변수 수가 더 많더라도, 할당을 받는 함수의 매개변수 수와 타입이 일치하면 할당이 가능합니다. 초과 매개변수는 무시되기 때문에 호출 시에 영향을 미치지 않습니다
