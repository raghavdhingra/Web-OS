import * as actions from "./types";

export const removeActivity = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.REMOVE_ACTIVITY,
      payload: {
        activityIndex: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const toggleActivityMaximise = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.TOGGLE_ACTIVITY_MAXIMISE,
      payload,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateZIndexActivity = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.UPDATE_ZINDEX_ACTIVITY,
      payload: {
        activityIndex: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const toggleActivityLoading = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.TOGGLE_LOADING_ACTIVITY,
      payload,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updatePositionActivity = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.UPDATE_ACTIVITY_POSITION,
      payload,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateDimensionActivity = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.UPDATE_ACTIVITY_DIMENSION,
      payload,
    });
  } catch (err) {
    console.log(err);
  }
};
