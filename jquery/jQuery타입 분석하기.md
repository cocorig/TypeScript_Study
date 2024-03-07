> 이 내용은 조현영(제로초)님이 쓰신 [TypeScript 교과서](https://product.kyobobook.co.kr/detail/S000208416779)를 바탕으로 정리한 내용입니다.

# jQuery 타입 분석하기

jQuery 라이브러리 자체는 타입스크립트를 지원하지 않기 때문에, 타입스크립트 프로젝트에서 jQuery를 사용할 때는 @types/jquery 패키지를 설치해야 한다.

아래 이미지와 같이 @types/jquery 패키지를 설치하면 node_modules/@types/jquery 폴더에 `.d.ts` 확장자를 가진 파일들이 생성된다. 이 파일들은 타입 선언만을 가지고 있는 파일(Declaration file)이므로 확장자가 `.d.ts`이다.

<img width="356" alt="스크린샷 2024-03-08 오전 2 00 36" src="https://github.com/swJaNG12/TypeScript-Study/assets/95855640/89ddbb3b-4482-49d7-ba11-a7dd2839f1dd">

<br>

package.json 파일에 "types"속성을 확인하면, 처음 봐야 할 진입접(entry) 파일을 확인할 수 있다.

```json
  //package.json
    //...
    "types": "index.d.ts",
    //...
```

#### index.d.ts

```ts
// Type definitions for jquery 3.5
// Project: .....

/// <reference types="sizzle" />
//--- 이 파일들은 @types/jquery 폴더 안에 있음---
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery; // 5.2절 참고
```

위의 코드에서 `TypeScript Version: 2.7`는 타입스크립트가 2.7 버전 이상에서만 정상 작동한다는 뜻이다. 이 버전보다 낮으면 호환되는 버전의 패키지(주로 더 낮은 버전)를 설치해야 한다.
`<reference path/>`는 이 패키지가 참고하는 파일을 가리킨다. 이 파일들은 @types/jquery 폴더 안에 들어있다.

다음 코드를 분석해 보자!

### 🧐 분석할 코드

```ts
// test.ts
$("p").removeClass("myClass noClass").addClass("yourClass");
$(["p", "t"]).text("hello");
const tag = $("ul li").addClass((index) => {
  return "item-" + index;
});
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
```

1행에 `$`함수는 어떻게 사용할 수 있는지 먼저 알아보자.

### `$`함수 분석

`$`위에서 마우스 오른쪽 버튼을 클릭 후 Go to Definition 메뉴를 선택하면 아래와 같은 화면이 표시된다.

<img width="604" alt="스크린샷 2024-03-08 오전 1 54 59" src="https://github.com/swJaNG12/TypeScript-Study/assets/95855640/a7de1d5b-12a0-4059-9bcf-3374e524beb6">

- misc.d.ts 파일에서 `$`변수가 있는 걸 확인할 수 있다.
  $와 jQuery 변수는 JQueryStatic 인터페이스이므로 인터페이스를 확인하기 위해 `JQueryStatic.d.ts`파일로 이동하자.

```ts
// JQueryStatic.d.ts
///...
 <TElement extends HTMLElement = HTMLElement>(html: JQuery.htmlString, ownerDocument_attributes?: Document | JQuery.PlainObject): JQuery<TElement>;
 ///...
```

JQueryStatic.d.ts 파일에서 $함수의 매개변수는 `html: JQuery.htmlString`이고, 반환값은 `JQuery<TElement>`이다. 먼저 매개변수 타입부터 알아보자 htmlString에서 Go to Definition 해보면 아래와 같이 타이핑 되어있다.

#### $함수의 매개변수 `htmlString` 타입 분석

```ts
// misc.d.ts
declare namespace JQuery {
  ///..,.
  type TypeOrArray<T> = T | T[];
  type Node = Element | Text | Comment | Document | DocumentFragment;
  type htmlString = string;

  type Selector = string;

  interface PlainObject<T = any> {
    [key: string]: T;
  }
  ///..,.
}
```

htmlString은 string이기 때문에 `$("p")`처럼 매개변수로 string을 받을 수 있다.
`declare namespace JQuery`와 같이 다른 패키지에서도 htmlString이 있기 때문에 충돌을 방지하기 위해 다음 네임스페이스를 사용한다.
`JQuery.htmlString`으로 타이핑하면 문자열이라는 의미뿐만 아니라 html 문자열이라는 의미를 추가로 나타낼 수 있기 때문에 조금 더 구체적으로 타입 별칭을 선언한 것이다.

#### $함수의 반환값 `JQuery<TElement>` 타입 분석

```ts
    <TElement extends HTMLElement = HTMLElement>(html: JQuery.htmlString, ownerDocument_attributes?: Document | JQuery.PlainObject): JQuery<TElement>;
```

- 위의 코드를 보면 HTMLElement 타입 제약이 걸려있고, 기본값도 HTMLElement이다.(Go to Definition 해보면 다음과 같다.)

```ts
// lib.dom.d.ts
interface HTMLElement
  extends Element,
    ElementCSSInlineStyle,
    ElementContentEditable,
    GlobalEventHandlers,
    HTMLOrSVGElement {
  //...
}
```

### 🧐 분석할 코드

```ts
$("p").removeClass("myClass noClass").addClass("yourClass");
```

다시 처음에 살펴봤던 코드를 보면 $("p")의 반환값이 `JQuery<TElement>`라는 것을 알아냈다. 따로 TElement를 표시하지 않았기 때문에 기본값인 HTMLElement가 된다.
이제 `removeClass` 메서드 타입을 분석해 보자.

### removeClass 메서드 분석

```ts
// jQuery.d.ts
    ///...
    removeClass(className_function?: JQuery.TypeOrArray<string> | ((this: TElement, index: number, className: string) => string)): this;
    ///...
```

위의 코드를 보면 removeClass 함수의 인수가 `JQuery.TypeOrArray<string>`이거나 `((this: TElement, index: number, className: string) => string)`임을 알수있다. <br/> test.ts파일에서 정의한 `removeClass("myClass noClass")`는 함수가 아니므로 `JQuery.TypeOrArray<string>`임을 추측할 수 있다.

### TypeOrArray 타입 분석

```ts
// misc.d.ts
declare namespace JQuery {
  type TypeOrArray<T> = T | T[];
  type Node = Element | Text | Comment | Document | DocumentFragment;

  type htmlString = string;

  type Selector = string;

  interface PlainObject<T = any> {
    [key: string]: T;
  }
  ///...
}
```

TypeOrArray 타입을 보면 타입 선언에 따라 `T | T[]`이므로, removeClass("myClass noClass")도 가능하고, removeClass(["myClass noClass"])도 가능함을 유추할 수 있다.
다만, 두 기능이 완전히 같은지 타입 선언만 보고는 알 수 없기 때문에 실제 기능은 구현부를 보고 파악해야 한다.

<br>

### 🧐 분석할 코드

이번엔 3행 코드를 분석해 보자!

```ts
$(["p", "t"]).text("hello");
```

#### $함수를 Go To Definition 해보면 다음과 같이 오버로딩이 표시되어 있다.

```ts
//...
 <T extends JQuery.PlainObject>(object: T): JQuery<T>;
 //..
```

타입 매개변수 T에는 `JQuery.PlainObject`제약이 걸려있다.`PlainObject`은 일반 객체를 의미하는 타입이고,["p", "t"]와 같은 배열도 객체이므로 제약을 충족한다. 따라서
`$(["p", "t"])`의 반환값 타입은 `JQuery<string[]>`이 된다.

#### text메서드도 알아보자

```ts
text(text_function: string | number | boolean | ((this: TElement, index: number, text: string) => string | number | boolean)): this;
```

addClass 메서드의 타입을 보고 인수로 함수를 넘길 수도 있음을 알게 되었다.
그래서 다음과 같은 코드가 가능한 것이다.

```ts
const tag = $("ul li").addClass(function (index) {
  return "item-" + index;
});
$(tag).html(function (i) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
```

- tag는 `JQuery<HTMLElement>`가 되므로 함수 내부에서 this까지 사용할 수 있다.
  `$(tag)`가 가능한지 확인해보자. $함수에서 Go to Definition를 해보면 다음과 같은 오버로딩이 가리키고 있다.

```ts
    <T extends Element>(element_elementArray: T | ArrayLike<T>): JQuery<T>;
```

위의 코드를 보면 `JQuery<HTMLElement>`가 `T | ArrayLike<T>`에 대입 가능하다는 뜻이다. T의 제약이 Element이므로 `JQuery<HTMLElement>`가 `Element | ArrayLike<HTMLElement>`에 대입 가능해야 한다.`

#### ArrayLike 타입은 다음과 같다.

```ts
// lib.es5.d.t
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}
```

`ArrayLike<Element>`타입은 `[n: number]: Element`를 속성으로 가지는 객체이고, `JQuery<HTMLElement>`도 해당 속성을 가지는지 확인한다.

### data 메서드 분석

```ts
// jQuery.d.ts
   data(key: string): any;
