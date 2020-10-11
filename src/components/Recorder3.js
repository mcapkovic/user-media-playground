import React from "react";
import ReactAudioPlayer from "react-audio-player";
import AudioRecorder from "audio-recorder-polyfill";
import RecordingCount from "./RecordingCount";
if (!window.MediaRecorder) window.MediaRecorder = AudioRecorder;

function Recorder3(props) {
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [audio, setAudio] = React.useState(null);
  const [stream, setStream] = React.useState(null);
  const [error, setError] = React.useState(null);

  const startListening = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((newStream) => {
        const newMediaRecorder = new MediaRecorder(newStream);

        newMediaRecorder.addEventListener("dataavailable", (e) => {
          setAudio(URL.createObjectURL(e.data));
        });
        newMediaRecorder.start();

        setMediaRecorder(newMediaRecorder);
        setStream(newStream);
      })
      .catch(function (err) {
        setError(err);
        console.warn("The following getUserMedia error occured: " + err);
      });
  };

  const record = async () => {
    await startListening();
  };

  const stop = () => {
    try {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    } catch (err) {}
  };

  const isRecording =
    mediaRecorder && mediaRecorder.state === "recording" ? true : false;
  // console.log("mediaRecorder", mediaRecorder && mediaRecorder.state === 'recording');
  return (
    <div>
      <h1>Example 3</h1>
      <div>
        advantage:
        <br />- mic is on only during the recording
        <br />- working with audio-recorder-polyfill <br />
      </div>
      <ReactAudioPlayer controls src={audio} autoPlay />
      <br />
      <button disabled={isRecording} onClick={record}>
        start recording
      </button>
      <button disabled={!isRecording} onClick={stop}>
        stop recording
      </button>
      <div>
        status:
        {isRecording ? (
          <div>
            <span> recording....</span>
            <RecordingCount />
          </div>
        ) : (
          <span>not recording</span>
        )}
      </div>
    </div>
  );
}

export default Recorder3;
