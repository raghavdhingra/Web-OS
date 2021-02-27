import React from "react";

const NavItem = ({ children, clickTask, hightlight }) => {
  return (
    <>
      <div
        className={`left-nav-item centralise ${
          hightlight ? "left-nav-item-active" : ""
        }`}
        onClick={clickTask}
      >
        {children}
      </div>
    </>
  );
};
export default NavItem;
