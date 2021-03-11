import React, { useMemo, useState } from 'react';
import ThemeChanger from './components/ThemeChanger';
import FontChanger from './components/FontChanger';
import Personalise from './components/Personalise';
import { resetToDefault } from '../../../actions/desktopActions';
import DialogBox from '../../desktop/dialogBox/dialogBox';
import '../../../assets/applications/settings.css';
import { connect } from 'react-redux';

const Settings = ({ resetToDefault }) => {
  const [settingIndex, setSettingIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const settingsArray = useMemo(
    () => [
      { name: 'Theme', component: <ThemeChanger /> },
      { name: 'Font Style', component: <FontChanger /> },
      { name: 'Personalise', component: <Personalise /> },
      {
        name: 'Reset to Default',
        onClick: () => setIsDialogOpen(true),
      },
    ],
    []
  );
  const resetSuccess = () => {
    setIsDialogOpen(false);
    resetToDefault();
  };
  return (
    <>
      <DialogBox
        onSuccess={resetSuccess}
        onCancel={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
        successText={'Reset'}
        heading={'Reset Settings'}
        body={'Sure! You want to reset to your default settings?'}
      />
      <div className="settings-container">
        <div className="settings-left-container">
          {settingsArray.map((settings, index) => (
            <div
              className={`settings-left-button ${
                settingIndex === index ? 'settings-left-button-active' : ''
              }`}
              key={`settings-${index}`}
              onClick={() =>
                settings.component ? setSettingIndex(index) : settings.onClick()
              }
            >
              {settings.name}
            </div>
          ))}
        </div>
        <div className="settings-right-container">
          <div className="settings-right-inner-container">
            <div className="settings-right-inner-container-header">
              {settingsArray[settingIndex].name}
            </div>
            <div className="settings-right-inner-container-bottom">
              {settingsArray[settingIndex].component}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { resetToDefault })(Settings);
