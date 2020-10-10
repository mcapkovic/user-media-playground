import React from "react";
import { useUserMedia } from "../hooks/useUserMedia";
import ReactAudioPlayer from "react-audio-player";

import AudioRecorder from "audio-recorder-polyfill";
// window.MediaRecorder = AudioRecorder;

const constraints = { audio: true, video: false };
function Recorder(props) {
  const { stream, error } = useUserMedia(constraints);

  const [title, setTitle] = React.useState("Record");
  const [mediaRecorder, setMediaRecorder] = React.useState();
  const [audio, setAudio] = React.useState(null);

  console.log({ stream });
  const startListening = () => {
    const newMediaRecorder = new MediaRecorder(stream);
    newMediaRecorder.start();
    let chunks = [];
    newMediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    newMediaRecorder.onstop = function (e) {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      const audioURL = window.URL.createObjectURL(blob);
      //   const audio = document.createElement("audio");
      //   audio.setAttribute("id", "player");
      //   audio.src = audioURL;
      //   setAudio(audio);
      setAudio(audioURL);
    };
    setMediaRecorder(newMediaRecorder);
  };

  const stop = () => {
    if (mediaRecorder) mediaRecorder.stop();
  };

  console.log("MediaRecorder", window.MediaRecorder);
  return (
    <div>
      <button onClick={startListening}>record</button>
      <button onClick={stop}>stop</button>
      {audio && (
        <ReactAudioPlayer
          //   controls
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
