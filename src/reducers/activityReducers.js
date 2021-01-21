import * as actions from "../actions/types";

const initialState = {
  triggerIndex: -1,
  isTriggered: false,
  activity: [],
};

const activityReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.CREATE_ACTIVITY: {
      let { activity } = payload;
      return { ...state, activity: [...state.activity, activity] };
    }
    case actions.UPDATE_ACTIVITY_TRIGGER: {
      let { activityIndex, isTriggered } = payload;
      return { ...state, triggerIndex: activityIndex, isTriggered };
    }
    case actions.REMOVE_ACTIVITY_TRIGGER: {
      return { ...state, triggerIndex: -1, isTriggered: false };
    }
    case actions.REMOVE_ACTIVITY: {
      let { activityIndex } = payload;
      state.activity.splice(activityIndex, 1);
      return { ...state, activity: [...state.activity] };
    }
    case actions.UPDATE_ZINDEX_ACTIVITY: {
      let { activityIndex } = payload;
      state.activity.forEach((act) => (act.zIndex = 2));
      state.activity[activityIndex] = {
        ...state.activity[activityIndex],
        zIndex: 3,
      };
      return { ...state, activity: [...state.activity] };
    }
    case actions.TOGGLE_LOADING_ACTIVITY: {
      let { activityIndex, isLoading } = payload;
      state.activity[activityIndex] = {
        ...state.activity[activityIndex],
        isLoading,
      };
      return { ...state, activity: [...state.activity] };
    }
    case actions.TOGGLE_ACTIVITY_MAXIMISE: {
      let { activityIndex, isMaximise } = payload;
      state.activity[activityIndex] = {
        ...state.activity[activityIndex],
        isMaximise,
      };
      return { ...state, activity: [...state.activity] };
    }
    case actions.UPDATE_ACTIVITY_POSITION: {
      let { top, left, activityIndex } = payload;
      state.activity[activityIndex] = {
        ...state.activity[activityIndex],
        top,
        left,
      };
      return { ...state, activity: [...state.activity] };
    }
    case actions.UPDATE_ACTIVITY_DIMENSION: {
      let { height, width, activityIndex } = payload;
      state.activity[activityIndex] = {
        ...state.activity[activityIndex],
        height,
        width,
      };
      return { ...state, activity: [...state.activity] };
    }
    default:
      return state;
  }
};

export default activityReducers;
