import React from "react";
import Hello from "./component/Hello";
import Timer from "./component/Timer";
import "./App.css";

const user = {
  name: "Mike",
  age: 30,
};

function App() {
  return (
    <div className="App">
      <Timer />
      <Hello user={user} />
    </div>
  );
}

export default App;
