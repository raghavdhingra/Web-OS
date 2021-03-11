import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { applications } from '../../../actions/defaultApps';
import { createActivity } from '../../../actions/createActivityAction';
import SEARCH_ICON from '../../../assets/icons/search.svg';
import StartItem from './startItem';
import { changeStartMenu } from '../../../actions/desktopActions';
import '../../../assets/desktop/startMenu.css';

const StartMenu = ({ createActivity, changeStartMenu }) => {
  const searchRef = useRef(null);
  const [searchString, setSearchString] = useState('');
  const [applicationArray, setApplicationArray] = useState([]);
  const [startSection, setStartSection] = useState('application');

  const focusOnField = () => {
    searchRef.current.focus();
  };
  useEffect(() => {
    if (startSection === 'application') {
      if (searchString) {
        let searchedApps = applications.allApplications.map((app) => {
          let searchRegexKey = new RegExp(searchString.trim(), 'ig');
          if (searchRegexKey.test(app.key)) return app;
          else return null;
        });
        setApplicationArray([...searchedApps]);
      } else setApplicationArray([...applications.allApplications]);
    } else if (startSection === 'social') {
      if (searchString) {
        let searchedApps = applications.socialApps.map((app) => {
          let searchRegexKey = new RegExp(searchString.trim(), 'ig');
          if (searchRegexKey.test(app.key)) return app;
          else return null;
        });
        setApplicationArray([...searchedApps]);
      } else setApplicationArray([...applications.socialApps]);
    } else return null;
  }, [searchString, startSection]);
  useEffect(() => {
    focusOnField();
    setApplicationArray([...applications.allApplications]);
  }, []);
  const startItemClick = (app) => {
    if (startSection === 'application') {
      createActivity({ name: app.key });
      changeStartMenu(false);
    } else if (startSection === 'social') {
      window.open(app.link);
    } else {
      return null;
    }
  };
  return (
    <div className="start-menu-container">
      <div className="container-center">
        <div className="start-menu-container-grid">
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
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
            </div>
          </div>
          <div className="start-application-container">
            {applicationArray && applicationArray.length ? (
              applicationArray.map(
                (app, index) =>
                  app && (
                    <StartItem
                      key={`nav-list-${index}`}
                      clickTask={() => startItemClick(app)}
                    >
                      <img
                        src={app.image}
                        className="nav-item-image"
                        width={app.bigWidth}
                        alt={app.name}
                      />
                      <div>{app.name}</div>
                    </StartItem>
                  )
              )
            ) : (
              <div>No Application Found</div>
            )}
          </div>
          <div className="start-menu-footer-grid">
            <div
              className={`start-menu-footer-item ${
                startSection === 'application'
                  ? 'start-menu-footer-item-active'
                  : ''
              }`}
              onClick={() => setStartSection('application')}
            >
              Applications
            </div>
            <div
              className={`start-menu-footer-item
            ${startSection === 'social' ? 'start-menu-footer-item-active' : ''}
            `}
              onClick={() => setStartSection('social')}
            >
              Social
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // background: state.desktopReducers.background,
});

export default connect(mapStateToProps, { createActivity, changeStartMenu })(
  StartMenu
);
