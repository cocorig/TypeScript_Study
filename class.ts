//접근 제한자(Access modifier) - public , private , protected

/*
public - 자식 클래스 , 클래스 인스턴스 모두 접근 가능
protected - 자식 클래시에서 접근 가능,  클래스 인스턴스로는 참조 x
private - 해당 클래스 내부에서만 접근 가능 , 제일 제한적 , #으로도 사용가능
*/

/* private 적용
class Car {
  #name: string = "Car";
  year: number;
  constructor(year: number) {
    this.year = year;
  }
  start() {
    console.log("start");
    console.log(this.#name);
  }
}

class Volvo extends Car {
  constructor(year: number) {
    super(year);
  }

  showName() {
    에러 //console.log(this.#name); // 기본 private는 Car 클래스 외부에서는 접근 불가능
  }
}

*/

/* protected 적용
class Car {
  protected name: string = "Car";
  year: number;
  constructor(year: number) {
    this.year = year;
  }
  start() {
    console.log("start");
    console.log(this.name);
  }
}

class Volvo extends Car {
  constructor(year: number) {
    super(year);
  }

  showName() {
    console.log(this.name);
  }
}
const z4 = new Volvo(2020);
 // console.log(z4.name); // 에러 : 클래스ㅡ인스턴스로는 참조 불가능
*/

//static , abstract 추상클래스 적용 , readonly 값 수정 불가능
abstract class Car {
  readonly name: string = "Car";
  color: string;
  static wheels = 4; // this x  -> 클래스 명을 적어줌
  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }
  start() {
    console.log("start");
    console.log(this.name);
    console.log(Car.wheels); //  클래스 명을 적어줌
  }

  abstract doSomething(): void;
}

class Bmw extends Car {
  constructor(color: string, name: string) {
    super(color, name);
  }

  showName() {
    console.log(this.name);
  }
  doSomething() {
    alert("추상클래스");
  }
}

const z4 = new Bmw("red", "볼보");
// console.log(z4.name)
console.log(z4.start());
console.log(z4.doSomething());

// z4.name = '볼보2' 에러
// console.log(z4.name)

// 추상 class  , 클래스 앞에 abstract붙임
// new로 객체를 만들 수 없고, 상속을 통해 가능
// 프로퍼티나 메소드의 이름만 선언해주고, 구체적인 기능은 상속 받는 쪽에서 구현해야함
