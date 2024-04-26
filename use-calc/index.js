"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calc_js_1 = __importDefault(require("../calc-js"));
const a = calc_js_1.default.plus(1, 2, 3, 4);
const b = calc_js_1.default.minus(a, 4);
calc_js_1.default.divide(b, 3);
calc_js_1.default.multiply(1, 2, 3, 4);
console.log(a, b);
