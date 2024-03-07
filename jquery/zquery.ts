// Z함수가 zQueryInstance인수를 받을 수 있도록 오버로드로 정의한다.
interface zQuery {
  (tag: string | string[]): zQueryInstance;
  (tag: zQueryInstance): zQueryInstance;
}
interface zQueryInstance {
  removeClass(param: string): this;
  addClass(param: string): this;
  addClass(callback: (this: zQueryInstance, index: number) => string): this;
  text(param: string): this;
  html(param: string): this;
  html(callback: (this: zQueryInstance, index: number) => string): this;
  data(param: string): this;
}

declare const Z: zQuery;

Z("p").removeClass("myClass noClass").addClass("yourClass"); // removeClass와 addClass 메서드를 이용하여 클래스를 조작한다.
Z(["p", "t"]).text("hello"); //text메서드
const tag2 = Z("ul li").addClass(function (index) {
  return "item-" + index;
});
// 각 요소에 인덱스를 포함한 클래스를 추가
Z(tag2).html(function () {
  console.log(this);
  return Z(this).data("name") + "입니다.";
}); //콜백 함수를 사용하여 각 요소에 데이터를 추가한 후 출력한다.
//zQuery인터페이스는 tag 문자열 또는 배열을 받아서 zQueryInstance 인스턴스를 반환한다.또한 zQueryInstance 인스턴스를 받아서 zQueryInstance 인스턴스를 반환한다.
//zQueryInstance인터페이스는 zQuery에 의해 반환된 메서드 정의, this 를 반환한다.
//
