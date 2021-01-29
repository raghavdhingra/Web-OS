import { defaultApps } from "./defaultApps";
import * as actions from "./types";

export const createActivity = (payload) => async (dispatch) => {
  try {
    let { name, newApp } = payload;
    let app;
    if (newApp) {
      let { image, footer, child } = payload;
      app = {
        name,
        image,
        width: "40px",
        key: name,
        child,
        footer,
      };
    } else {
      app = defaultApps.find((app) => app.key === name);
    }
    await dispatch({
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
          zIndex: 4,
          top: "34px",
          left: "60px",
          height: "500px",
          width: "750px",
          triggeredFunction: false,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
