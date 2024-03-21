import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  FormEventHandler,
  ChangeEventHandler,
  FormEvent,
  ChangeEvent,
} from "react";

const WordRelay = () => {
  const [word, setWord] = useState("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);
  // React.RefObject<HTMLInputElement>

  useEffect(() => {
    //'() => string' 형식은 'void | Destructor' 형식에 할당할 수 없습니다.
    console.log("useEffect");
    // return () => {
    //   return "no";
    // };
  }, []);
  //onSubmitForm,onChange와 같이 변수 값이 함수인 경우 변수 자체에 타이핑하는 것이 조금 더 좋은 방법일 수 있다.매개변수와 반환값의 한 번애 타이핑할 수 있기 때문이다.
  // 어떤 타입을 표기해야 하는지 알기위해 onSubmit과 onChange속성의 타입을 확인해야 한다.
  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
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

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
