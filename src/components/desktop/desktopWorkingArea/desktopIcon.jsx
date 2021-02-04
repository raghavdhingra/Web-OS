import React from "react";
import { connect } from "react-redux";
import "../../../assets/desktop/desktopIcon.css";

const DesktopIcon = ({ name, icon, width, clickTask, singleClickIcon }) => {
  return (
    <div
      className="desktop-icon-container"
      onClick={singleClickIcon ? clickTask : () => null}
      onDoubleClick={!singleClickIcon ? clickTask : () => null}
    >
      <div className="desktop-icon">
        <img src={icon} width={width} alt={name} style={{ margin: "0 auto" }} />
        <div className="desktop-icon-text">{name}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  singleClickIcon: state.desktopReducers.singleClickIcon,
});
export default connect(mapStateToProps)(DesktopIcon);
