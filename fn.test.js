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
