import * as actions from "../actions/types";

const initialState = {
  background: 3,
  fontStyle: 1,
  brightness: 1,
  dropDownOpen: false,
  singleClickIcon: false,
  isFullScreen: false,
  battery: {
    level: 0,
    charging: false,
  },
  isOnline: true,
  networkType: "4g",
  date: new Date(),
  activityDropDown: false,
  powerOff: {
    active: false,
    timer: 0,
  },
};
const localSave = (key, val) => localStorage.setItem(key, JSON.stringify(val));

const desktopReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.TOGGLE_DROP_DOWN: {
      let { dropDownOpen } = payload;
      return { ...state, dropDownOpen };
    }
    case actions.TOGGLE_FULL_SCREEN: {
      return { ...state, isFullScreen: !state.isFullScreen };
    }
    case actions.PREVIOUS_STATE_SET: {
      let previousState = JSON.parse(localStorage.getItem("desktop"));
      if (previousState) return { ...previousState, date: new Date() };
      else return state;
    }
    case actions.SINGLE_CLICK_ICON_CHANGE: {
      let { singleClickIcon } = payload;
      let newState = { ...state, singleClickIcon };
      localSave("desktop", newState);
      return newState;
    }
    case actions.RESET_TO_DEFAULT: {
      return {
        ...state,
        background: 3,
        brightness: 1,
        fontStyle: 1,
        dropDownOpen: false,
        activityDropDown: false,
        singleClickIcon: false,
        isFullScreen: false,
      };
    }
    case actions.BACK_IMAGE_CHANGE: {
      let { background } = payload;
      let newState = { ...state, background };
      localSave("desktop", newState);
      return newState;
    }
    case actions.FONT_STYLE_CHANGE: {
      let { fontStyle } = payload;
      let newState = { ...state, fontStyle };
      localSave("desktop", newState);
      return newState;
    }
    case actions.BRIGHTNESS_CHANGE: {
      let { brightness } = payload;
      let newState = { ...state, brightness };
      localSave("desktop", newState);
      return newState;
    }
    case actions.BATTERY_STATUS: {
      let { battery } = payload;
      return { ...state, battery };
    }
    case actions.ONLINE_STATUS: {
      let { isOnline } = payload;
      return { ...state, isOnline };
    }
    case actions.NETWORK_TYPE: {
      let { networkType } = payload;
      return { ...state, networkType };
    }
    case actions.DATE_STATUS: {
      let { date } = payload;
      return { ...state, date };
    }
    case actions.ACTIVITY_TOGGLE_DROP_DOWN: {
      let { activityDropDown } = payload;
      return { ...state, activityDropDown };
    }
    case actions.POWER_OFF_STATUS: {
      let { powerOff } = payload;
      return { ...state, powerOff };
    }
    default:
      return state;
  }
};

export default desktopReducers;
