const fn = {
  add: (num1, num2) => num1 + num2,
  makeUser: (name, age) => ({ name, age, gender: undefined }),
  throwErr: () => {
    throw new Error("xx");
  },
  getName: (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 1000);
    // 1초뒤 name을 callback의 첫번째 인수로 만들어줌
  },
  getAge: () => {
    const age = 30;
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(age);
      }, 1000);
    });
    // 1초뒤에 age를 response로 return 함
  },
  createUser: (name) => {
    console.log("실제로 사용자가 생성되었습니다");
    return {
      name,
    };
  },
};

module.exports = fn;
