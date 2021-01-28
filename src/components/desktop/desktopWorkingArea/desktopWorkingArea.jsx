import React from "react";
import DesktopIcon from "./desktopIcon";
import { connect } from "react-redux";
import Explorer from "../explorer/explorer";
import FOLDER_IMAGE from "../../../assets/icons/folder.svg";
import FILE_IMAGE from "../../../assets/icons/file.svg";
import "../../../assets/desktop/desktopWorkingArea.css";

const DesktopWorkingArea = ({ activityList, fileSystem }) => {
  const iconChanger = (system) => {
    return system.icon
      ? system.icon
      : system.type === "folder"
      ? FOLDER_IMAGE
      : FILE_IMAGE;
  };
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
      {console.log(fileSystem[0].child)}
      {fileSystem[0].child.map(
        (system, index) =>
          system && (
            <DesktopIcon
              key={`desktop-icon-${index}`}
              icon={iconChanger(system)}
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
