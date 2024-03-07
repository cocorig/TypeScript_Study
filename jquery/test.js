$("p").removeClass("myClass noClass").addClass("yourClass");
$(["p", "t"]).text("hello");

const tag = $("ul li").addClass(function (index) {
  return "item-" + index;
});
$(tag).html(function (i) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
// 이 파일에선 import $ from "jquery";를 불러오지 않았는데 쓸수 있는 이유는
// 파일 내부에서 최상위 스코프에 import나 export 예약어가 없으면  스크립트 파일이 되고,
// import나 export예약어가 있으면 모듈 파일이 되기때문이다.
// 마찬가지로 test.ts와 misc.d.ts는 최상위 스코프에 import나 export예약어가 없으므로 스크립트 파일이다.따라서 text.ts는 misc.d.ts 에 있는 $타입을 자유롭게 가져올 수 있다.
// tsconfig.json -> "target" : "ES5" 이렇게 target을 변경해 결과물의 문법 버전을  조정할 수 있다.최신 문법을 지원하지않는 구형 브라우저나 옛 버전 노드를위한 코드를 만들 때 필요한 옵션이다.
// npx tsc 속도 올리기 -> tsconfig.json -> incremental 옵션 true로 변경하면 된다.
