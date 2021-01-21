import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../../../assets/files/camera.css";

const Camera = ({ supplement, triggerIndex, isTriggered, activityList }) => {
  const videoRef = useRef(null);
  const [mediaObject, setMediaObject] = useState(null);

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
  const stopCamera = useCallback(() => mediaObject && mediaObject.stop(), [
    mediaObject,
  ]);
  useEffect(() => {
    let indexToRemove = activityList.findIndex(
      (e) => e.date === supplement.activity.date
    );
    if (indexToRemove === triggerIndex && isTriggered) stopCamera();
  }, [triggerIndex, isTriggered, activityList, stopCamera, supplement]);

  return (
    <>
      <div className="camera-container">
        <video className="camera-video-container" ref={videoRef}></video>
        <div className="camera-container-overlay">
          <div></div>
          <div>
            <div className="camera-button-container">
              <div></div>
              <svg className="camera-capture-button-svg">
                <circle className="camera-capture-button" />
              </svg>
              <div></div>
            </div>
          </div>
        </div>
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
