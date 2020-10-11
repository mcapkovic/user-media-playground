import React from "react";
import { useUserMedia } from "../hooks/useUserMedia";
import ReactAudioPlayer from "react-audio-player";

import AudioRecorder from "audio-recorder-polyfill";

if (!window.MediaRecorder) window.MediaRecorder = AudioRecorder;

const constraints = { audio: true, video: false };

function Recorder(props) {
  const { stream, error } = useUserMedia(constraints);

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

  //   console.log("mediaRecorder", mediaRecorder);

  const isRecording =
    mediaRecorder && mediaRecorder.state === "recording" ? true : false;
  return (
    <div>
      <ReactAudioPlayer
        controls
        src={audio}
        autoPlay
        // onPlay={(e) => console.log("onPlay", e)}
        // onEnded={(e) => console.log("onEnded", e)}
        // onEnded={onEnded}
      />
      <br />

      {!error && (
        <React.Fragment>
          <button disabled={isRecording} onClick={startListening}>
            start recording
          </button>
          <button disabled={!isRecording} onClick={stop}>
            stop
          </button>
        </React.Fragment>
      )}
      {isRecording ? <div>recording....</div> : <div>not recording</div>}
    </div>
  );
}

export default Recorder;
