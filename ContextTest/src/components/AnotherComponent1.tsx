import AnotherComponent3 from "./AnotherComponent3";
import { useCounts } from "../contexts/CountContext";
export default function AnotherComponent1() {
  console.log("AnotherComponent1 렌더링");
  const { count, setCount } = useCounts();
  return (
    <>
      <div>{count}</div>
      <AnotherComponent3 />
      <button onClick={() => setCount((prev) => prev + 1)}></button>
    </>
  );
}
