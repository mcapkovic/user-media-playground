import React from "react";
import ReactAudioPlayer from "react-audio-player";
import AudioRecorder from "audio-recorder-polyfill";
if (!window.MediaRecorder) window.MediaRecorder = AudioRecorder;

function Recorder2(props) {
  const [title, setTitle] = React.useState("not recording");
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [audio, setAudio] = React.useState(null);

  const startListening = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const newMediaRecorder = new MediaRecorder(stream);
        newMediaRecorder.start();
        let chunks = [];
        newMediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
        newMediaRecorder.onstop = (e) => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const audioURL = window.URL.createObjectURL(blob);
          const audio = document.createElement("audio");
          audio.setAttribute("id", "player");
          audio.src = audioURL;
          setAudio(audio.src);
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        };
        setMediaRecorder(newMediaRecorder);
      })
      .catch(function (err) {
        console.log("The following getUserMedia error occured: " + err);
      });
  };

  const record = async () => {
    navigator.permissions.query({ name: "microphone" }).then(function (result) {
      if (result.state !== "granted") {
        alert("Must allow microphone to record");
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {});
      }
    });
    await startListening();
    setTitle("recording...");
  };

  const stop = () => {
    setTitle("not recording");
    mediaRecorder.stop();
  };

  return (
    <div>
      <div>
        advantage:
        <br />- mic is on only during the recording <br />
        disadvantage:
        <br />- not working with audio-recorder-polyfill
      </div>
      <ReactAudioPlayer controls src={audio} autoPlay />
      <br />
      <button onClick={record}>start recording</button>
      <button onClick={stop}>stop recording</button>
      <div> {title}</div>
    </div>
  );
}

export default Recorder2;
