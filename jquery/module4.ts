interface Name {
  first: string;
  last: string;
}
interface Age {
  korean: number;
  american: number;
}
export type { Age }; // export대상은 값이 아니라 타입임을 명시하는 것이다.
export default Name;
