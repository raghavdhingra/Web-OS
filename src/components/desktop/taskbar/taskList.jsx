import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropDownCaret from "../../../assets/icons/dropdown.svg";
import { removeActivity } from "../../../actions/activityActions";
import { activityDropDownToggle } from "../../../actions/desktopActions";
import DialogBox from "../dialogBox/dialogBox";
import "../../../assets/desktop/taskList.css";

const TaskList = ({
  removeActivity,
  activityList,
  activityDropDown,
  activityDropDownToggle,
}) => {
  const [activityName, setActivityName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const showDialog = (name, isOpen) => {
    setActivityName(name);
    setDialogOpen(isOpen);
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let indexTrue = activityList.findIndex((e) => e.isLoading === true);
    if (indexTrue !== -1) setIsLoading(true);
    else setIsLoading(false);
  }, [activityList]);
  const toggleActivity = () => {
    let activityIndex = activityList.findIndex(
      (activity) => activity && activity.name === activityName
    );
    removeActivity(activityIndex);
    setDialogOpen(false);
  };

  return (
    <>
      <DialogBox
        onSuccess={toggleActivity}
        onCancel={() => showDialog("", false)}
        isOpen={dialogOpen}
        successText={"End Task"}
        heading={activityName}
        body={"Are you sure, you want to end the task?"}
      />
      <div className="task-list-container">
        <div className="heading centralise">Tasks</div>
        <div
          className={`task-listing-activity cursor-pointer ${
            activityDropDown ? "task-listing-activity-active" : ""
          }`}
          onClick={() => activityDropDownToggle(!activityDropDown)}
        >
          {isLoading && (
            <div className="centralise">
              <svg height="16px" width="16px" className="loader-rotate">
                <circle className="loader-sm-2" />
              </svg>
            </div>
          )}
          <div className="activity-list-nav-grid">
            <div className="centralise">Activity List</div>
            <div className="centralise">
              <div className="down-caret-arrow-translate">▾</div>
            </div>
          </div>
        </div>
        {activityDropDown && (
          <>
            <div className="drop-down-container activity-list-container">
              <div className="drop-drop-caret-pointed-container flex-end">
                <div></div>
                <img
                  src={DropDownCaret}
                  className="drop-drop-caret-pointed"
                  width="13px"
                  alt="drop down"
                />
              </div>
              <div className="drop-down-inner-container activity-inner-container">
                {activityList.length ? (
                  activityList.map(
                    (activity, index) =>
                      activity && (
                        <div
                          className="drop-down-items"
                          key={`activity-${index}`}
                        >
                          <div className="task-list-inner-grid">
                            {activity.isLoading ? (
                              <svg
                                height="20px"
                                width="20px"
                                className="loader-rotate"
                              >
                                <circle className="loader-sm" />
                              </svg>
                            ) : (
                              <span></span>
                            )}
                            <div className="centralise">{activity.name}</div>
                            <div className="centralise">
                              <div
                                className="centralise activity-close-btn"
                                onClick={() => showDialog(activity.name, true)}
                              >
                                &times;
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div className="drop-down-items">No Activity</div>
                )}
              </div>
            </div>
          </>
        )}
        {/* {activityList && 
          activityList.map((activity, index) =>
            activity && activity.isLoading ? (
              <div
                className="task-listing-activity centralise"
                title={activity.name}
                key={`activity-${index}`}
              >
                <div className="task-list-inner-grid">
                  <svg height="20px" width="20px" className="loader-rotate">
                    <circle className="loader-sm" />
                  </svg>
                  <div className="centralise">{activity.name} &nbsp;</div>
                  <div
                    className="centralise cursor-pointer"
                    onClick={() => showDialog(activity.name, true)}
                  >
                    &times;
                  </div>
                </div>
              </div>
            ) : null
          )} */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  activityList: state.activityReducers.activity,
  activityDropDown: state.desktopReducers.activityDropDown,
});

export default connect(mapStateToProps, {
  removeActivity,
  activityDropDownToggle,
})(TaskList);
