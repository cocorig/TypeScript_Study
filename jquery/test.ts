$("p").removeClass("myClass noClass").addClass("yourClass");
$(["p", "t"]).text("hello");
const tag = $("ul li").addClass((index) => {
  return "item-" + index;
});
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});

// 이 파일에선 import $ from "jquery";를 불러오지 않았는데 쓸수 있는 이유는
// 파일 내부에서 최상위 스코프에 import나 export 예약어가 없으면  스크립트 파일이 되고,
// import나 export예약어가 있으면 모듈 파일이 되기때문이다.
// 마찬가지로 test.ts와 misc.d.ts는 최상위 스코프에 import나 export예약어가 없으므로 스크립트 파일이다.따라서 text.ts는 misc.d.ts 에 있는 $타입을 자유롭게 가져올 수 있다.
