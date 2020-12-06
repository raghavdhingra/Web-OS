import * as actions from "./types";

export const makeDirectoryAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.MAKE_DIRECTORY_IN_SYSTEM,
      payload,
    });
  } catch (err) {
    console.log(err);
  }
};
