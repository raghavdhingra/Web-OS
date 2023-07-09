import * as actions from "../actions/types";
import PROFILE_IMAGE from "../assets/icons/profile.svg";
import PROJECT_IMAGE from "../assets/icons/project.svg";
import ARCHIVE_IMAGE from "../assets/icons/archive.svg";
import USER_IMAGE from "../assets/icons/user.png";

const initialState = {
  fileSystem: [
    {
      name: "desktop",
      type: "folder",
      location: [],
      child: [
        {
          name: "Portfolio",
          type: "file",
          icon: USER_IMAGE,
          link: "https://portfolio.raghavdhingra.com",
          inPage: true,
          location: ["desktop"],
        },
        {
          name: "Resume",
          type: "file",
          icon: PROFILE_IMAGE,
          link: "https://portfolio.raghavdhingra.com/static/assets/resume.pdf",
          inPage: true,
          location: ["desktop"],
        },
        {
          name: "Projects",
          type: "file",
          icon: PROJECT_IMAGE,
          link: "https://portfolio.raghavdhingra.com/projects",
          inPage: true,
          location: ["desktop"],
        },
        {
          name: "Archive",
          type: "file",
          icon: ARCHIVE_IMAGE,
          link: "https://archive.raghavdhingra.com",
          inPage: false,
          location: ["desktop"],
        },
        { name: "Docs", type: "file", child: "", location: ["desktop"] },
        // GitHub Sponsor (on desktop, and in navigation bar)
        // Social link on desktop
        // Fork the repo
      ],
    },
    {
      name: "raghavdhingra",
      type: "folder",
      child: [],
      location: [],
    },
    {
      name: "public",
      type: "folder",
      child: [],
      location: [],
    },
  ],
};
const localSave = (key, val) => localStorage.setItem(key, JSON.stringify(val));

const fileSystemReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.CHANGE_TEXT_IN_FILE: {
      const { pathArray, name, child } = payload;
      let curDir = state.fileSystem;
      pathArray.forEach(
        (path) => (curDir = curDir.find((system) => system.name === path).child)
      );
      let changedFile = curDir.find((system) => system.name === name);
      changedFile.child = child;
      localSave("fileSystem", { ...state });
      return { ...state };
    }
    case actions.MAKE_DIRECTORY_IN_SYSTEM: {
      const { pathArray, folderName } = payload;
      let curDir = state.fileSystem;
      pathArray.forEach(
        (path) => (curDir = curDir.find((system) => system.name === path).child)
      );
      let newFolder = {
        name: folderName,
        type: "folder",
        child: [],
        location: pathArray,
      };
      curDir.push(newFolder);
      localSave("fileSystem", { ...state });
      return { ...state };
    }
    case actions.MAKE_FILE_IN_SYSTEM: {
      const { pathArray, fileName } = payload;
      let curDir = state.fileSystem;
      pathArray.forEach(
        (path) => (curDir = curDir.find((system) => system.name === path).child)
      );
      let newFile = {
        name: fileName,
        type: "file",
        location: pathArray,
        child: "",
      };
      curDir.push(newFile);
      localSave("fileSystem", { ...state });
      return { ...state };
    }
    case actions.REMOVE_DIRECTORY_IN_SYSTEM: {
      const { pathArray, folderName } = payload;
      let newDirectory = [...state.fileSystem];
      let curDir = newDirectory;
      pathArray.forEach((path) => {
        curDir = curDir = curDir.find((system) => system.name === path).child;
      });
      let index = curDir.findIndex((dir) => dir.name === folderName);

      if (index === -1) return { ...state };
      curDir.splice(index, 1);
      localSave("fileSystem", { ...state, fileSystem: [...newDirectory] });
      return { ...state, fileSystem: [...newDirectory] };
    }
    case actions.PREVIOUS_STATE_SET: {
      let previousState = JSON.parse(localStorage.getItem("fileSystem"));
      if (previousState) return { ...previousState };
      else return state;
    }
    default:
      return state;
  }
};

export default fileSystemReducers;
