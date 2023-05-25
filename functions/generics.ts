
//ts가 어떻게 다형성을 주는지?
//배열을 받고 그 배열의 결과를 하나씩 print해주는 함수를 만들어보자!
//generic : 타입의 placeholder,concereat type을 사용하는것 대신에 쓸수있음!
//1.호출 시그니처를 만들자
// type SuperPrint = //첫번째 시그니처는 배열을 받을건데, number타입으로 받을거
//     <T,N>(arr: T[] , b :N) => T

//     // (arr: boolean[]):void
//     // (arr: string[]):void
//     // (arr: (number | boolean)[]): void
// //이런 방법은 별로 좋지않지만 모든 가능성을 다 조합해서 만들어야함

// //2.함수만들기 //타입은 SuperPrint고 인수로는 배열을 받도
// const superPrint : SuperPrint = (arr)=>arr[0]
//     // arr.forEach(i=> console.log(i))
//일반적인 함수를 사용할때
function superPrint <V , N>(a : V[] ,b : N){//첫번째 arguments는 a이고,V를 배열로 받음
    return a[0] //a의 첫번째 요소를 리
}
const a = superPrint([1,2,3,4] , 'x') //타입스크립트는 이 값을 보고 타입을 유추하고,유추한 타입으로 call signature을너에게 보여
const b = superPrint([true,false,true] , 5)
const c = superPrint(['a','b','c'] , true)
const d = superPrint([1,2,true , false , 'hello'] , false)//동작하지않음 이것들에대한 시그니처가 없기때
//ts는 제너릭을 처음 인식했을 때와 제너릭의 순서를 기반으로 제너릭의타입을 알게된다.
//concereat type은??Void,unknown
//왜 generic을 사용할까?? call signature을 작성할때, 여기 들어올 
//확실한 타입을 모를때 사용 
//사용방법: 먼저 타입스크립트에 generic을 사용하고싶디고 알려
//generic은 기본적으로 placeholder를 사용해서 내가 작성한코드의 타입기준으로 바꿔준다
//타입스크립트는 나의 코드를 보고 알아낼수있다.
//T는 배열에서 오고, 함수의 첫번째 파라미터에서 오는거라고 타입스크립트에게 알려줌
//placeholder는 call signature을 요구하는 대로 생성
//타입스크립트는 내가 작성한 걸 토대로 배우고 call signature을 생성해준다.
//제너릭은 내가 요구한 대로 signature을 생성해줄수있는 도구이다.
