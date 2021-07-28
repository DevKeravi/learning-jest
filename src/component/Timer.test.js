import Timer from "./Timer";
import { render, screen } from "@testing-library/react";

// 초가 갱신 되기 때문에 계속 실패한다.
// 업데이트를 해도 계속 실패한다.
// 그렇기에 mock 컴포넌트를 이용하여 시간을 고정값으로 반환하게 해준다.
// 자주 변하는 값들은 테스트시 mock을 이용하여 snapshot 테스트를 진행한다.
test("초 표시", () => {
  Date.now = jest.fn(() => 123456789); // 추가된 mock
  const el = render(<Timer />);
  expect(el).toMatchSnapshot();
});
