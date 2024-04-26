"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plus_1 = __importDefault(require("./plus"));
const minus_1 = __importDefault(require("./minus"));
const multiply_1 = __importDefault(require("./multiply"));
const divide_1 = __importDefault(require("./divide"));
exports.default = {
    plus: plus_1.default,
    minus: minus_1.default,
    multiply: multiply_1.default,
    divide: divide_1.default,
};
/** 각 파일이 타입스크립트 파일이 아니라서 any로 추론된다.
 *
 * (property) plus: (...arg: any[]) => any
 * (property) minus: (a: any, b: any) => number
 * (property) multiply: (...arg: any[]) => any
 * (property) divide: (a: any, b: any) => number
 *
 */
