import React, { useEffect, useRef, useState } from "react";
import DesktopIcon from "./desktopIcon";
import ContextMenu from "./ContextMenu";
import { connect } from "react-redux";
import Explorer from "../explorer/explorer";
import TextEditor from "../../files/TextEditor/TextEditor";
import FOLDER_IMAGE from "../../../assets/icons/folder.svg";
import FILE_IMAGE from "../../../assets/icons/file.svg";
import { createActivity } from "../../../actions/createActivityAction";
import "../../../assets/desktop/desktopWorkingArea.css";
import { resetToDefault } from "../../../actions/desktopActions";
import DialogBox from "../dialogBox/dialogBox";
import {
  makeDirectoryAction,
  makeFileAction,
} from "../../../actions/fileSystemActions";

const LinkFooter = ({ system }) => {
  return (
    <div className="link-footer">
      Open in new Tab:{" "}
      <a href={system.link} target="_blank" rel="noreferrer">
        {system.link}
      </a>
    </div>
  );
};
const IframeContainer = ({ system }) => {
  return (
    <iframe
      src={system.link}
      title={system.name}
      className="portfolio-container-iframe"
    />
  );
};

const DesktopWorkingArea = ({
  activityList,
  fileSystem,
  createActivity,
  resetToDefault,
  makeFileAction,
  makeDirectoryAction,
}) => {
  const desktopWorkingRef = useRef(null);
  const [newDir, setNewDir] = useState({
    open: false,
    isFolder: false,
    name: "",
  });
  const [contextShown, setContextShown] = useState(false);
  const [resetSettingsOpen, setResetSettingsOpen] = useState(false);
  const [contextPosition, setContextPosition] = useState({ top: 0, left: 0 });
  const contextMenuHeight = 300;

  const contextArray = [
    { name: "Menu", onClick: () => {} },
    { name: "Terminal", onClick: () => createActivity({ name: "terminal" }) },
    {
      name: "New File",
      onClick: () => setNewDir({ open: true, isFolder: false, name: "" }),
    },
    {
      name: "New Folder",
      onClick: () => setNewDir({ open: true, isFolder: true, name: "" }),
    },
    {
      name: "Customise Display",
      onClick: () => createActivity({ name: "settings" }),
    },
    { name: "Reset Settings", onClick: () => setResetSettingsOpen(true) },
  ];

  const resetSuccess = () => {
    setResetSettingsOpen(false);
    resetToDefault();
  };
  const iconChanger = (system) => {
    return system.icon
      ? system.icon
      : system.type === "folder"
      ? FOLDER_IMAGE
      : FILE_IMAGE;
  };
  const startTask = (system) => {
    if (system.type === "file") {
      if (system.link) {
        if (system.inPage) {
          createActivity({
            name: system.name,
            newApp: true,
            image: iconChanger(system),
            footer: <LinkFooter system={system} />,
            child: () => <IframeContainer system={system} />,
          });
        } else {
          window.open(system.link);
        }
      } else {
        createActivity({
          name: system.name,
          newApp: true,
          image: iconChanger(system),
          footer: <>Auto Save</>,
          child: () => <TextEditor system={system} />,
        });
      }
    }
  };
  useEffect(() => {
    desktopWorkingRef.current.addEventListener("contextmenu", (e) => {
      try {
        e.preventDefault();
        setContextShown(false);
        setTimeout(() => {
          setContextShown(true);
          let posX = e.clientX;
          let posY = e.clientY;
          let winWidth = window.innerWidth;
          let winHeight = window.innerHeight;
          if (winWidth - 235 < posX) posX = winWidth - 235;
          if (winHeight - (contextMenuHeight + 5) < posY)
            posY = winHeight - (contextMenuHeight + 5);
          setContextPosition({ top: posY, left: posX });
        }, 50);
      } catch (err) {
        return null;
      }
    });
  }, []);
  const makeNewDir = () => {
    if (newDir.name) {
      if (newDir.isFolder)
        makeDirectoryAction({
          pathArray: ["desktop"],
          folderName: newDir.name,
        });
      else
        makeFileAction({
          pathArray: ["desktop"],
          fileName: newDir.name,
        });
      setNewDir({ ...newDir, name: "", open: false, isFolder: false });
    } else alert("Please Enter a name");
  };
  return (
    // No Parent component Other than the main div
    <div className="desktop-area-container" ref={desktopWorkingRef}>
      <DialogBox
        onSuccess={resetSuccess}
        onCancel={() => setResetSettingsOpen(false)}
        isOpen={resetSettingsOpen}
        successText={"Reset"}
        heading={"Reset Settings"}
        body={"Sure! You want to reset to your default settings?"}
      />
      <DialogBox
        onSuccess={makeNewDir}
        onCancel={() => setNewDir(false)}
        isOpen={newDir.open}
        successText={"Save"}
        heading={`New ${newDir.isFolder ? "Folder" : "File"}`}
        body={
          <input
            type="text"
            className="new-file-folder-input"
            placeholder={`${newDir.isFolder ? "Folder" : "File"} Name`}
            onChange={(e) => setNewDir({ ...newDir, name: e.target.value })}
          />
        }
      />
      <ContextMenu
        isOpen={contextShown}
        close={() => setContextShown(false)}
        top={contextPosition.top}
        left={contextPosition.left}
        contextArray={contextArray}
        height={contextMenuHeight}
      />
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
              icon={iconChanger(system)}
              name={system.name}
              width={"60px"}
              clickTask={() => startTask(system)}
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

export default connect(mapStateToProps, {
  createActivity,
  makeDirectoryAction,
  resetToDefault,
  makeFileAction,
})(DesktopWorkingArea);
