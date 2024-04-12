"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
http
    .createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
        res.writeHead(200);
        res.end(data);
    });
    try {
        const data = yield fs.promises.readFile(path.join(__dirname, "index,html"));
    }
    catch (error) {
        console.error(error);
    }
}))
    .listen(8000, () => {
    console.log("서버 시작됨");
});
