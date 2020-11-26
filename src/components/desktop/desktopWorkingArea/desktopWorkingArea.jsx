import React from "react";
import DesktopIcon from "./desktopIcon";
import { connect } from "react-redux";
import Explorer from "../explorer/explorer";
import SETTINGS from "../../../assets/icons/setting.svg";
import "../../../assets/desktop/desktopWorkingArea.css";

const DesktopWorkingArea = ({ activityList }) => {
  const desktopIcons = [
    { icon: SETTINGS, name: "Settings", width: "60px", click: null },
    { icon: SETTINGS, name: "Settings", width: "60px", click: null },
    { icon: SETTINGS, name: "Settings", width: "60px", click: null },
  ];
  return (
    // No Parent component Other than the main div
    <div className="desktop-area-container">
      {activityList.map(
        (activity, index) =>
          activity && (
            <Explorer
              explorerIndex={index}
              activity={activity}
              key={`explorer-${index}`}
            />
          )
      )}
      {desktopIcons.map((icon, index) => (
        <DesktopIcon
          key={`desktop-icon-${index}`}
          icon={icon.icon}
          name={icon.name}
          width={icon.width}
          clickTask={icon.click}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  activityList: state.activityReducers,
});

export default connect(mapStateToProps)(DesktopWorkingArea);
