import * as actions from "./types";

export const changeBackImage = (payload) => async (dispatch) => {
  try {
    await dispatch({
      type: actions.BACK_IMAGE_CHANGE,
      payload: {
        background: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const changeSingleClickIcon = (payload) => async (dispatch) => {
  try {
    await dispatch({
      type: actions.SINGLE_CLICK_ICON_CHANGE,
      payload: {
        singleClickIcon: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const changeFontStyle = (payload) => async (dispatch) => {
  try {
    await dispatch({
      type: actions.FONT_STYLE_CHANGE,
      payload: {
        fontStyle: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const toggleFullScreen = () => async (dispatch) => {
  try {
    await dispatch({ type: actions.TOGGLE_FULL_SCREEN });
  } catch (err) {
    console.log(err);
  }
};
export const resetToDefault = () => async (dispatch) => {
  try {
    localStorage.clear();
    await dispatch({ type: actions.RESET_TO_DEFAULT });
  } catch (err) {
    console.log(err);
  }
};
export const changeBrightness = (payload) => async (dispatch) => {
  try {
    await dispatch({
      type: actions.BRIGHTNESS_CHANGE,
      payload: {
        brightness: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const dropDownToggle = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.TOGGLE_DROP_DOWN,
      payload: {
        dropDownOpen: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const activityDropDownToggle = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.ACTIVITY_TOGGLE_DROP_DOWN,
      payload: {
        activityDropDown: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const batteryStatus = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.BATTERY_STATUS,
      payload: {
        battery: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const onlineStatus = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.ONLINE_STATUS,
      payload: {
        isOnline: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const networkType = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.NETWORK_TYPE,
      payload: {
        networkType: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const dateStatus = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.DATE_STATUS,
      payload: {
        date: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const powerOffStatus = (payload) => async (dispatch) => {
  try {
    const { active, timer } = payload;
    dispatch({
      type: actions.POWER_OFF_STATUS,
      payload: {
        powerOff: {
          active,
          timer,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
