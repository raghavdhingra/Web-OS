import React from "react";
import TerminalImage from "../assets/icons/terminal.png";
import CameraImage from "../assets/icons/camera.png";
import BrowserImage from "../assets/icons/browser.svg";
import SettingsImage from "../assets/icons/setting.svg";
import TerminalWindow from "../components/files/Terminal/terminal";
import Camera from "../components/files/camera/camera";

export const defaultApps = [
  {
    name: "Terminal",
    image: TerminalImage,
    width: "40px",
    key: "terminal",
    child: (supplement) => <TerminalWindow supplement={supplement} />,
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
    child: (supplement) => <Camera supplement={supplement} />,
  },
  {
    name: "Settings",
    image: SettingsImage,
    width: "50px",
    key: "settings",
    child: null,
  },
];
