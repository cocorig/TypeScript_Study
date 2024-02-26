//분산 조건부 타입(distributive conditional types)
//타입을 인스터화 중에 자동으로 유니언 타입으로 분산

type IsStringType<T> = T extends string ? "yes" : "no";
type T10 = IsStringType<string | number>; //type T10 = "yes" | "no"

//유니온 타입을 제네릭에 할당한 경우 유니온 타입을 하나하나 타입 검사를 하면서 다시 결과값 (타입)들이 합쳐져서 유니온으로 반환되는 것
// 1. (string | number) extends string ? "yes" : "no"
// 2. (string extends string ? 'yes' : 'no') | (number extends string ? 'yes' : 'no')
// "yes" | "no"

//분산 조건부 타입(distributive conditional types) 의 특징 -> 직접명시,제네릭 T[]과 같은 타입 파라미터인 경우 분산방식으로 동작하지 않는다.주의!
// 조건부 타입에서 직접 타입 명시,제네릭 T[]과 같은 타입 파라미터가 아닌 경우 분산 방식으로 동작하지 않는다.유니온 타입을 제네릭이 아니라 직접 리터럴로 넣게되면, 분산이 일어나지 않기 때문에 T3은 number가 포함되므로 "no" 타입이 된다.
// 따라서
type T3 = string | number extends string ? "yes" : "no"; //type T3 = "no" -> 분산이 일어나지 않았다.
type T4 = Array<string | number>; //type T4 = (string | number)[]
