import * as actions from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.CREATE_ACTIVITY: {
      let { activity } = payload;
      return [...state, activity];
    }
    case actions.REMOVE_ACTIVITY: {
      let { activityIndex } = payload;
      state.splice(activityIndex, 1);
      return [...state];
    }
    case actions.UPDATE_ZINDEX_ACTIVITY: {
      let { activityIndex } = payload;
      state.forEach((act) => (act.zIndex = 2));
      state[activityIndex] = { ...state[activityIndex], zIndex: 3 };
      return [...state];
    }
    case actions.TOGGLE_LOADING_ACTIVITY: {
      let { activityIndex, isLoading } = payload;
      state[activityIndex] = { ...state[activityIndex], isLoading };
      return [...state];
    }
    case actions.TOGGLE_ACTIVITY_MAXIMISE: {
      let { activityIndex, isMaximise } = payload;
      state[activityIndex] = { ...state[activityIndex], isMaximise };
      return [...state];
    }
    case actions.UPDATE_ACTIVITY_POSITION: {
      let { top, left, activityIndex } = payload;
      state[activityIndex] = { ...state[activityIndex], top, left };
      return [...state];
    }
    case actions.UPDATE_ACTIVITY_DIMENSION: {
      let { height, width, activityIndex } = payload;
      state[activityIndex] = { ...state[activityIndex], height, width };
      return [...state];
    }
    default:
      return state;
  }
}
