"use strict";
let str = "hello";
str = "jk";
//$ npx tsc
//ts파일코드에 에러가 있는데도 자바스크립트로 변환 되는 이유? tsc 명령어는 두 작업을 독립적으로 수행하기 때문이다.그니까 1번을 실패해도 2번을 수행하기 때문
// 1.코드 에러 검사하는 작업,2.ts를js로 변환하는 작업

// 만약 js로 코드를 변환하지 않고 타입에러만 검사하고 싶다면 다음 명령어 수행
//$ npx tsc --noEmit
// 에러가 없으면 js로 변환, 있으면 변환 x
// $ npx tsc --noEmitOnError
