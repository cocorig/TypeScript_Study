// 리턴값은 좁은 타입에서 넓은 타입으로 대입이 가능하다. 좁은 타입 -> 넓은 타입 (o)
// 함수의 반환값은 항상 공변성을 가진다. 함수<반환값> a -> b(a의 반환값을 b반환값에 대입할 수 있을 때 이 관계를 a -> b로 표시하면) 일 때 T<a> -> T<b>를 만족하면 공변성을 가진다고 할 수 있다.
function fun1(x: string): number {
  return +x;
}
fun1("1"); // 1
type B = (x: string) => number | string;
let bbb: B = fun1; // 반환값은 더 넓은 타입(number | string)으로 대입할 수 있다.따라서 더 넓은 타입을 가진 B에 더 좁은 타입을 가진 fun1이 대입이 가능한 것이다.
let result = bbb("12"); //let result: string | number
let results = fun1("12"); //let results: number
// fun1의 반환값이 number이고 B의 반환값이 string | number이기 때문에 number이 포함된다. 따라서 fun1은 B타입에 대입이 가능한 것이다.
// 넓은 타입에서 좁은 타입으로 대입은 불가능하다. 넓은 타입 -> 좁은 타입 (x)
function fun2(x: string): number | string {
  return +x;
}
type C = (x: string) => number;
//let ccc: C = fun2; // Error : (x: string) => string | number' 형식은 'C' 형식에 할당할 수 없습니다.
//let result3 = ccc("123"); //let result3: number

// 타입스크립트는 ccc("123")의 결과로 number타입임을 추론한다. 하지만 fun2("123")는 string | number을 반환한다.
// 원래 ccc의 실행결과로 number타입임을 예상하고 있었는데 fun2가 대입이 되버리면 실행결과로 string | number이 되야하기 땨문에 에러가 발생한 것이다.
// 즉 실제로 대입한 함수 반환한 값이 타입의 반환값에 포함되지 않으면 안 되기 때문에, 대입한 함수의 반환값은 타입의 반환값과 같거나 더 좁아야 한다.
//반환값은  더 넓은 타입에서 더 좁은 타입으로 대입할 순 없다.
// fun2를 풀어서 써보면 (x : string) => string 또는 (x : string)=> number의 타입이 될 수 있다. 이것을 (x: string) => number을 가진 ccc에 대입한다고 해보면
// fun2의 반환값 중 (x : string)=> number은 포함을 하지만 (x : string) => string 은 대입할 수 없는 예외가 발생한다. 따라서 반환값은 더 넒은 타입에서 좁은 타입으로 대입할 수 없는 이유이다.

//--------------------------------------------------------
// 매개변수 넓은 타입 -> 좁은 타입(o) , 좁은 타입 -> 넓은 타입 (x)
// 매개변수를 보면 string | number -> string으로 대입이 가능하기 때문에
// a -> b일 때 T<b> -> T<a>
//함수의 매개변수는 반공병성을 가진다. 이때 tsconfig.json파일에 strict 옵션이 true여야 한다. false면 타입스크립트는 매개변수에 대해 이변성을 가진다.
// --------------------------------
//매개변수는 반환값과 다르게 넓은 타입에서 좁은 타입으로 대입하는게 가능하다.
//더 넓은 타입을 가진 함수 fun3을 더 좁은 타입인 D에 대입이 가능하다. fun3을 풀어서 써보면 (x : string) => number 또는 (x : number) => number이다.
// (x : string) => number는 (x: string) => number와 맞으니까 알겠는데 (x : number) => number는 대입할 수 없는게 아닌가?
// 매개변수에선 이렇게 생각하는게 아니고 (x : string | number)를 하나로 보고 넓은 타입인지, 좁은 타입인지만 생각하는게 쉽다.따라서 더 넓은 타입을 가진 함수 fun3을 더 좁은 타입인 D에 대입이 가능하다.
//
function fun3(x: string | number): number {
  // 넓은 타입
  return 0;
}
type D = (x: string) => number; // 좁은 타입
let dd: D = fun3;
dd("인녕~"); // D타입에 맞음
fun3("안녕~");
fun3(123);
//dd(123); // Error: number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다
// 변수 dd를 매개변수로 string타입만 받을 수 있는 D타입으로 정의했습니다.
// 이때 dd("인녕~")로 사용했을 때 이는 fun3("인녕~")를 한것과 같은 상황입니다.
function fun4(x: string): number {
  return 0;
}
type DD = (x: string | number) => number;
type SS = (x: number) => number;
// let ddd: DD = fun4; // Error : '(x: string) => number' 형식은 'DD' 형식에 할당할 수 없습니다.
// ddd("안녕");
// ddd(123); // DD타입으로 봤을 땐 정상이지만 실제로 fun4함수를 실행될 때 에러가 방생하므로 타입스크립트에선 실제로 대입된 함수의 매개변수가 허용하지 않는 타입을 넣으면 안 되기 때문에 대입되는 함수의 매개변수는 타압의 매개변수와 같거나 더 넓어여 한다.
// 따라서 함수의 매개변수는 넓은 타입에서 좁은타입으로 할당해야 하는 이유이다.
//반대로 좁은 타입인 fun4를 넓은 타입인 DD에 대입하면 에러가 발생한다.
// 타입을 집합관계라고 생각하면 string 또는 number타입을 가진 DD가 number타입을 가진 SS보다 더 넓은 타입이라고 할 수 있다.

///----------------------------------------------------------------
// 기본적인 타입간의 대입은 좁은타입에서 넓은 타입으로 대입이 가능하다.
let narrow: "apple" | "banana" = "apple"; // 좁은 타입 ("apple" 또는 "banana")
let wide: string = "orange"; // 넓은 타입 (string)

// 좁은 타입에서 넓은 타입으로의 대입 (오류 없음)
// narrow 변수는 좁은 타입("apple" 또는 "banana")이고, wide 변수는 넓은 타입(string)
wide = narrow;

// 넓은 타입에서 좁은 타입으로의 대입 (오류 발생)
// wide 변수에는 string 타입이 할당되어 있으며, narrow 변수에는 좁은 타입("apple" 또는 "banana")이 할당되어 있다.
// string 타입은 "apple" 또는 "banana"로 좁혀진 narrow 타입에 할당할 수 없으므로 오류가 발생한다.
//narrow = wide; // 타입 호환 에러 발생

// 객체의 경우 조금 다르다, 속성이 적을 수록 넓은 타입이라고 생각하면 쉽다.
// 객체는 상세할수록(더 구체적일수록)더 좁은 타입이라고 할 수 있다.
type Z = { name: string; age: number }; // 좁은 타입
type X = { age: number }; // 넓은 타입
const xValue: X = { age: 25 };
//const zValue: Z = xValue; // 넓은타입인 xValue를 좁은 타입인 zValue에 대입하려 하면 에러가 발생한다.
