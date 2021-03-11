import React from "react";
import { connect } from "react-redux";
import {
  changeSingleClickIcon,
  toggleFullScreen,
} from "../../../../actions/desktopActions";
import ToggleButton from "../../../common/ToggleButton";

const Personalise = ({
  singleClickIcon,
  changeSingleClickIcon,
  isFullScreen,
  toggleFullScreen,
}) => {
  return (
    <>
      <div className="personalise-2-grid">
        <div className="personalise-text centralise">
          Desktop icons open on single click
        </div>
        <ToggleButton
          toggleAction={() => changeSingleClickIcon(!singleClickIcon)}
          toggleOn={singleClickIcon}
        />
      </div>
      <div className="personalise-2-grid">
        <div className="personalise-text centralise">Full Screen mode</div>
        <ToggleButton
          toggleAction={() => toggleFullScreen()}
          toggleOn={isFullScreen}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  singleClickIcon: state.desktopReducers.singleClickIcon,
  isFullScreen: state.desktopReducers.isFullScreen,
});
export default connect(mapStateToProps, {
  changeSingleClickIcon,
  toggleFullScreen,
})(Personalise);
