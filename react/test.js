"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Form_1 = __importDefault(require("./Form"));
// const WordRelay: () => JSX.Element
const WordRelay = () => {
  const [word, setWord] = (0, react_1.useState)("제로초");
  const [value, setValue] = (0, react_1.useState)("");
  const [result, setResult] = (0, react_1.useState)("");
  const inputEl = (0, react_1.useRef)(null);
  // React.RefObject<HTMLInputElement>
  (0, react_1.useEffect)(() => {
    //'() => string' 형식은 'void | Destructor' 형식에 할당할 수 없습니다.
    console.log("useEffect");
    // return () => {
    //   return "no";
    // };
  }, []);
  //onSubmitForm,onChange와 같이 변수 값이 함수인 경우 변수 자체에 타이핑하는 것이 조금 더 좋은 방법일 수 있다.매개변수와 반환값의 한 번애 타이핑할 수 있기 때문이다.
  // 어떤 타입을 표기해야 하는지 알기위해 onSubmit과 onChange속성의 타입을 확인해야 한다.
  const onSubmitForm = (0, react_1.useCallback)(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("딩동댕");
        setWord(value);
        setValue("");
        if (input) {
          input.focus();
        }
      } else {
        setResult("땡");
        setValue("");
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );
  const onChange = (0, react_1.useCallback)((e) => {
    setValue(e.currentTarget.value);
  }, []);
  return (
    <>
      <div>{word}</div>
      <Form_1.default onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력!</button>
      </Form_1.default>
      <div>{result}</div>
    </>
  );
};
exports.default = WordRelay;
