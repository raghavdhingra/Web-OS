import React, { useCallback, useEffect, useRef, useState } from 'react';
import DesktopIcon from './desktopIcon';
import ContextMenu from './ContextMenu';
import { connect } from 'react-redux';
import Explorer from '../explorer/explorer';
import TextEditor from '../../applications/textEditor/textEditor';
import FOLDER_IMAGE from '../../../assets/icons/folder.svg';
import FILE_IMAGE from '../../../assets/icons/file.svg';
import { createActivity } from '../../../actions/createActivityAction';
import '../../../assets/desktop/desktopWorkingArea.css';
import {
  resetToDefault,
  changeStartMenu,
  toggleFullScreen,
} from '../../../actions/desktopActions';
import DialogBox from '../dialogBox/dialogBox';
import {
  makeDirectoryAction,
  makeFileAction,
} from '../../../actions/fileSystemActions';

const LinkFooter = ({ system }) => {
  return (
    <div className="link-footer">
      Open in new Tab:{' '}
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
  fileSystems,
  createActivity,
  resetToDefault,
  makeFileAction,
  makeDirectoryAction,
  isFullScreen,
  toggleFullScreen,
  isStartMenuOpen,
  changeStartMenu,
}) => {
  const desktopWorkingRef = useRef(null);
  const [newDir, setNewDir] = useState({
    open: false,
    isFolder: false,
    name: '',
  });
  const [contextShown, setContextShown] = useState(false);
  const [resetSettingsOpen, setResetSettingsOpen] = useState(false);
  const [contextPosition, setContextPosition] = useState({ top: 0, left: 0 });
  const [workingAreaHeight, setWorkingAreaHeight] = useState(0);
  useEffect(() => {
    if (desktopWorkingRef && desktopWorkingRef.current)
      setWorkingAreaHeight(desktopWorkingRef.current.clientHeight);
  }, [desktopWorkingRef]);
  const contextMenuHeight = 232;

  const contextArray = [
    { name: 'Menu', onClick: () => changeStartMenu(!isStartMenuOpen) },
    { name: 'Terminal', onClick: () => createActivity({ name: 'terminal' }) },
    {
      name: 'New File',
      onClick: () => setNewDir({ open: true, isFolder: false, name: '' }),
    },
    {
      name: 'New Folder',
      onClick: () => setNewDir({ open: true, isFolder: true, name: '' }),
    },
    {
      name: 'Customise Display',
      onClick: () => createActivity({ name: 'settings' }),
    },
    {
      name: isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen',
      onClick: () => toggleFullScreen(),
    },
    { name: 'Reset Settings', onClick: () => setResetSettingsOpen(true) },
  ];

  const resetSuccess = () => {
    setResetSettingsOpen(false);
    resetToDefault();
  };
  const iconChanger = (system) => {
    return system.icon
      ? system.icon
      : system.type === 'folder'
      ? FOLDER_IMAGE
      : FILE_IMAGE;
  };
  const startTask = (system) => {
    if (system.type === 'file') {
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
    } else {
      // File Explorer Event
      console.log('Open File Explorer');
    }
  };
  useEffect(() => {
    desktopWorkingRef.current.addEventListener('contextmenu', (e) => {
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
          pathArray: ['desktop'],
          folderName: newDir.name,
        });
      else
        makeFileAction({
          pathArray: ['desktop'],
          fileName: newDir.name,
        });
      setNewDir({ ...newDir, name: '', open: false, isFolder: false });
    } else alert('Please Enter a name');
  };
  const renderDesktopIcons = useCallback(
    ({ allIcons }) => {
      let desktopIconHTML = [];
      let outerIconsArray = [];
      if (workingAreaHeight) {
        let desktopIcons = [...allIcons[0].child];
        let numberOfIcons = parseInt((workingAreaHeight - 30) / 90) - 1;
        if (desktopIcons.length > numberOfIcons) {
          let initialSplitIndex = 0;
          let numOfSplits = Math.ceil(desktopIcons.length / numberOfIcons);
          for (let i = 1; i <= numOfSplits; i++) {
            let arr = desktopIcons.splice(
              initialSplitIndex,
              initialSplitIndex + numberOfIcons
            );
            outerIconsArray.push(arr);
          }
        } else outerIconsArray.push(desktopIcons);
        desktopIconHTML = outerIconsArray.map((desktopIcon, ind) => (
          <div key={`outer-icons-${ind}`}>
            {desktopIcon.map(
              (system, index) =>
                system && (
                  <DesktopIcon
                    key={`desktop-icon-${index}`}
                    icon={iconChanger(system)}
                    name={system.name}
                    width={'60px'}
                    clickTask={() => startTask(system)}
                  />
                )
            )}
          </div>
        ));
      }
      return <>{desktopIconHTML}</>;
    },
    // eslint-disable-next-line
    [workingAreaHeight]
  );
  return (
    // No Parent component Other than the main div
    <div className="desktop-area-container" ref={desktopWorkingRef}>
      <DialogBox
        onSuccess={resetSuccess}
        onCancel={() => setResetSettingsOpen(false)}
        isOpen={resetSettingsOpen}
        successText={'Reset'}
        heading={'Reset Settings'}
        body={'Sure! You want to reset to your default settings?'}
      />
      <DialogBox
        onSuccess={makeNewDir}
        onCancel={() => setNewDir(false)}
        isOpen={newDir.open}
        successText={'Save'}
        heading={`New ${newDir.isFolder ? 'Folder' : 'File'}`}
        body={
          <input
            type="text"
            className="new-file-folder-input"
            placeholder={`${newDir.isFolder ? 'Folder' : 'File'} Name`}
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
      {fileSystems &&
        fileSystems.fileSystem &&
        fileSystems.fileSystem.length &&
        renderDesktopIcons({
          allIcons: fileSystems.fileSystem,
        })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  activityList: state.activityReducers.activity,
  isFullScreen: state.desktopReducers.isFullScreen,
  isStartMenuOpen: state.desktopReducers.isStartMenuOpen,
  fileSystems: state.fileSystemReducers,
});

export default connect(mapStateToProps, {
  createActivity,
  makeDirectoryAction,
  resetToDefault,
  toggleFullScreen,
  makeFileAction,
  changeStartMenu,
})(DesktopWorkingArea);
