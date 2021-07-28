const fn = require("./fn");

// toEqual도 사용가능하다.
test("1 + 1 = 2", () => {
  expect(fn.add(1, 1)).toBe(2);
});

// 객체의 타입이 여러가지일 경우 비교를 위해 toEqual 이나 toStrictEqual을 사용해야한다.
// 즉 toBe는 사용 X
// toStrictEqual 을 사용했을때 지금처럼 undefined 속성이 있으면
// 테스트가 실패한다. toEqual 보다 더 제한적으로 검사를 해준다.
test("이름과 나이를 전달받아서 객체를 반환해줘", () => {
  expect(fn.makeUser("Mike", 30)).toEqual({
    name: "Mike",
    age: 30,
  });
});

// toBeNull
// toBeUndefined
// toBeDefined
// 이름과 같이 널이나 디파인여부를 검색해준다.
test("null should be null", () => {
  expect(null).toBeNull();
});

// toBeTruthy
// toBeFalsy
// false와 true를 비교해준다.
test("0은 false 입니다.", () => {
  expect(fn.add(1, -1)).toBeFalsy();
  // 1 + -1 은 0이므로 0은 false로 간주되기에 테스트 통과
});

test("비어있지 않은 문자열은 true 입니다.", () => {
  expect(fn.add("Hello", "World")).toBeTruthy();
  // 1 + -1 은 0이므로 0은 false로 간주되기에 테스트 통과
});

// toBeGreaterThan 크다
// toBeGreaterThanOrEqual 크거나 같다
// toBeLessThan 작다
// toBeLessThanOrEqual 작거나 같다

test("ID는 10자 이하여야 합니다.", () => {
  const id = "THE_BLACK";
  expect(id.length).toBeLessThanOrEqual(10);
});

// 같다를 처리할때는 toBe로
test("비밀번호 4자리", () => {
  const pw = "1234";
  expect(pw.length).toBe(4);
});

// float 관련 문제로 JS는 완벽한 소수를 구해내지 못한다.
// 그래서 toBe를 사용했을때 오류가 나며
// toBeCloseTo를 이용하여야한다.
test("0.1 더하기 0.2 는 0.3 입니다.", () => {
  expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3);
});

// toMatch 내부 검색을 한다.
test("Apple 에는 A라는 글자가 있나?", () => {
  expect("Apple").toMatch("A");
  // 정규표현식을 이용해도 된다.
  // expect("Apple").toMatch(/A/);
});

// toContain 자료구조 내부 검색을 해준다.
test("Mike 가 유저이니?", () => {
  const user = ["Mike", "Jane", "June"];
  expect(user).toContain("Mike");
});

// 에러 내용도 비교 검출이 가능하다.
test("Throw 된 error가 xx 인가요?", () => {
  expect(() => fn.throwErr()).toThrow("xx");
  // toThrow() 이렇게만 사용하면 에러가 Throw됬는지만 확인한다.
  // 에러 내용이 다를 경우 당연히 테스트 failed
});

// timeout을 이용하여 받아오기에, done을 인자로 주어 대기 상태를 만들어줘야한다.
// 함수가 완료되면 blocking 상태를 done 함수로 호출해 풀어준다.
test("1초 후에 받아온 이름은 Mike", (done) => {
  function callback(name) {
    expect(name).toBe("Mike");
    done();
  }
  fn.getName(callback);
});

// TIP : 5초가 지나면 테스트 실패로 감지하기 때문에
// API 의 응답이 있는지 없는지를 감지하고 싶으면 try catch를 사용해주면 된다.

// Promise 를 이용하면 done을 넘기지 않고도 사용가능하다.
// Promise 를 사용할때는 return을 해줘야 처리가 가능하다.
test("1초 후에 받아온 나이는 30", async () => {
  return await fn.getAge().then((age) => {
    expect(age).toBe(30);
  });
  // return expect(fn.getAge().resolves.toBe(30))
  // 이걸로도 대체가 가능하다.
});

// mock function

const mockFn = jest.fn();

// 목 함수로 빠르게 num + 1 함수를 콜백으로 줄 수 있다
function forEachAdd1(arr) {
  arr.forEach((num) => {
    mockFn(num + 1);
  });
}

