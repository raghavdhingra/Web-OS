import React, { useMemo } from "react";
import { connect } from "react-redux";
import { changeBackImage } from "../../../../actions/desktopActions";
import Back1 from "../../../../assets/background/wall-1.svg";
import Back2 from "../../../../assets/background/wall-2.svg";
import Back3 from "../../../../assets/background/wall-3.svg";
import Back4 from "../../../../assets/background/wall-4.svg";
import Back5 from "../../../../assets/background/wall-5.svg";
import Back6 from "../../../../assets/background/wall-6.svg";

const ThemeChanger = ({ background, changeBackImage }) => {
  const themeArray = useMemo(
    () => [
      { name: "Eternal", img: Back1, cover: true },
      { name: "Temporal", img: Back2, cover: true },
      { name: "Speck", img: Back3, cover: false },
      { name: "Chime", img: Back4, cover: true },
      { name: "Karma", img: Back5, cover: true },
      { name: "Plates", img: Back6, cover: false },
    ],
    []
  );
  return (
    <>
      <div className="theme-change-container">
        {themeArray.map((theme, index) => (
          <div
            className={`theme-change-division ${
              background - 1 === index ? "theme-change-division-active" : ""
            }`}
            key={`theme-${index}`}
            onClick={() => changeBackImage(index + 1)}
          >
            <div
              className={`theme-change-background ${
                theme.cover ? "image-cover" : ""
              }`}
              style={{
                backgroundImage: `url(${theme.img})`,
              }}
            ></div>
            <div className="theme-change-name">{theme.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  background: state.desktopReducers.background,
});
export default connect(mapStateToProps, { changeBackImage })(ThemeChanger);
