import { defaultApps } from "./defaultApps";
import * as actions from "./types";

export const createActivity = (payload) => async (dispatch) => {
  try {
    let { name } = payload;
    let app = defaultApps.find((app) => app.key === name);
    dispatch({
      type: actions.CREATE_ACTIVITY,
      payload: {
        activity: {
          name: app.name,
          isLoading: false,
          date: new Date(),
          isExplorerOpened: false,
          isMaximise: false,
          child: app.child,
          footer: app.footer,
          image: app.image,
          zIndex: 2,
          top: "34px",
          left: "60px",
          height: "500px",
          width: "750px",
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
