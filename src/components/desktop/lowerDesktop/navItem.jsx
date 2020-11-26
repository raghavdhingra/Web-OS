import React from "react";

const NavItem = ({ children, clickTask }) => {
  return (
    <>
      <div className="left-nav-item centralise" onClick={clickTask}>
        {children}
      </div>
    </>
  );
};
export default NavItem;
