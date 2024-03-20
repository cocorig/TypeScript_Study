import React from "react";
import CountContextProvider from "./contexts/CountContext";

import AnotherComponent1 from "./components/AnotherComponent1";
import AnotherComponent2 from "./components/AnotherComponent2";

//const CountContext = createContext<CountType | null>(null);

function App() {
  //const [count, setCount] = useState(0);
  return (
    // <CountContext.Provider value={{ count, setCount }}>
    //   <AnotherComponent1 />
    //   <AnotherComponent2 />
    // </CountContext.Provider>
    <CountContextProvider>
      <AnotherComponent1 />
      <AnotherComponent2 />
    </CountContextProvider>
  );
}

export default App;

/*
 <CountContext.Provider value={{ count, setCount }}>와 같이 value 속성을 직접 지정하면 리액트는 새로운 컨텍스트 만들어지고, CountContext.Provider 자식 컴포넌트인 AnotherComponent1과 AnotherComponent2는 새로운 컨텍스트를 참조하게 된다. AnotherComponent1과 AnotherComponent2는 동일한 CountContext를 공유하지 않게 되고, 각각 독립적으로 렌더링된다. 이 때문에 컨텍스트를 사용하지 않는  AnotherComponent2 컴포넌트까지 불필요한 리렌더링이 발생하게 된다. 이를 해결하려면 CountContext.Provider에 value를 직접 지정하지 않고, CountContext.Provider가 자체적으로 상태를 관리하도록, 상태를 관리하는 데에 필요한 로직을 CountContextProvider 함수 안에서 처리해 CountContextProvider를 최상위 컴포넌트로 감싸주면 된다. 이렇게 하면 자식 컴포넌트에게 전달하는 방식으로 동작하므로 CountContext를 사용하지 않는 AnotherComponent2는 불필요한 리렌더링이 발생하지 않는다.
 반면, AnotherComponent1 하위  AnotherComponent3 컴포넌트는 상위 컴포넌트인 AnotherComponent1가 리렌더링될 때마다 AnotherComponent3 또한 리렌더링이 된다.
 이를 방지하기 위해 React.memo로 AnotherComponent3 컴포넌트를 감싸거나, 컨텍스트 값을 useMemo나 useCallback을 사용할 수 있다.
*/
