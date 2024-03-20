import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useContext,
} from "react";

// type Dispatch<A> = (value: A) => void, A 상태를 업데이트(변경)하는 함수,setState 함수의 역할을 한다.주로 useState,useReducer훅에서 사용한다.

// type SetStateAction<S> = S | ((prevState: S) => S)
// 상태를 업데이트하는 데에 필요한 액션으로, 이전 상태를 기반으로 다음 상태를 계산하는 함수나, 직접적으로 다음 상태 값을 나타내는 값으로 구성 되어있다. Dispatch를 사용하여 상태를 업데이트하는 데에 사용한다.
/*
const useCustomState = (): Dispatch<SetStateAction<number>> => {
  const [count, setCount] = useState(0);
  return setCount;
}
*/

export interface CountType {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}
export const useCounts = () => {
  const context = useContext(CountContext);
  if (!context)
    throw new Error("useCounts는 CountContext 내에서 사용해야 합니다.");
  return context;
};

const CountContext = createContext<CountType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export default function CountContextProvider({ children }: ProviderProps) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}
