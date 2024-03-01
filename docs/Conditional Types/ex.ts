// 기본 조건부 타입 --------
interface Animals {
  //슈퍼타입
  live(): void;
}
interface Dog extends Animals {
  // 서브타입
  woof(): void;
}

type Example1 = Dog extends Animals ? number : string;
// Dog extends Animal조건식이 참이 되어 Example1은 number타입이 된다.
//type Example1 = number;

type Example2 = RegExp extends Animals ? number : string;
//RegExp extends Animal조건식이 거잣이 되어 Example2은 string타입이 된다.
//type Example2 = string;

// 제네릭 조건부타입 --------- 조건에 따라 타입을 결정

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "unimplemented";
// }
// 위의 오버로드를 다음 조건부 타입으로 단순화할 수 있음
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}
//createLabel 함수는 제네릭 타입 T를 받아 NameOrId<T> 타입을 반환한다.
let a1 = createLabel("typescript");

//let a1: NameLabel;

let b2 = createLabel(2.8);

//let b2: IdLabel;

let c3 = createLabel(Math.random() ? "hello" : 42);
//let c3: NameLabel | IdLabel;
//function createLabel<"hello" | 42>(idOrName: "hello" | 42): NameLabel | IdLabel

//------------------

interface Product {
  productName: string;
  hasDiscount: boolean;
}

type ProductWithDiscount = {
  productName: string;
  hasDiscount: true;
  discount?: number;
};

type ProductWithoutDiscount = {
  productName: string;
  hasDiscount: false;
};

type ProductDiscount<T> = T extends { hasDiscount: true }
  ? ProductWithDiscount
  : ProductWithoutDiscount;

function getProduct<T extends Product>(product: T): ProductDiscount<T> {
  if (product.hasDiscount) {
    let newProduct = {
      ...product,
      discount: 0.1,
    };

    return newProduct as ProductDiscount<T>;
  }

  return product as ProductDiscount<T>;
}

let productWithDiscount = getProduct({
  productName: "컴퓨터",
  hasDiscount: true,
});

let productWithoutDiscount = getProduct({
  productName: "키보드",
  hasDiscount: false,
});
///--------
