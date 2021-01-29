import * as actions from "../actions/types";
import PROFILE_IMAGE from "../assets/icons/profile.svg";
import PROJECT_IMAGE from "../assets/icons/project.svg";
import ARCHIVE_IMAGE from "../assets/icons/archive.svg";

const initialState = [
  {
    name: "desktop",
    type: "folder",
    child: [
      {
        name: "Portfolio",
        type: "file",
        icon: PROFILE_IMAGE,
        link: "https://portfolio.raghavdhingra.com",
        inPage: true,
      },
      {
        name: "Projects",
        type: "file",
        icon: PROJECT_IMAGE,
        link: "https://portfolio.raghavdhingra.com/projects",
        inPage: true,
      },
      {
        name: "Archive",
        type: "file",
        icon: ARCHIVE_IMAGE,
        link: "https://archive.raghavdhingra.com",
        inPage: false,
      },
      { name: "Extra", type: "file", child: "Text Editor" },
    ],
  },
  {
    name: "raghavdhingra",
    type: "folder",
    child: [],
  },
  {
    name: "public",
    type: "folder",
    child: [],
  },
];

const fileSystemReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.MAKE_DIRECTORY_IN_SYSTEM: {
      const { pathArray, folderName } = payload;
      let curDir = state;
      pathArray.forEach(
        (path) => (curDir = curDir.find((system) => system.name === path).child)
      );
      let newFolder = { name: folderName, type: "folder", child: [] };
      curDir.push(newFolder);
      return [...state];
    }
    case actions.MAKE_FILE_IN_SYSTEM: {
      const { pathArray, fileName } = payload;
      let curDir = state;
      pathArray.forEach(
        (path) => (curDir = curDir.find((system) => system.name === path).child)
      );
      let newFile = { name: fileName, type: "file" };
      curDir.push(newFile);
      return [...state];
    }
    case actions.REMOVE_DIRECTORY_IN_SYSTEM: {
      const { pathArray, folderName } = payload;
      let curDir = { child: [...state] };
      pathArray.forEach(
        (path) => (curDir = curDir.child.find((system) => system.name === path))
      );
      let index = curDir.indexOf(
        (dir) => dir.name === folderName && dir.type === "folder"
      );
      curDir.splice(index, 1);
      return [...state];
    }
    default:
      return state;
  }
};

export default fileSystemReducers;
