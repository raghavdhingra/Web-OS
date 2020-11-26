import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../../../assets/desktop/powerOff.css";

const PowerOff = ({ backImage, powerOff }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (powerOff.active) {
      setTimeout(() => {
        setIsActive(true);
        setTimeout(() => {
          window.close();
        }, 4000);
      }, powerOff.timer * 1000);
    }
  }, [powerOff]);

  return (
    <div
      className={`power-off-container ${isActive ? "" : "display-none"} ${
        backImage.cover ? "image-cover" : ""
      }`}
      style={{ backgroundImage: `url(${backImage.img})` }}
    >
      <div className="power-off-inner-container centralise">
        <div className="power-off-loader-container">
          <div className="centralise">
            <svg height="40px" width="40px" className="loader-rotate">
              <circle className="loader-lg" />
            </svg>
          </div>
          <div className="shutdown-loader-text centralise">SHUTTING DOWN</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  powerOff: state.desktopReducers.powerOff,
});

export default connect(mapStateToProps)(PowerOff);
