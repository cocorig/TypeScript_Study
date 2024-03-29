"use strict";
(async () => {
    try {
        const res = await zaxios.get("https://jsonplaceholder.typicode.com/posts/1");
        console.log(res.data.userId);
        const res2 = await zaxios.post("https://jsonplaceholder.typicode.com/posts", {
            title: "foo",
            body: "bar",
            userId: 1,
        });
        console.log(res2.data.id);
    }
    catch (error) {
        if (zaxios.isAxiosError(error)) {
            console.log(error.response?.data.message);
        }
    }
})();
//Axios 클라이언트를 생성
new ZAxios().get("www.gilbut.co.kr");
zaxios({ url: "www.gilbut.co.kr", method: "get" });
zaxios.create().get("www.gilbut.co.kr");
