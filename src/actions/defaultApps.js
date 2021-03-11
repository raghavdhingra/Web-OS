import React from 'react';
import TerminalImage from '../assets/icons/terminal.svg';
import CameraImage from '../assets/icons/camera.svg';
import BrowserImage from '../assets/icons/browser.svg';
import SettingsImage from '../assets/icons/setting.svg';
import TerminalWindow from '../components/applications/terminal/terminal';
import Camera from '../components/applications/camera/camera';
import Browser from '../components/applications/browser/browser';
import Settings from '../components/applications/settings/settings';

import PROFILE_IMAGE from '../assets/icons/profile.svg';
import PROJECT_IMAGE from '../assets/icons/project.svg';
import ARCHIVE_IMAGE from '../assets/icons/archive.svg';

// const nullFunction = (supplement) => null;
const width1 = '40px';
const width2 = '50px';
const width3 = '60px';
const width4 = '70px';

export const applications = {
  allApplications: [
    {
      name: 'Browser',
      image: BrowserImage,
      width: width2,
      bigWidth: width4,
      key: 'browser',
      child: (supplement) => <Browser supplement={supplement} />,
    },
    {
      name: 'Camera',
      image: CameraImage,
      width: width1,
      bigWidth: width3,
      key: 'camera',
      child: (supplement) => <Camera supplement={supplement} />,
    },
    {
      name: 'Settings',
      image: SettingsImage,
      width: width2,
      bigWidth: width4,
      key: 'settings',
      child: (supplement) => <Settings supplement={supplement} />,
    },
    {
      name: 'Terminal',
      image: TerminalImage,
      width: width1,
      bigWidth: width3,
      key: 'terminal',
      child: (supplement) => (
        <TerminalWindow
          supplement={supplement}
          // supplement={{ terminalLocation: ["desktop"] }}
        />
      ),
      // footer: nullFunction,
    },
  ],
  socialApps: [
    {
      name: 'Portfolio',
      key: 'portfolio',
      width: width1,
      bigWidth: width3,
      image: PROFILE_IMAGE,
      link: 'https://portfolio.raghavdhingra.com',
    },
    {
      name: 'Projects',
      key: 'projects',
      width: width1,
      bigWidth: width3,
      image: PROJECT_IMAGE,
      link: 'https://portfolio.raghavdhingra.com/projects',
    },
    {
      name: 'Archive',
      key: 'archive',
      image: ARCHIVE_IMAGE,
      width: width1,
      bigWidth: width3,
      link: 'https://archive.raghavdhingra.com',
    },
  ],
  defaultApps: [
    {
      name: 'Terminal',
      image: TerminalImage,
      width: width1,
      key: 'terminal',
      child: (supplement) => (
        <TerminalWindow
          supplement={supplement}
          // supplement={{ terminalLocation: ["desktop"] }}
        />
      ),
      // footer: nullFunction,
    },
    {
      name: 'Browser',
      image: BrowserImage,
      width: width2,
      key: 'browser',
      child: (supplement) => <Browser supplement={supplement} />,
    },
    {
      name: 'Camera',
      image: CameraImage,
      width: width1,
      key: 'camera',
      child: (supplement) => <Camera supplement={supplement} />,
    },
    {
      name: 'Settings',
      image: SettingsImage,
      width: width2,
      key: 'settings',
      child: (supplement) => <Settings supplement={supplement} />,
    },
  ],
};
