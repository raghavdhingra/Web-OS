import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeBackImage } from "../../actions/desktopActions";
import Taskbar from "./taskbar/taskbar";
import PowerOff from "./powerOff/powerOff";
import LowerDesktop from "./lowerDesktop/lowerDesktop.jsx";
import Back1 from "../../assets/background/wall-1.svg";
import Back2 from "../../assets/background/wall-2.svg";
import Back3 from "../../assets/background/wall-3.svg";
import Back4 from "../../assets/background/wall-4.svg";
import Back5 from "../../assets/background/wall-5.svg";
import Back6 from "../../assets/background/wall-6.svg";
import "../../assets/desktop/desktop.css";

const Desktop = ({ brightness, background, changeBackImage }) => {
  const backgroundArray = [
    { img: Back1, cover: true },
    { img: Back2, cover: true },
    { img: Back3, cover: false },
    { img: Back4, cover: true },
    { img: Back5, cover: true },
    { img: Back6, cover: false },
  ];
  useEffect(() => {
    const imgNum = parseInt(localStorage.getItem("backImage"));
    if (imgNum)
      if (imgNum < backgroundArray.length) changeBackImage(imgNum);
      else changeBackImage(3);
    else changeBackImage(3);
  }, [backgroundArray, changeBackImage]);
  return (
    <>
      <PowerOff backImage={backgroundArray[background - 1]} />
      <div
        className={`desktop-container ${
          backgroundArray[background - 1].cover ? "image-cover" : ""
        }`}
        style={{
          backgroundImage: `url(${backgroundArray[background - 1].img})`,
          filter: `brightness(${brightness})`,
        }}
      >
        <div className="desktop-taskbar-grid">
          <Taskbar />
          <LowerDesktop />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  dropDownOpen: state.desktopReducers.dropDownOpen,
  background: state.desktopReducers.background,
  brightness: state.desktopReducers.brightness,
});

export default connect(mapStateToProps, { changeBackImage })(Desktop);
