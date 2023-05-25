
//1..readonly -  값을 바꿀수없음! 불변성을 가짐 
const numbers :  readonly number[] = [1,2,3,4]
//numbers.push(1)
//readonly을 앞에 붙혀주면 값을 바꿀수없다! 읽기전용기능 
const names : readonly string[] = ['1','2','3'];  //names은 문자열인 배열을 type으로 지정한것!
//names.push('4');// 동작안함!! readonly때문!! 불변성을 가짐!!

//Tuple
//Tuple은 배열을 생성 - 최소한의 길이를 가져야 하고,특정위치에 특정 타입이 있어야함!!
//항상 정해진 갯수의 요소를 가져야 하는 array를 지정할 수 있다는 것!
const player : [string, number ,boolean] = ['nico' , 12, true]
//api를 활용할때 문서에 가서 보고 이런 식으로 타입을 지정해주는것이 좋음
player[0] =  1 //xx

//any
type Player = {
    age? : number //number || undefined
}
//any  비어있는 값들을 쓰면 기본값은 any
//typescript로부터 빠져나오고 싶을때 쓰는 타입 아무타입이나 가능 
//any사용을 막기위해 추가할 수 있는 몇가지 규칙!
//any를 쓰면 자바스크립트에 있는것이 되고 보호장치를 잃어버림!
const a : any[] = [1,2,3,4,]
const b : any =  true 
a + b //에러가 나지 않는다!! 좋지않음!!



//3.unknown

// 어떤 타입인지 모르는 변수는 Typescript에세 어떻게 말해줘야할까?
//변수의 타입을 미리 알지 못할때 unknown을 사용함!
let a :  unknown; //ts로 부터 일종의 보호를 받게

if(typeof a === 'number'){
    let b = a + 1;
}
if(typeof a === 'string'){
    let b = a.toUpperCase();
}

//4.void
//void는아무것도 return하지 않는 함수를 대상으로 사용함
function hello(){ //()안에 아무것도 안쓰면 void인줄 자동으로 인지
    console.log('x')
}

//5.naver
//never는 함수가 절대 return하지 않을 때 발생함.
//함수에서 예외(exception)가 발생할 때
function hello() :never{
    throw new Error('xxx'); //return 하지않고 오류를 발생시키는 함수
`   `