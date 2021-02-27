import React from "react";
import { connect } from "react-redux";
import "../../../assets/desktop/startMenu.css";

const StartMenu = () => {
  return (
    <div className={`start-menu-container`}>
      <div>START MENU</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // background: state.desktopReducers.background,
});

export default connect(mapStateToProps)(StartMenu);
