import React from "react";
import "../../assets/common/toggleButton.css";

const ToggleButton = ({ toggleOn, toggleAction }) => {
  return (
    <div
      className={`toggle-button-container ${
        toggleOn ? "toggle-button-container-active" : ""
      }`}
      onClick={toggleAction}
    >
      <div
        className={`toggle-button ${toggleOn ? "toggle-button-active" : ""}`}
      ></div>
    </div>
  );
};

export default ToggleButton;