```

data메서드는 반환값이 any이지만 string과 더하므로 string이 되어 html의 함수 인수의 반환값인 jQuery.htmlString에 대입할 수 있다.

# jQuery 직접 타이핑하기

```ts
// Z함수가 zQueryInstance 인수를 받을 수 있도록 오버로드로 정의한다.
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
//zQuery 인터페이스는 tag 문자열 또는 배열을 받아서 zQueryInstance 인스턴스를 반환한다. 또한 zQueryInstance 인스턴스를 받아서 zQueryInstance 인스턴스를 반환한다.
//zQueryInstance 인터페이스는 zQuery에 의해 반환된 메서드 정의, this를 반환한다.
//
```

위의 코드를 보면 Z함수가 zQueryInstance 인수를 받을 수 있도록 오버로딩을 추가했고,addClass와 html메서드에도 인수가 함수인 경우에 해당하는 오버로딩을 추가했다.

# export = 타입 이해하기

맨 처음 분석할 코드(index.d.ts파일) 마지막에 있는 export = jQuery의 의미를 알아보자!

```ts
import $ from "jquery";
```

위와 같은 방식은 모듈 시스템의 import 방식인데 어떻게 CommonJs 모듈인 jquery 패키지를 import 할 수 있는 걸까?
CommonJs 모듈인 jquery 패이지를 import 할 수 있는 것은 tsconfig.json에서 esModuleInterop 옵션이 true로 설정되어 있기 때문이다.
이를 false로 바꾸면 아래 예시처럼 에러가 발생하는데 false인 상태로 import 하려면 다음과 같은 문법을 써야 한다.

```ts
import $ = require("jquery"); // Error
```

하지만 위의 예시에서 require과 import 둘 다 쓰는 게 어색한 모습이다 보니, 대부분 esModuleInterop 옵션이 true로 설정하고 import 하는 경우가 많다.

# 스트립트 파일과 모듈 파일

#### test.ts 파일에선 import $ from "jquery"를 불러오지 않았는데 쓸 수 있는 이유는 뭘까?

이는 타입스크립트에서 misc.d.ts 파일을 스크립트 파일로 인색했기 때문이다.
파일 내부에서 최상위 스코프에 import나 export `예약어가 없으면 스크립트 파일`이 되고,
import나 export `예약어가 있으면 모듈 파일`이 되기 때문이다.
마찬가지로 test.ts와 misc.d.ts는 최상위 스코프에 import나 export 예약어가 없으므로 스크립트 파일이다. 따라서 text.ts는 misc.d.ts 에 있는 $ 타입을 자유롭게 가져올 수 있다.

### 정리 : 스크립트 파일이면 예약어가 없어도 $ 타입을 자유롭게 가져올 수 있다.

#### 스크립트 파일

```ts
declare namespace Example {
  const test: string;
}
```

#### 모듈 파일

```ts
declare namespace Example {
  const test: string;
}
export {}; // 예약어
```

다만 import 한 경우의 `$`와 import하지 않은 경우 `$`는 서로 다른 타입을 가리킨다.

```ts
// import한 경우 : index.d.ts파일의 export = jQuery를 import한 것이므로 jQuery타입 사용
declare const jQuery: JQueryStatic;
// import하지 않은 경우 :  misc.d.ts스크립트 파일의 $변수 선언을 가리키므로 declare const $ 타입을 사용
declare const $: JQueryStatic;
```

이때 인터페이스와 네임스페이스는 병합되는 특성이 있다고 했지만 모듈 파일은 인터페이스나 네임스페이스 이름이 같아도 합쳐지지 않는다.

```ts
//module1.ts
export interface Test {
  name: string;
}

