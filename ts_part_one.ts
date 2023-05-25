let a : number[]=[1,2]; //콜론: TYPE(변수생성할때)
let b : string[] = ['li','1'] //때로는 TS가 그냥 추론하게해도
let c : boolean[] = [true]

// const player : {} = { //
//   name : 'nico'
// }
// player.name  => ty는 player에 name이 존재하는지 모른다고
//optional parameter(선택적 변수)를 지정하는 방법
const player : {
    name : string,  //player의 타입을 알려줌 player의 타입은 object고
    age? : number   //object는 name:string을 가지고있음,?는 옵션임!!ㅇ
} = {   
    name: 'hayeon'//age를 옵션으로 ?을 써주면 값이 number|undefined가 나옴
}
// if(player.age  < 10){ 값이 지정되있지않으므로 typescript는 조건문실행을 시키지않음

// } 
if(player.age && player.age < 10){//player.age값이 존재하는지 확
    
}


//Alias(별칭) 타입을 생성->반복적인 일을 적은 코드를 쓸수있음,재사용할수있
type Player = { 
    name: string,
    age? : number
}

// const playerHayeon : {
//     name: 'hayeon',
//     age : 26
// }
// const playerNico :  {
//     name: 'nico'
// }
const Hayeon : Player = { //type을 player로 
    name: 'hayeon'
}
const Nico : Player = {
    name: 'nico'
}

//Alias(별칭) 타입을 생성->반복적인 일을 적은 코드를 쓸수있음,재사용할수있
// type Player = { 
//     name: string,
//     age? : number
// }

// // const playerHayeon : {
// //     name: 'hayeon',
// //     age : 26
// // }
// // const playerNico :  {
// //     name: 'nico'
// // }
// const Hayeon : Player = { //type을 player로 
//     name: 'hayeon'
// }
// const Nico : Player = {
//     name: 'nico'
// }