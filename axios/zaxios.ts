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
