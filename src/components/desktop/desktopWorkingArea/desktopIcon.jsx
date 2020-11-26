import React from "react";
import "../../../assets/desktop/desktopIcon.css";

const DesktopIcon = ({ name, icon, width, clickTask }) => {
  return (
    <>
      <div className="desktop-icon-container" onClick={clickTask}>
        <div className="desktop-icon">
          <img
            src={icon}
            width={width}
            alt={name}
            style={{ margin: "0 auto" }}
          />
          {name}
        </div>
      </div>
    </>
  );
};

export default DesktopIcon;
