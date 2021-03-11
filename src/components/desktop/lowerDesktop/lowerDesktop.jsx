import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import {
  dropDownToggle,
  activityDropDownToggle,
  changeStartMenu,
} from '../../../actions/desktopActions';
import { createActivity } from '../../../actions/createActivityAction';
import NavItem from './navItem';
import DesktopWorkingArea from '../desktopWorkingArea/desktopWorkingArea';
import { applications } from '../../../actions/defaultApps';
import StartMenu from '../startMenu/startMenu';
import '../../../assets/desktop/lowerDesktop.css';

const LowerDesktop = ({
  activityDropDown,
  dropDownOpen,
  dropDownToggle,
  activityDropDownToggle,
  createActivity,
  isStartMenuOpen,
  changeStartMenu,
  activityList,
}) => {
  const closeDropDown = () => {
    if (dropDownOpen || activityDropDown) {
      dropDownToggle(false);
      activityDropDownToggle(false);
    }
  };
  const hightlightApp = useCallback(
    (name) => {
      let isShown = false;
      activityList.forEach((act) => {
        if (act.name === name) isShown = true;
      });
      return isShown;
    },
    [activityList]
  );

  return (
    <div className="lower-desktop-grid" onClick={closeDropDown}>
      <div className="left-navigation-bar">
        <div>
          {applications.defaultApps.map((app, index) => (
            <NavItem
              key={`nav-list-${index}`}
              clickTask={() => createActivity({ name: app.key })}
              hightlight={hightlightApp(app.name)}
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
          <NavItem hightlight={isStartMenuOpen}>
            <svg
              height="50px"
              width="50px"
              className="start-icon-container"
              onClick={() => changeStartMenu(!isStartMenuOpen)}
            >
              <circle cx="25px" cy="25px" className="start-icon-svg" />
            </svg>
          </NavItem>
        </div>
      </div>
      {isStartMenuOpen ? <StartMenu /> : <DesktopWorkingArea />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dropDownOpen: state.desktopReducers.dropDownOpen,
  activityDropDown: state.desktopReducers.activityDropDown,
  isStartMenuOpen: state.desktopReducers.isStartMenuOpen,
  activityList: state.activityReducers.activity,
});
export default connect(mapStateToProps, {
  dropDownToggle,
  createActivity,
  activityDropDownToggle,
  changeStartMenu,
})(LowerDesktop);
