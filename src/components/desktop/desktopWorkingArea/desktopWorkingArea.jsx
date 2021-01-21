import React from "react";
import DesktopIcon from "./desktopIcon";
import { connect } from "react-redux";
import Explorer from "../explorer/explorer";
import SETTINGS from "../../../assets/icons/setting.svg";
import "../../../assets/desktop/desktopWorkingArea.css";

const DesktopWorkingArea = ({ activityList, fileSystem }) => {
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
      {fileSystem[0].child.map(
        (system, index) =>
          system && (
            <DesktopIcon
              key={`desktop-icon-${index}`}
              icon={SETTINGS}
              name={system.name}
              width={"60px"}
              // clickTask={system.click}
            />
          )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  activityList: state.activityReducers.activity,
  fileSystem: state.fileSystemReducers,
});

export default connect(mapStateToProps)(DesktopWorkingArea);
