import React from "react";
declare namespace Zeact {
  const useState: <T>(initial: T) => [T, (value: T) => void];
  const useRef: <T>(initial: T | null) => {
    current: T | null;
  };

  const useEffect: (callback: Function, deps: unknown[]) => void;
  const useCallback: <T extends Function>(callback: T, deps: unknown[]) => T;

  // function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
  interface FunctionComponent<P> {
    (props: P): JSX.Element;
  }
  interface FormEvent<T> {
    preventDefault(): void;
  }
  interface ChangeEvent<T> {
    currentTarget: T;
  }
  type ReactNode = React.ReactNode;
}

interface Props {
  children: Zeact.ReactNode;
  onSubmit: (e: Zeact.FormEvent<HTMLFormElement>) => void;
}

const Form: Zeact.FunctionComponent<Props> = ({ children, onSubmit }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

const WordRelay = () => {
  const [word, setWord] = Zeact.useState("제로초");
  const [value, setValue] = Zeact.useState("");
  const [result, setResult] = Zeact.useState("");
  const inputEl = Zeact.useRef<HTMLInputElement>(null);

  Zeact.useEffect(() => {
    console.log("useEffect");
  }, []);

  const onSubmitForm = Zeact.useCallback(
    (e: Zeact.FormEvent<HTMLFormElement>) => {
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

  const onChange = Zeact.useCallback(
    (e: Zeact.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    []
  );

  return (
    <>
      <div>{word}</div>
      <Form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력!</button>
      </Form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
/*
- useState, useRef
 범용적으로 사용하려면 제네릭을 사용하는게 좋다.
- useState는 initial 매개변수가 string이므로 T도 string이 된다.
- useRef는 initial이 null이지만 타입 매개변수 T에 HTMLInputElement를 직접 넣었기 때문에 current는 HTMLInputElement | null이 된다.

- useEffect , useCallback
둘 다 두 번째 매개변수 deps 배열을 추가하고,useCallback은 추가로 매개변수로 받은 함수를 그대로 반환해야 한다.

두 번째 매개변수 deps에 unknown 배열을 추가하고, useCallback에는 타입 매개변수 T를 사용했다. 대신 T에는 Function 제약을 걸어두어 함수 외의 것은 들어오지 못하게 했다.

- ChangeEvent, FormEvent

이 두 인터페이스는 제네릭 타입 매개변수가 붙어 있으므로 각각 FormEvent와 ChangeEvent의 target 객체에 대한 유형을 지정한다.

- FunctionComponent,ReactNode도
FunctionComponent도 JSX.Element타입을 반환하도록 지정하고, children타입인 ReactNode도 React.ReactNode타입으로 지정해준다.
 */
