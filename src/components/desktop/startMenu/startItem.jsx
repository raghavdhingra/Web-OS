import React from 'react';

const StartItem = ({ children, clickTask }) => {
  return (
    <>
      <div className={`start-menu-item centralise`} onClick={clickTask}>
        {children}
      </div>
    </>
  );
};
export default StartItem;
