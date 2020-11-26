import * as actions from "../actions/types";

const initialState = {
  background: 3,
  brightness: 1,
  dropDownOpen: false,
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

const desktopReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.TOGGLE_DROP_DOWN: {
      let { dropDownOpen } = payload;
      return { ...state, dropDownOpen };
    }
    case actions.BACK_IMAGE_CHANGE: {
      let { background } = payload;
      return { ...state, background };
    }
    case actions.BRIGHTNESS_CHANGE: {
      let { brightness } = payload;
      return { ...state, brightness };
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
