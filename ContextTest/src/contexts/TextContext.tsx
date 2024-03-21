import { createContext, useState, useContext, ReactNode } from "react";

function useStoreData() {
  const store = useState({
    first: "",
    last: "",
  });
  return store;
}
type UseStoreDataReturnType = ReturnType<typeof useStoreData>;
/*
useStoreData함수의 반환 타입을 추출
[상태값의 타입, 상태를 업데이트하는 함수의 타입]
ReturnType : 함수의 반환 타입을 추출
typeof : 함수, 클래스 또는 객체의 타입을 추출
useState는 배열을 반환하므로 UseStoreDataReturnType은 다음과 같다.

type UseStoreDataReturnType = [{
    first: string;
    last: string;
}, React.Dispatch<React.SetStateAction<{
    first: string;
    last: string;
}>>]
 */

const TextContext = createContext<UseStoreDataReturnType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const useTextInput = () => {
  const context = useContext(TextContext);
  if (!context)
    throw new Error("useTextInput는 TextContext 내에서 사용해야 합니다.");
  return context;
};
export default function TextInputContextProvider({ children }: ProviderProps) {
  const store = useState({
    first: "",
    last: "",
  });
  return <TextContext.Provider value={store}>{children}</TextContext.Provider>;
}
