//call signatures는 함수 위에 마우스를 올렸을 때 보게 되는것을 말
//props로 함수를 보내게되면 ts한테 어떻게 함수가 작동하는지 알려줘야함 
type Add = (a:number ,  b: number) => number;
const add: Add = (a,b) => a+b;