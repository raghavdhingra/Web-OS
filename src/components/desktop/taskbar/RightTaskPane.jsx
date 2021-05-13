import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DropDown from '../dropdown/dropdown';
import {
  batteryStatus,
  onlineStatus,
  networkType,
  dropDownToggle,
  dateStatus,
} from '../../../actions/desktopActions';
import Wifi from '../../../assets/icons/wifi.svg';
import Battery from '../../../assets/icons/battery.svg';
import Charging from '../../../assets/icons/lighting.svg';
import DropDownCaret from '../../../assets/icons/dropdown-white.svg';

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
    let batteryObj;
    if (navigator.getBattery) batteryObj = await navigator.getBattery();
    else batteryObj = { level: 1, charging: true };
    const { level, charging } = batteryObj;
    batteryStatus({ level, charging });

    //online status
    onlineStatus(navigator.onLine);

    // connection type
    let connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    networkType(connection ? connection.effectiveType : '4g');

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
      <div onClick={toggleDropDown}>
        <div className="right-displayed-container">
          <div className="centralise">
            <img src={Wifi} height="17px" alt="Wifi" />
          </div>
          <div className="centralise">
            {battery && battery.charging ? (
              <img
                src={Charging}
                className="charging-icon"
                height="12px"
                alt="Charging"
              />
            ) : null}
          </div>
          <div className="centralise">
            <img src={Battery} height="17px" alt="Battery" />
          </div>
          <div className="centralise">
            <div>{battery && parseInt(battery.level * 100)}%</div>
          </div>
          <div className="centralise">
            <div
              className={`right-task-item ${
                dropDownOpen ? 'drop-caret-up' : ''
              }`}
            >
              <img src={DropDownCaret} alt="dropdown" width="10px" />
            </div>
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
