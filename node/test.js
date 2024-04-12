"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
http_1.default
    .createServer((req, res) => {
    fs_1.default.readFile(path_1.default.join(__dirname, "index.html"), (err, data) => {
        res.writeHead(200);
        res.end(data);
    });
})
    .listen(8000, () => {
    console.log("서버 시작됨");
});
