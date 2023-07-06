import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../../../assets/applications/camera.css";
import DOWNLOAD_ICON from "../../../assets/icons/download.svg";
import STOP_WATCH from "../../../assets/icons/stopwatch.svg";

const Camera = ({ supplement, triggerIndex, isTriggered, activityList }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const runningTimer = useRef(null);

  const [timer, setTimer] = useState(0);
  const [isCaptured, setIsCaptured] = useState(false);
  const [mediaObject, setMediaObject] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const drawOnCanvas = useCallback(() => {
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const width = videoRef.current.offsetWidth;
      const height = videoRef.current.offsetHeight;
      const WHRatio = width / height;
      ctx.drawImage(videoRef.current, 0, 0, 300, 300 / WHRatio);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width / 2; x++) {
          const i = (y * canvas.width + x) * 4;
          const mirrorI = (y * canvas.width + (canvas.width - 1 - x)) * 4;

          // Swap pixel values between the original and mirrored positions
          for (let j = 0; j < 4; j++) {
            const temp = data[i + j];
            data[i + j] = data[mirrorI + j];
            data[mirrorI + j] = temp;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);

      setIsCapturing(false);
    } catch (err) {
      return null;
    }
  }, []);

  const captureMoment = useCallback(() => {
    setIsCapturing(true);
    if (isCaptured) {
      setIsCaptured(false);
    }
    setTimeout(() => {
      drawOnCanvas();
      setIsCaptured(true);
    }, timer * 1000);
  }, [drawOnCanvas, isCaptured, timer]);

  const stopCamera = useCallback(
    () => mediaObject && mediaObject.stop(),
    [mediaObject]
  );

  const changeTimer = useCallback(() => {
    let timeArray = [0, 2, 5, 10];
    let index = timeArray.indexOf(timer);
    setTimer(
      index === timeArray.length - 1 ? timeArray[0] : timeArray[index + 1]
    );
  }, [timer]);

  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.download = "camera-screenshot.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  }, []);

  useEffect(() => {
    let indexToRemove = activityList.findIndex(
      (e) => e.date === supplement.activity.date
    );
    if (indexToRemove === triggerIndex && isTriggered) stopCamera();
  }, [triggerIndex, isTriggered, activityList, stopCamera, supplement]);

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
      <div className='camera-container'>
        <video className='camera-video-container' ref={videoRef}></video>
        <div className='camera-container-overlay'>
          <div />
          <div>
            <div className='camera-button-container'>
              <div className='camera-button-upper-container'>
                <div className='camera-timer-container' onClick={changeTimer}>
                  <img src={STOP_WATCH} alt='Stop Watch' />
                  {timer}s
                </div>
              </div>
              <svg
                className='camera-capture-button-svg'
                onClick={captureMoment}
              >
                <circle
                  cx='2rem'
                  cy='2rem'
                  r='1.5rem'
                  className='camera-capture-button'
                />
              </svg>
              <div />
            </div>
          </div>
        </div>
        {isCapturing && (
          <div className='timer-container' ref={runningTimer}></div>
        )}
      </div>
      <div
        className='captured-image'
        style={{ display: isCaptured ? "block" : "none" }}
      >
        {isCaptured && (
          <button
            className='image-download-button-canvas button-base'
            onClick={downloadImage}
          >
            <img
              alt='download icon'
              src={DOWNLOAD_ICON}
              height={10}
              width={10}
            />
          </button>
        )}
        {isCaptured && (
          <button
            className='image-close-button-canvas button-base'
            onClick={() => setIsCaptured(false)}
          >
            &times;
          </button>
        )}
        <canvas className='captured-image-canvas' ref={canvasRef}></canvas>
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
