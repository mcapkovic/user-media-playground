import React from "react";
import "./App.css";
import Recorder from "./components/Recorder";
import Recorder2 from "./components/Recorder2";
import Recorder3 from "./components/Recorder3";

function App() {
  const [example1, setExample1] = React.useState(false);
  const [example2, setExample2] = React.useState(false);
  const [example3, setExample3] = React.useState(false);

  return (
    <div>
      <button onClick={() => setExample1(!example1)}> recorder example1</button>
      <button onClick={() => setExample2(!example2)}> recorder example2</button>
      <button onClick={() => setExample3(!example3)}> recorder example3</button>
      <hr />
      {example1 && <Recorder />}
      {example2 && <Recorder2 />}
      {example3 && <Recorder3 />}

    </div>
  );
}

export default App;
