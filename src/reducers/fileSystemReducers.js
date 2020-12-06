import * as actions from "../actions/types";

const initialState = [
  {
    name: "desktop",
    type: "folder",
    child: [{ name: "profile", type: "folder", child: [] }],
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
    case actions.REMOVE_DIRECTORY_IN_SYSTEM: {
      const { pathArray, folderName } = payload;
      let curDir = state;
      pathArray.forEach(
        (path) => (curDir = curDir.find((system) => system.name === path).child)
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
