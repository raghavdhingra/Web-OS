import React from "react";
import TerminalImage from "../assets/icons/terminal.png";
import CameraImage from "../assets/icons/camera.png";
import BrowserImage from "../assets/icons/browser.svg";
import SettingsImage from "../assets/icons/setting.svg";
import TerminalWindow from "../components/files/Terminal/terminal";

export const defaultApps = [
  {
    name: "Terminal",
    image: TerminalImage,
    width: "40px",
    key: "terminal",
    child: <TerminalWindow />,
    footer: null,
  },
  {
    name: "Browser",
    image: BrowserImage,
    width: "50px",
    key: "browser",
    child: null,
  },
  {
    name: "Camera",
    image: CameraImage,
    width: "40px",
    key: "camera",
    child: null,
  },
  {
    name: "Settings",
    image: SettingsImage,
    width: "50px",
    key: "settings",
    child: null,
  },
];
