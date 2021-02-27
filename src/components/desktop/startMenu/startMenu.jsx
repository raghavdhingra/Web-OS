import React from "react";
import { connect } from "react-redux";
import "../../../assets/desktop/startMenu.css";

const StartMenu = () => {
  return (
    <div className="start-menu-container">
      <div className="container-center">
        <div className="search-field-container">
          <input
            type="text"
            className="search-field"
            placeholder="Type to search"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // background: state.desktopReducers.background,
});

export default connect(mapStateToProps)(StartMenu);
