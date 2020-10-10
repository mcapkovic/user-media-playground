import React from "react";
import { useUserMedia } from "../hooks/useUserMedia";
import ReactAudioPlayer from "react-audio-player";

import AudioRecorder from "audio-recorder-polyfill";

if(!window.MediaRecorder) window.MediaRecorder = AudioRecorder;

const constraints = { audio: true, video: false };

function Recorder(props) {
  const { stream, error } = useUserMedia(constraints);

  const [title, setTitle] = React.useState("Record");
  const [mediaRecorder, setMediaRecorder] = React.useState();
  const [audio, setAudio] = React.useState(null);

  console.log({ stream });
  const startListening = () => {
    const newMediaRecorder = new MediaRecorder(stream);

    newMediaRecorder.addEventListener("dataavailable", (e) => {
      setAudio(URL.createObjectURL(e.data));
    });

    newMediaRecorder.start();
    setMediaRecorder(newMediaRecorder);
  };

  const stop = () => {
    if (mediaRecorder) mediaRecorder.stop();
  };

//   console.log("MediaRecorder", window.MediaRecorder);
//   console.log("error", error);
//   console.log("stream", stream);

  return (
    <div>
      {!error && (
        <React.Fragment>
          <button onClick={startListening}>record</button>
          <button onClick={stop}>stop</button>
        </React.Fragment>
      )}

      {true && (
        <ReactAudioPlayer
          // controls
          src={audio}
          autoPlay
          // onPlay={(e) => console.log("onPlay", e)}
          // onEnded={(e) => console.log("onEnded", e)}
          // onEnded={onEnded}
        />
      )}
    </div>
  );
}

export default Recorder;
