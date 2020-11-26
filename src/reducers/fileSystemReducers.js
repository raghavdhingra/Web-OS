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
  const { type, payload } = actions;
  switch (type) {
    case actions: {
      const { something } = payload;
      console.log(something);
      return state;
    }
    default:
      return state;
  }
};

export default fileSystemReducers;
