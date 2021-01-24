import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../../../assets/files/camera.css";
import DOWNLOAD_ICON from "../../../assets/icons/download.png";
import STOP_WATCH from "../../../assets/icons/stopwatch.svg";

const Camera = ({ supplement, triggerIndex, isTriggered, activityList }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const runningTimer = useRef(null);
  const [timer, setTimer] = useState(0);
  const [mediaObject, setMediaObject] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    let videoStream;
    if (videoRef) {
      const getVideoStream = async () => {
        try {
          videoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          videoRef.current.srcObject = videoStream;
          videoRef.current.play();
          setMediaObject(videoStream.getTracks()[0]);
        } catch {
          console.log("Camera permission not given");
        }
      };
      getVideoStream();
    }
  }, []);
  const captureMoment = () => {
    setIsCapturing(true);
    if (!isCaptured) {
      setTimeout(() => {
        setIsCaptured(true);
        let canvasContext = canvasRef.current.getContext("2d");
        canvasContext.drawImage(videoRef.current, 0, 0, 300, 150);
        setIsCapturing(false);
      }, timer * 1000);
    } else {
      setIsCaptured(false);
      setTimeout(() => {
        setTimeout(() => {
          let canvasContext = canvasRef.current.getContext("2d");
          canvasContext.drawImage(videoRef.current, 0, 0, 300, 150);
          setIsCaptured(true);
          setIsCapturing(false);
        }, 100);
      }, timer * 1000);
    }
  };
  const stopCamera = useCallback(() => mediaObject && mediaObject.stop(), [
    mediaObject,
  ]);
  const changeTimer = () => {
    let timeArray = [0, 2, 5, 10];
    let index = timeArray.indexOf(timer);
    setTimer(
      index === timeArray.length - 1 ? timeArray[0] : timeArray[index + 1]
    );
  };
  const downloadImage = () => {
    const link = document.createElement("a");
    link.download = "camera-screenshot.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };
  useEffect(() => {
    let indexToRemove = activityList.findIndex(
      (e) => e.date === supplement.activity.date
    );
    if (indexToRemove === triggerIndex && isTriggered) stopCamera();
  }, [triggerIndex, isTriggered, activityList, stopCamera, supplement]);
  useEffect(() => {
    if (isCapturing && timer) {
      let latestTimer = timer;
      runningTimer.current.innerHTML = `<span class="fade-out-anim">${timer}</span>`;
      let interval = setInterval(() => {
        if (latestTimer === 0) clearInterval(interval);
        else {
          latestTimer = latestTimer - 1;
          try {
            runningTimer.current.innerHTML = `<span class="fade-out-anim">${latestTimer}</span>`;
          } catch (err) {
            return null;
          }
        }
      }, [1000]);
    }
  }, [isCapturing, timer]);
  return (
    <>
      <div className="camera-container">
        <video className="camera-video-container" ref={videoRef}></video>
        <div className="camera-container-overlay">
          <div></div>
          <div>
            <div className="camera-button-container">
              <div className="camera-button-upper-container">
                <div className="camera-timer-container" onClick={changeTimer}>
                  <img src={STOP_WATCH} alt="Stop Watch" />
                  {timer}s
                </div>
              </div>
              <svg
                className="camera-capture-button-svg"
                onClick={captureMoment}
              >
                <circle className="camera-capture-button" />
              </svg>
              <div></div>
            </div>
          </div>
        </div>
        {isCapturing && (
          <div className="timer-container" ref={runningTimer}></div>
        )}
      </div>
      <div
        className="captured-image"
        style={{ display: isCaptured ? "block" : "none" }}
      >
        {isCaptured && (
          <div className="image-download-button-canvas" onClick={downloadImage}>
            <img alt="download icon" src={DOWNLOAD_ICON} />
          </div>
        )}
        {isCaptured && (
          <div
            className="image-close-button-canvas"
            onClick={() => setIsCaptured(false)}
          >
            &times;
          </div>
        )}
        <canvas className="captured-image-canvas" ref={canvasRef}></canvas>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  triggerIndex: state.activityReducers.triggerIndex,
  isTriggered: state.activityReducers.isTriggered,
  activityList: state.activityReducers.activity,
});
export default connect(mapStateToProps)(Camera);
