import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import '../../../assets/desktop/startMenu.css';
import SEARCH_ICON from '../../../assets/icons/search.svg';

const StartMenu = () => {
  const searchRef = useRef(null);
  const focusOnField = () => {
    searchRef.current.focus();
  };
  useEffect(() => {
    focusOnField();
  });
  return (
    <div className="start-menu-container">
      <div className="container-center">
        <div className="search-field-container">
          <div className="search-field-grid">
            <div className="centralise search-bar-icon-container">
              <img
                src={SEARCH_ICON}
                alt="search"
                width="15px"
                onClick={focusOnField}
                className="search-bar-icon"
              />
            </div>
            <input
              type="text"
              className="search-field"
              placeholder="Type to search"
              ref={searchRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // background: state.desktopReducers.background,
});

export default connect(mapStateToProps)(StartMenu);
