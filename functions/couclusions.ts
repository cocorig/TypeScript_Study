type Player1<E>= {
    name: string
    extralnfo : E //제너릭을 이용해 아무 타입을 써되되게 설정
}//객체를 받는다
type NicoExtre = {
    favFood: string
}
type NicoExtra = Player1<NicoExtre>

const nico: NicoExtra ={
    name: 'nico',
    extralnfo: {
        favFood : 'kimchi'
    }
}
const lynn : Player1<null> = {
    name: 'lynn',
    extralnfo : null
}
type A = Array<number> //제너릭을 가진 배열 A를 선언
let f:A = [1,2,3]; //f는 A타입을 가지고 배열임
function  printAllNumber(arr: Array<number>){}