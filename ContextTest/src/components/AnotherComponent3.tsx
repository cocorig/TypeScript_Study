import React, { memo } from "react";

function AnotherComponent3() {
  console.log("AnotherComponent3 렌더링");
  return <div>AnotherComponent3</div>;
}

export default memo(AnotherComponent3);
// React.memo로 AnotherComponent3의 리렌더링을 방지할 수 있다.
// children을 props로 받는 컴포넌트는 매 렌더링 마다 children prop가 바뀌기 때문에 React.memo를 사용해도 리렌더링을 방지할 수 없다.
// 참고 https://velog.io/@ckstn0777/Context-API%EC%9D%98-%EC%B5%9C%EB%8C%80-%EB%8B%A8%EC%A0%90%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C
