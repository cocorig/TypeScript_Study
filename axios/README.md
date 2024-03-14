# 6. Axios 타입 분석하기

### 진입점 파일 찾기

먼저 axios 타입 선언의 집입점이 되는 파일부터 무엇인지 확인해 보자. 어떤 파일인지 알지 위해선
`node_modules/axios/package.json`에서 types 속성을 보면 알 수 있다.

```ts
"type": "module",
"types": "index.d.ts",
```

`types` 속성을 보면 알 수 있듯이 `index.d.ts`이 axios 타입 선언의 진입점이 되는 파일이다.그 외에도 type 속성도 있어서 헷갈릴 수 있지만, 이 둘은 의미하는 게 다르다.
`type` 속성은 axios 패키지가 어떤 모듈 시스템을 사용하는지를 나타낸다. 값이 module이므로 현재 axios 패키지는 ECMAScript 모듈 시스템을 따른다.
type 속성이 없거나 값이 commonjs 이면 해당 패키지는 CommonJS 모듈 시스템을 따른다.

## 타입 분석 예제 코드

```ts
import axios, { AxiosError } from "axios";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

(async () => {
  try {
    const res = await axios.get<Post>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(res.data.userId);
    const res2 = await axios.post<Post>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
    console.log(res2.data.id);
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      console.log(error.response?.data.message);
    }
  }
})();
```

이 예제 코드를 바탕으로 어떻게 axios.get 메서드 호출이 가능한지, <Post\> 제네릭은 무엇인지 알아보자.
<br>

## get 타입 분석

먼저 index.d.ts 파일에서 Axios 클래스를 살펴보자.

```ts
export class Axios {
  constructor(config?: AxiosRequestConfig);
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  ///...
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  ///...
}
```

get 메서드만 보면 첫 번째 타입 매개변수는 `T`로, 예제 코드에서 Post 를 넣은 자리이고, `R`은 기본값이 AxiosResponse<T\>이므로, `AxiosResponse<Post>`가 된다.
반환깂의 타입은 Promise<R\>로 `Promise<AxiosResponse<Post\>>`가 된다.

<br>

다음으로 `AxiosResponse`타입을 알아보자.

```ts
export interface AxiosResponse<T = any, D = any> {
  data: T; // 서버로부터 응답받은 데이터
  status: number; // http 상태 코드
  statusText: string; // http 상태 텍스트
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders; //응답 헤더
  config: InternalAxiosRequestConfig<D>; //요청에 대한 설정
  request?: any; // 요청
}
```

`T` 는 서버로 부터 오는 data를 뜻한다. 타입스크립트에서는 어떤 타입이 될지 추론할 수 없어 미리 명시적으로 타이핑한 것이다.

- `T` : 서버로부터 오는 응답 본문 데이터
- `D` : 서버로 보내는 요청 본문 데이터

이처럼 공식 문서의 설명을 보면 각각 어떤 역할을 하는지 알 수 있다. get요청 시에는 서버로 보내지는 요청이 없기때문에 D를 사용할 일이 없다.

<br>

## post 타입 분석

```ts

 post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
```

- post 타입을 보면 타입 매개변수 `D`는 data로부터 타입이 추론되기 때문에 res2.data는 T이므로 Post가 된다.

<br>

## catch문 타입 분석

```ts
export class AxiosError<T = unknown, D = any> extends Error {
  constructor(
    message?: string,
    code?: string,
    config?: InternalAxiosRequestConfig<D>,
    request?: any,
    response?: AxiosResponse<T, D>
  );
  //...
}
```

`AxiosError` 타입을 보면 `T`타입 매개변수로 `{ message: string }`를 제공했으므로 err.response?.data.message로 사용할 수 있었던 것이다. response가 옵셔널이므로 옵셔널 체이닝 연산자를 사용해야 한다.
AxiosError를 처리할 때 axios.isAxiosError 타입을 서술로 통해 error의 타입을 정확하게 만들 수 있다.

```ts
//..
 catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      console.log(error.response?.data.message);
    }
  }
//..
```

마지막으로 axios타입을 왜 AxiosStatic , AxiosInstance,Axios 타입을 서로 분리하고 상속을 통해 연결했는지 알아보자.

```ts
import axios, { Axios } from "axios";
// Axios
new Axios().get("www.example.com");
// AxiosInstance
axios({ url: "http://www.example.com", method: "get" });
// AxiosStatic
axios.create().get("http://www.example.com");
```

위의 예시처럼 axios는 요청을 보낼 때 다양한 방식을 지원하므로, 상속으로 중복을 제거해 사용하기 위해서 분리하는 것이다.

<br>

## 6.1 Axios 직접 타이핑하기

axios 패키지를 직접 타이핑해보는 연습 ~

