import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

const user = {
  name: "Tom",
  age: 30,
};
const user2 = {
  age: 20,
};

// snapShot은 성공한 케이스를 저장한뒤
// 성공한 케이스와 값이 달라지면 test failed를 준뒤
// 선택지를 준다.
// 현재의 값으로 새로운 snapshot을 생성할 껀지
// 유지할 껀지 등등 많은 선택지를 준다.
// npm test를 이용하여 testing 가능

test("snapshot : name 있음", () => {
  const el = render(<Hello user={user} />);
  expect(el).toMatchSnapshot();
});
test("snapshot : name 없음", () => {
  const el = render(<Hello user={user2} />);
  expect(el).toMatchSnapshot();
});

test("Hello 라는 글자가 포함되는가?", () => {
  render(<Hello user={user} />);
  const helloEl = screen.getByText(/Hello/i);
  expect(helloEl).toBeInTheDocument();
});