export default function () {
  console.log("default export");
}
//module2.ts
export interface Test {
  name2: string;
}
```

```ts
import * as module1 from "./module1";
import * as module2 from "./module2";

// 같은 이름의 Test 인터페이스가 있지만 모듈 파일이므로 서로 합쳐지지 않는다.
// 즉 존재하지 않는 속성에서 에러가 발생한다.
const ex1: module1.Test = {
  name: "hi",
  //name2: "error", // Error
};
const ex2: module2.Test = {
  //name: "error", // Error
  name2: "hi",
};
```

- module1.ts와 module2.ts에 Test라는 이름이 같은 인터페이스가 있지만 모듈 파일이므로 서로 합쳐지지 않는다. 즉 합쳐지지 않으므로 존재하지 않는 속성에서 에러가 발생한다.

- `import * as 네임스페이스  from 모듈`
  - 이 문법은 해당 모듈에 존재하는 모든 export를 지정한 네임스페이스의 멤버로 가져오는 것이다.
    module1.ts는 Test 인터페이스와 export default 한 함수를 갖고 있고, 이 둘은 module3.ts에서 각각 module1.Test, module1.default로 불러올 수 있다.
    따라서 모듈 파일에서는 보통 네임스페이스를 사용하지 않는다.

##### 모듈 파일에서는 import할 대상이 값이 아니라 타입임을 명시할 수 있다.

다음 module4.ts와 module5.를 만들어 다음과 같이 타입임을 명시해 보자.

```ts
// module4.ts
interface Name {
  first: string;
  last: string;
}
interface Age {
  korean: number;
  american: number;
}
export type { Age }; // export 대상은 값이 아니라 타입임을 명시하는 것이다.
export default Name;
```

```ts
import type Name from "./module4";
import type { Age } from "./module4"; // 값이 아니라 타입을 불러온다. (Type-Only import/export)라고 부른다,
const name: Name = {
  first: "zero",
  last: "cho",
};

