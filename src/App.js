import React from "react";
import "./App.css";
import Recorder from "./components/Recorder";

function App() {
  const [rec, setRec] = React.useState(false);

  return (
    <div>
      <button onClick={() => setRec(!rec)}> open recorder</button>
      <br/>

      {rec && <Recorder />}
    </div>
  );
}

export default App;
