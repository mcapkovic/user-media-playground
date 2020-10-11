import React from "react";
import ReactAudioPlayer from "react-audio-player";

function Recorder2(props) {
  return (
    <div>
      <ReactAudioPlayer
        controls
        // src={audio}
        autoPlay
        // onPlay={(e) => console.log("onPlay", e)}
        // onEnded={(e) => console.log("onEnded", e)}
        // onEnded={onEnded}
      />
    </div>
  );
}

export default Recorder2;