const age: Age = {
  american: 28,
  korean: 30,
};
```

- Type-Only import/export란 위의 코드와 같이 모듈을 가져오거나 내보낼 때 실제 구현을 가져오지 않고 타입 정보만 가져오거나 내보내는 것을 의미한다.
- Type-Only import/export 주의할 점!
  import type Name, { Age } from "./module4"
  이렇게 같이 한 번에 쓸 수 없다. 형식 전용 가져오기는 기본 가져오기 또는 명명된 바인딩을 지정할 수 있지만, 둘 다 지정할 수는 없다.

# js 파일 생성하기

이제 test.ts 파일의 코드를 자바스크립트 파일로 변환해 보자!
다음과 같이 터미널에 npx tsc를 입력하면 타입스크립트 파일을 자바스크립트 파일로 변환할 수 있다.

> npx tsc

그럼 다음과 같은 test.js 파일이 생성된다.

```js
$("p").removeClass("myClass noClass").addClass("yourClass");
$(["p", "t"]).text("hello");

const tag = $("ul li").addClass(function (index) {
  return "item-" + index;
});
$(tag).html(function (i) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
```

tsconfig.json 파일에서 -> "target" : "ES5" 이렇게 target을 변경해 결과물의 문법 버전을 조정할 수 있다. 최신 문법을 지원하지 않는 구형 브라우저나 옛 버전 노드를 위한 코드를 만들 때 필요한 옵션이다.
npx tsc 속도 올리기 -> tsconfig.json -> incremental 옵션 true로 변경하면 된다.
