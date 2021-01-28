import React, { useState } from "react";
import DropDownCaret from "../../../assets/icons/dropdown.svg";
import DialogBox from "../dialogBox/dialogBox";
import Brightness from "../../../assets/icons/brightness.svg";
import {
  changeBrightness,
  powerOffStatus,
} from "../../../actions/desktopActions";
import { connect } from "react-redux";
import "../../../assets/desktop/dropdown.css";

const DropDown = ({
  isOnline,
  networkType,
  battery,
  changeBrightness,
  brightness,
  powerOffStatus,
}) => {
  const [isPowerDialogOpen, setPowerDialog] = useState(false);
  const togglePowerDialog = () => setPowerDialog(!isPowerDialogOpen);
  const closeWindow = () => powerOffStatus({ active: true, timer: 0 });
  return (
    <>
      <DialogBox
        onSuccess={closeWindow}
        onCancel={togglePowerDialog}
        isOpen={isPowerDialogOpen}
        successText={"Shut down"}
        heading={"Shut Down"}
        body={"Please confirm that you want to shut down?"}
      />
      <div className="drop-down-container">
        <div className="drop-drop-caret-pointed-container">
          <img
            src={DropDownCaret}
            className="drop-drop-caret-pointed"
            width="20px"
            alt="drop down"
          />
        </div>
        <div className="drop-down-inner-container">
          <div className="drop-down-items no-cursor">
            <div className="drop-down-grid">
              <img src={Brightness} alt="brightness" width="17px" />
              <div className="centralise">
                <input
                  type="range"
                  min="40"
                  max="100"
                  className="brightness-scroll-line"
                  value={brightness * 100}
                  onChange={(e) => changeBrightness(e.target.value / 100)}
                ></input>
              </div>
            </div>
          </div>
          <div className="dropdown-hr"></div>
          <div className="drop-down-items">
            <div
              className="network-dot"
              style={{
                backgroundColor: `${isOnline ? "rgba(0,255,0,0.5)" : "red"}`,
              }}
            ></div>
            {isOnline ? `Connected (${networkType})` : "Not Connected"}
          </div>
          <div className="drop-down-items">
            <div
              className="network-dot"
              style={{
                backgroundColor: `${
                  battery.charging ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.8)"
                }`,
              }}
            ></div>
            Battery: {parseInt(battery.level * 100)}% (
            {battery.charging ? "Charging" : "Not charging"})
          </div>
          <div className="dropdown-hr"></div>
          <div className="drop-down-items cursor-pointer">Log out</div>
          <div
            className="drop-down-items cursor-pointer"
            onClick={togglePowerDialog}
          >
            Power off
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  brightness: state.desktopReducers.brightness,
  battery: state.desktopReducers.battery,
  isOnline: state.desktopReducers.isOnline,
  networkType: state.desktopReducers.networkType,
});

export default connect(mapStateToProps, { changeBrightness, powerOffStatus })(
  DropDown
);
