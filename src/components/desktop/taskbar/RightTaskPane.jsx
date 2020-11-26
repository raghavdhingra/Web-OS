import React, { useEffect } from "react";
import { connect } from "react-redux";
import DropDown from "../dropdown/dropdown";
import {
  batteryStatus,
  onlineStatus,
  networkType,
  dropDownToggle,
  dateStatus,
} from "../../../actions/desktopActions";
import Wifi from "../../../assets/icons/wifi.svg";
import Battery from "../../../assets/icons/battery.svg";
import Charging from "../../../assets/icons/lighting.svg";
import DropDownCaret from "../../../assets/icons/dropdown.svg";

const RightTaskPane = ({
  battery,
  dropDownOpen,
  batteryStatus,
  onlineStatus,
  networkType,
  dateStatus,
  dropDownToggle,
}) => {
  const toggleDropDown = () => {
    dropDownToggle(!dropDownOpen);
  };
  const getStatus = async () => {
    // battery  status
    let batteryObj = await navigator.getBattery();
    const { level, charging } = batteryObj;
    batteryStatus({ level, charging });

    //online status
    onlineStatus(navigator.onLine);

    // connection type
    let connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    networkType(connection.effectiveType);

    // date status
    dateStatus(new Date());

    setTimeout(() => {
      getStatus();
    }, 5000);
  };
  useEffect(() => {
    getStatus();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="right-task-item-container">
      <div className="centralise" onClick={toggleDropDown}>
        <div className="right-displayed-container">
          <div className="right-task-item">
            <img src={Wifi} height="17px" alt="Wifi" />
          </div>
          <div className="right-task-item">
            <span style={{ height: "19px", overflow: "hidden" }}>
              <img src={Battery} height="17px" alt="Battery" />
              {battery && battery.charging ? (
                <img
                  src={Charging}
                  className="charging-icon"
                  height="10px"
                  alt="Charging"
                />
              ) : null}
            </span>
            &nbsp;
            <div>{battery && parseInt(battery.level * 100)}%</div>
          </div>
          <div
            className={`right-task-item drop-caret ${
              dropDownOpen ? "drop-caret-up" : ""
            }`}
          >
            <img src={DropDownCaret} alt="dropdown" width="10px" />
          </div>
        </div>
        {dropDownOpen ? (
          <div className="right-displayed-container-after"></div>
        ) : null}
      </div>
      {dropDownOpen && <DropDown />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  battery: state.desktopReducers.battery,
  dropDownOpen: state.desktopReducers.dropDownOpen,
});

export default connect(mapStateToProps, {
  batteryStatus,
  networkType,
  onlineStatus,
  dropDownToggle,
  dateStatus,
})(RightTaskPane);