forEachAdd1([10, 20, 30]);

// mock 함수는 호출의 횟수도 확인 할 수 있다.
test("함수 호출은 3번 됩니다", () => {
  expect(mockFn.mock.calls.length).toBe(3);
});

// mock 함수는 호출 후 값도 가지고있다.
test("전달된 값은 11, 21, 31 입니다.", () => {
  expect(mockFn.mock.calls[0][0]).toBe(11);
  expect(mockFn.mock.calls[1][0]).toBe(21);
  expect(mockFn.mock.calls[2][0]).toBe(31);
});

// mock function 2
// 실행 할때 마다 값의 결과를 가질 수 있다.

const mockFn2 = jest.fn((num) => num + 1);

mockFn2(10);
mockFn2(20);
mockFn2(30);

test("10에서 1 증가한 값이 반환된다.", () => {
  expect(mockFn2.mock.results[0].value).toBe(11);
});
test("20에서 1 증가한 값이 반환된다.", () => {
  expect(mockFn2.mock.results[1].value).toBe(21);
});
test("30에서 1 증가한 값이 반환된다.", () => {
  expect(mockFn2.mock.results[2].value).toBe(31);
});

// mock function 3
// 내부의 함수를 이용하여 리턴 값을 줄 수 있다.
mockFn3 = jest.fn();
mockFn3
  .mockReturnValueOnce(10)
  .mockReturnValueOnce(20)
  .mockReturnValueOnce(30)
  .mockReturnValue(40);

mockFn3();
mockFn3();
mockFn3();
mockFn3();

test("리턴 밸류 테스트", () => {
  console.log(mockFn3.mock.results);
  expect("dd").toBe("dd");
});

// mock function 4
// mock function 3을 이용해서 숫자 배열안에서 홀수만 꺼내는 예제
// true일 경우 필터에서 제외되기 때문에 홀수만 나감
// 이걸로 작성 한뒤 결과를 확인한 후 실제 코드로 변경
const mockFn4 = jest.fn();

mockFn4
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValue(true);

const result2 = [1, 2, 3, 4, 5].filter((num) => mockFn4(num));

test("홀수는 1, 3, 5", () => {
  expect(result2).toStrictEqual([1, 3, 5]);
});

// mock function 5
// mockResolvedValue 를 이용하면 비동기 함수도 흉내 낼수 있다.

const mockFn5 = jest.fn();

mockFn5.mockResolvedValue({ name: "Mike" });

test("받아온 이름은 Mike", () => {
  mockFn5().then((res) => {
    expect(res.name).toBe("Mike");
  });
});

// mock function 6
// 테스트를 해야할 경우 실제로 생성 하지 않는 테스틀 만드는 것
// 첫번째 코드는 실제로 함수를 호출해서 생성해버린다.
test("유저를 만든다.", () => {
  const user = fn.createUser("Mike");
  expect(user.name).toBe("Mike");
});

// 두번째 코드는 mock module 화 시켜서 실제로 생성하지 않고 테스팅을 가능하게해준다.
// fn 선언부만 놔둔후 나머지를 주석 밑의 코드를 주석 제거 해보면 테스팅 가능하다.
/*
jest.mock("./fn");
fn.createUser.mockReturnValue({ name: "Mike" });

test("유저를 만든다 (mock)", () => {
  const user = fn.createUser("Mike");
  expect(user.name).toBe("Mike");
});
*/

// mock function 7
// 그 외 유용한 메서드
const mockFn7 = jest.fn();

mockFn7(10, 20);
mockFn7();
mockFn7(30, 40);
test("한번 이상 호출 되면 호출", () => {
  expect(mockFn7).toBeCalled();
});

test("정확하게 3번 호출?", () => {
  expect(mockFn7).toBeCalledTimes(3);
});
test("10이랑 20 전달받은 함수가 있는가?", () => {
  expect(mockFn7).toBeCalledWith(10, 20);
});
test("마지막 함수는 30이랑 40을 받았는가?", () => {
  expect(mockFn7).lastCalledWith(30, 40);
});