```ts
interface ZaxiosError<ResponseData> {
  // Axios 오류 객체의 타입을 정의
  response?: ZaxiosResponse<ResponseData>; // 옵셔널 체이닝 적용
}
interface ZaxiosResponse<ResponseData> {
  //Axios 응답 객체의 타입을 정의
  data: ResponseData;
}
interface Config {
  //HTTP 요청 구성을 나타내는 인터페이스
  url: string;
  method: string;
}
declare class ZAxios {
  //get 및 post 메서드로 HTTP GET 및 POST 요청을 보냄
  constructor();
  get<ResponseData>(url: string): ZaxiosResponse<ResponseData>;
  post<ResponseData>(
    url: string,
    requestData: unknown
  ): ZaxiosResponse<ResponseData>;
}

interface Zaxios extends ZAxios {
  //ZAxios인터패이스를 상속받음
  <ResponseData>(config: Config): ZaxiosResponse<ResponseData>;
  isAxiosError<ResponseData>(
    error: unknown
  ): error is ZaxiosError<ResponseData>; // error타입을 ZaxiosError로 만듬
  create(): Zaxios;
}
declare const zaxios: Zaxios; //Zaxios 인터페이스를 따르는 Axios 클라이언트 객체,declare 예약어를 붙여서 타입 선언만 할 것임을 알림

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

(async () => {
  try {
    const res = await zaxios.get<Post>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(res.data.userId);
    const res2 = await zaxios.post<Post>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
    console.log(res2.data.id);
  } catch (error) {
    if (zaxios.isAxiosError<{ message: string }>(error)) {
      console.log(error.response?.data.message);
    }
  }
})();

//Axios 클라이언트를 생성
new ZAxios().get("www.gilbut.co.kr");

zaxios({ url: "www.gilbut.co.kr", method: "get" });

zaxios.create().get("www.gilbut.co.kr");
```

1. get, post, isAxiosError, create 메서드 만들고, 반환값 ZaxiosResponse으로 선언
2. ZaxiosResponse와 isAxiosError 타입을 만든다.
3. ZAxios 클래스를 선언하고, Zaxios 인터페이스에서 함수 호출이 가능하게끔 타입 추가
4. Zaxios 인터페이스가 ZAxios 클래스를 상속하게 만든다.
   <br>

## 6.2 다양한 모듈 형식으로 js 파일 생성하기

- CommonJS 모듈로 코드를 변환

```json
// tsconfig.json
"module": "commonjs",
"target": "ES2022"
```

```bash
npx tsc
```

- ECMAScript 모듈로 변환

```json
// tsconfig.json

  "module": "ES2015"
  "moduleResolution": "node"

```

```bash
npx tsc
```

- UMD 모듈로 변환

```json
// tsconfig.json
  "module": "UMD"
```

```bash
npx tsc
```

<br>

## 6.3 axios의 타입을 어떻게 찾았는지 이해하기

먼저 axios 자체적으로 타입을 지원하는지, 커뮤니티 타입을 지원하는지부터 알아야 한다.
<u> 자체적으로 타입을 지원하는 경우</u> `node_modules/axios`의 package.json 파일에 types 속성을 확인하면 되고, <u> 커뮤니티 타입을 지원하는 경우</u> `node_modules/@types/axios`
의 types 속성을 확인해야 한다.
이러한 과정을 순서대로 실행하므로 axios의 타입이 어디에 있는지 알 수 있는 것이다.

#### 타입 스크립트가 모듈을 찾는 정확한 순서는 다음과 같다.

1. 현재 파일이 있는 폴더에 node_modules가 있는지 확인하고 있으면 2번부터 12번까지 순차적으로 파일을 찾을 때 까지 수행, 없다면 부모 폴더로 올라가서 다시 1번을 수행

2. node_modules/module.ts

3. node_modules/module.tsx

4. node_modules/module.d.ts

5. node_modules/module/package.json 속성 찾기

6. node_modules/module/index.ts

7. node_modules/module/index.tsx

8. node_modules/module/index.d.ts

9. node_modules/@types/module/package.json 속성 찾기

10. node_modules/@types/module.d.ts

11. node_modules/@types/module/index.d.ts

12. 2 ~ 11번까지 모두 못 찾았으면 부모 폴더로 올라가서 1번을 수행

13. 최상위 폴더까지 갔는데도 못 찾으면 에러

- 다음과 같이 traceResolution 옵션을 붙여서 실행하면 타입스크립트가 타입을 찾는 과정을 알 수있다.

```bash
 npx tsc --traceResolution
```

#### 상대 경로인 모듈을 찾을 때는 다음과 같은 과정을 거친다.

1. module.ts
2. module.tsx
3. module.d.ts
4. module/package.json 속성 찾기
5. module/index.ts
6. module/index.tsx
7. module/index.d.ts
8. 1~7 전부 못 찾으면 에러

이 순서를 외울 필요는 없지만 1~7번 과정의 파일 중 한 가지만 만드는 것이 좋다. 예를 들어
b 모듈이 있다면 b.ts와 b.d.ts, b/index.ts가 동시에 존재한다면 우선순위가 높은 b.ts만 선택되고 나머지는 무시되기 때문에 어떤 파일이 선택되는지 알려면 우선순위가 높은지 알아야 한다. 따라서 파일을 동시에 만들지 않는 것을 추천한다.
