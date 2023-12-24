// let user;
// user = {
//   name: "xx",
//   age: 30,
// };

// console.log(user.name);

// // bind() :  해당 함수와 특정 객체를 영구적으로 묶어서 this 값을 설정할 수 있다
// const myObj = {
//   value: 10,
//   getValue: function () {
//     return this.value;
//   },
// };

// const unboundGetValue = myObj.getValue; // 이때는 getValue 함수와 myObj와의 관계가 끊겨 this는 undefined가 됩니다.
// console.log(unboundGetValue()); // 출력 결과: undefined
// const boundGetValue = myObj.getValue.bind(myObj); // getValue 함수에 myObj를 바인딩합니다.
// console.log(boundGetValue()); // 출력 결과: 10
