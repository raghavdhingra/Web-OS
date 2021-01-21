import React, { useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  updateZIndexActivity,
  removeActivity,
  toggleActivityMaximise,
  updatePositionActivity,
  updateDimensionActivity,
} from "../../../actions/activityActions";
import fileImage from "../../../assets/icons/file.svg";
import "../../../assets/desktop/explorer.css";

const Explorer = ({
  activity,
  updateZIndexActivity,
  updateDimensionActivity,
  explorerIndex,
  removeActivity,
  toggleActivityMaximise,
  updatePositionActivity,
}) => {
  const explorerRef = useRef(null);
  const elementToDrag = useRef(null);

  const updateZIndex = () => updateZIndexActivity(explorerIndex);
  const closeActivity = () => removeActivity(explorerIndex);

  // const updateDimension = (height, width) =>
  //   updateDimensionActivity({ height, width, activityIndex: explorerIndex });

  const dragElement = useCallback(() => {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (explorerRef.current)
      explorerRef.current.addEventListener("mousedown", () => dragMouseDown());
    else
      elementToDrag.current.addEventListener("mousedown", () =>
        dragMouseDown()
      );
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      let elementHeight = elementToDrag.current.offsetHeight;
      let elementWidth = elementToDrag.current.offsetWidth;
      let elementTopOffset = elementToDrag.current.offsetTop;
      let elementLeftOffset = elementToDrag.current.offsetLeft;
      let topVal = elementTopOffset - pos2;
      let leftVal = elementLeftOffset - pos1;

      // Condition For Keeping Explorer in Window
      if (topVal < 34) topVal = 34;
      if (leftVal < 60) leftVal = 60;

      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;

      if (topVal + elementHeight > windowHeight)
        topVal = windowHeight - elementHeight;

      if (leftVal + elementWidth > windowWidth)
        leftVal = windowWidth - elementWidth;
      updatePositionActivity({
        top: topVal,
        left: leftVal,
        activityIndex: explorerIndex,
      });
    }
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }, [updatePositionActivity, explorerIndex]);
  const toggleMaximise = () =>
    toggleActivityMaximise({
      activityIndex: explorerIndex,
      isMaximise: !activity.isMaximise,
    });

  useEffect(() => {
    if (!activity.isMaximise) dragElement();
  }, [dragElement, activity]);
  return (
    <div
      className="explorer-container"
      style={{
        top: activity.isMaximise ? "34px" : activity.top,
        left: activity.isMaximise ? "60px" : activity.left,
        height: activity.isMaximise ? "calc(100vh - 35px)" : activity.height,
        width: activity.isMaximise ? "calc(100vw - 62px)" : activity.width,
        zIndex: activity.zIndex,
      }}
      ref={elementToDrag}
      onMouseDown={updateZIndex}
    >
      <div className="explorer-header">
        <div
          className="explorer-header-heading"
          onDoubleClick={toggleMaximise}
          ref={explorerRef}
        >
          <div className="explorer-heading-name-icon-container">
            <div className="centralise">
              <img
                src={activity && activity.image ? activity.image : fileImage}
                height="15px"
                width="15px"
                alt="explorer heading"
              />
            </div>
            <div className="centralise">
              <span>{activity && activity.name}</span>
            </div>
          </div>
        </div>
        <div className="explorer-header-btn-container">
          <div className="explorer-close-btn">-</div>
          <div className="explorer-close-btn" onClick={toggleMaximise}>
            <svg height="18px" width="18px">
              <rect
                x="6px"
                y="6px"
                height="6px"
                width="6px"
                fill="#0000"
                strokeWidth="1.5px"
                stroke="#fff"
              ></rect>
            </svg>
          </div>
          <div
            className="explorer-close-btn explorer-close-color"
            onClick={closeActivity}
          >
            &times;
          </div>
        </div>
      </div>
      <div className="explorer-body">
        {activity && activity.child({ activity })}
      </div>
      {activity && activity.footer ? (
        <div className="explorer-footer">{activity.footer}</div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  activityList: state.activityReducers.activity,
});

export default connect(mapStateToProps, {
  updateZIndexActivity,
  removeActivity,
  toggleActivityMaximise,
  updatePositionActivity,
  updateDimensionActivity,
})(Explorer);
