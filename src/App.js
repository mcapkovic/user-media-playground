import React from 'react';
import logo from './logo.svg';
import './App.css';
import Recorder from './components/Recorder';

function App() {

  const [rec, setRec] = React.useState(false)

  return (
    <div >
 aa
 <button onClick={() => setRec(!rec)}> record</button>
 {rec &&  <Recorder />}

    </div>
  );
}

export default App;
