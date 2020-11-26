import React from "react";
import { connect } from "react-redux";
import {
  dropDownToggle,
  activityDropDownToggle,
} from "../../../actions/desktopActions";
import { createActivity } from "../../../actions/createActivityAction";
import NavItem from "./navItem";
import DesktopWorkingArea from "../desktopWorkingArea/desktopWorkingArea";
import { defaultApps } from "../../../actions/defaultApps";
import "../../../assets/desktop/lowerDesktop.css";

const LowerDesktop = ({
  activityDropDown,
  dropDownOpen,
  dropDownToggle,
  activityDropDownToggle,
  createActivity,
}) => {
  const closeDropDown = () => {
    if (dropDownOpen || activityDropDown) {
      dropDownToggle(false);
      activityDropDownToggle(false);
    }
  };

  return (
    <div className="lower-desktop-grid" onClick={closeDropDown}>
      <div className="left-navigation-bar">
        <div>
          {defaultApps.map((app, index) => (
            <NavItem
              key={`nav-list-${index}`}
              clickTask={() => createActivity({ name: app.key })}
            >
              <img
                src={app.image}
                className="nav-item-image"
                width={app.width}
                alt={app.name}
              />
            </NavItem>
          ))}
        </div>
        <div>
          <NavItem>
            <svg height="50px" width="50px" className="start-icon-container">
              <circle cx="25px" cy="25px" className="start-icon-svg" />
            </svg>
          </NavItem>
        </div>
      </div>
      <DesktopWorkingArea />
    </div>
  );
};

const mapStateToProps = (state) => ({
  dropDownOpen: state.desktopReducers.dropDownOpen,
  activityDropDown: state.desktopReducers.activityDropDown,
});
export default connect(mapStateToProps, {
  dropDownToggle,
  createActivity,
  activityDropDownToggle,
})(LowerDesktop);
