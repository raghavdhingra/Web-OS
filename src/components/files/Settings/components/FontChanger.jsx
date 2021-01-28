import React, { useMemo } from "react";
import { connect } from "react-redux";
import { changeFontStyle } from "../../../../actions/desktopActions";

const FontChanger = ({ changeFontStyle, font }) => {
  const fontStyleArray = useMemo(
    () => [
      { name: "Roboto", className: "font-roboto" },
      { name: "Potta One", className: "font-potta" },
      { name: "Raleway", className: "font-raleway" },
      { name: "Lobster", className: "font-lobster" },
    ],
    []
  );
  return (
    <>
      <div className="theme-change-container">
        {fontStyleArray.map((fontStyle, index) => (
          <div
            className={`theme-change-division ${
              font - 1 === index ? "theme-change-division-active" : ""
            } ${fontStyle.className}`}
            key={`theme-${index}`}
            onClick={() => changeFontStyle(index + 1)}
          >
            <div className="theme-change-background centralise">Aa</div>
            <div className="theme-change-name">{fontStyle.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  font: state.desktopReducers.fontStyle,
});
export default connect(mapStateToProps, { changeFontStyle })(FontChanger);
