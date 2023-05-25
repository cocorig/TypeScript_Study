// type Add = {
//     (a: number, b: number) : number
//     (a: number, b: string ,c: number) : number
// }

// const add: Add = (a,b,c? :number) => {
//     if(c) return a+b+c
//     return a + b

    
// }
// add(2,3)
//오버로딩은 함수가 여러개의 서로다른 call signstures를 가지고 있을때 발생시킴
//오버로딩은 여러 call signstures가 있는 함수일 뿐이

//Next.js
// Router.push({  //object로도 보낼수있
//     path: '/home',
//     state : 1
// })

//.push('/home') //string으로 보낼 수 있고


///첫번째 호출 시그니처는 문자열을 받게해,리턴으론 void
type Push = {
    (path: string) : void 
    (config : Config) : void
}

type Config = {
    path: string,
    state: object
} //config - sting 이나 object를 받을수있다 ->체크해야함!1
const push: Push = (config) =>{
    if(typeof config === 'string') console.log(config)
    else{
    console.log(config.path, config.state)
}
}