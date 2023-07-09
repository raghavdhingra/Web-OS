import React from "react";
import TerminalImage from "../assets/icons/terminal.svg";
import CameraImage from "../assets/icons/camera.svg";
import BrowserImage from "../assets/icons/browser.svg";
import SettingsImage from "../assets/icons/setting.svg";
import TerminalWindow from "../components/applications/terminal/terminal";
import Camera from "../components/applications/camera/camera";
import Browser from "../components/applications/browser/browser";
import Settings from "../components/applications/settings/settings";

import PROFILE_IMAGE from "../assets/icons/profile.svg";
import PROJECT_IMAGE from "../assets/icons/project.svg";
import ARCHIVE_IMAGE from "../assets/icons/archive.svg";
import GITHUB_IMAGE from "../assets/icons/octocat.svg";
import FACEBOOK_IMAGE from "../assets/icons/facebook.svg";
import TWITTER_IMAGE from "../assets/icons/twitter.svg";
import INSTAGRAM_IMAGE from "../assets/icons/instagram.svg";
import LINKEDIN_IMAGE from "../assets/icons/linkedin.svg";
import CODEPEN_IMAGE from "../assets/icons/codepen.svg";
import GMAIL_IMAGE from "../assets/icons/gmail.svg";
import MEDIUM_IMAGE from "../assets/icons/medium.svg";
import SPONSOR_IMAGE from "../assets/icons/sponsorship.png";

// const nullFunction = (supplement) => null;
const width1 = "40px";
const width2 = "50px";
const width3 = "60px";
const width4 = "70px";

export const applications = {
  allApplications: [
    {
      name: "Browser",
      image: BrowserImage,
      width: width2,
      bigWidth: width4,
      key: "browser",
      child: (supplement) => <Browser supplement={supplement} />,
    },
    {
      name: "Camera",
      image: CameraImage,
      width: width1,
      bigWidth: width3,
      key: "camera",
      child: (supplement) => <Camera supplement={supplement} />,
    },
    {
      name: "Settings",
      image: SettingsImage,
      width: width2,
      bigWidth: width4,
      key: "settings",
      child: (supplement) => <Settings supplement={supplement} />,
    },
    {
      name: "Terminal",
      image: TerminalImage,
      width: width1,
      bigWidth: width3,
      key: "terminal",
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
      name: "Archive",
      key: "archive",
      image: ARCHIVE_IMAGE,
      width: width1,
      bigWidth: width3,
      link: "https://archive.raghavdhingra.com",
    },
    {
      name: "Portfolio",
      key: "portfolio",
      width: width1,
      bigWidth: width3,
      image: PROFILE_IMAGE,
      link: "https://portfolio.raghavdhingra.com",
    },
    {
      name: "Projects",
      key: "projects",
      width: width1,
      bigWidth: width3,
      image: PROJECT_IMAGE,
      link: "https://portfolio.raghavdhingra.com/projects",
    },
    {
      name: "GitHub",
      key: "github",
      width: width1,
      bigWidth: width3,
      image: GITHUB_IMAGE,
      link: "https://github.com/raghavdhingra",
    },
    {
      name: "Facebook",
      key: "facebook",
      width: width1,
      bigWidth: width3,
      image: FACEBOOK_IMAGE,
      link: "https://www.facebook.com/raghav.dhingra15",
    },
    {
      name: "Twitter",
      key: "twitter",
      width: width1,
      bigWidth: width3,
      image: TWITTER_IMAGE,
      link: "https://twitter.com/raghavdhingra15",
    },
    {
      name: "Instagram",
      key: "instagram",
      width: width1,
      bigWidth: width3,
      image: INSTAGRAM_IMAGE,
      link: "https://www.instagram.com/raghav.dhingra15/",
    },
    {
      name: "Linkedin",
      key: "linkedin",
      width: width1,
      bigWidth: width3,
      image: LINKEDIN_IMAGE,
      link: "https://www.linkedin.com/in/raghav-dhingra/",
    },
    {
      name: "Codepen",
      key: "codepen",
      width: width1,
      bigWidth: width3,
      image: CODEPEN_IMAGE,
      link: "https://codepen.io/raghav-dhingra",
    },
    {
      name: "G-Mail",
      key: "gmail",
      width: width1,
      bigWidth: width3,
      image: GMAIL_IMAGE,
      link: "mailto:admin@raghavdhingra.com",
    },
    {
      name: "Medium",
      key: "medium",
      width: width1,
      bigWidth: width3,
      image: MEDIUM_IMAGE,
      link: "https://medium.com/@raghav.dhingra15",
    },
    {
      name: "Sponsor",
      key: "sponsor",
      width: width1,
      bigWidth: width3,
      image: SPONSOR_IMAGE,
      link: "https://github.com/sponsors/raghavdhingra",
    },
  ],
  defaultApps: [
    {
      name: "Terminal",
      image: TerminalImage,
      width: width1,
      key: "terminal",
      child: (supplement) => (
        <TerminalWindow
          supplement={supplement}
          // supplement={{ terminalLocation: ["desktop"] }}
        />
      ),
      // footer: nullFunction,
    },
    {
      name: "Browser",
      image: BrowserImage,
      width: width2,
      key: "browser",
      child: (supplement) => <Browser supplement={supplement} />,
    },
    {
      name: "Camera",
      image: CameraImage,
      width: width1,
      key: "camera",
      child: (supplement) => <Camera supplement={supplement} />,
    },
    {
      name: "Settings",
      image: SettingsImage,
      width: width2,
      key: "settings",
      child: (supplement) => <Settings supplement={supplement} />,
    },
  ],
};
