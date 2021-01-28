import React, { useEffect, useRef } from "react";

const ContextMenu = ({ isOpen, top, left, close, height, contextArray }) => {
  const contextMenuRef = useRef(null);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      try {
        if (!contextMenuRef.current.contains(e.target)) close();
      } catch (err) {
        return null;
      }
    });
  }, [close]);
  const contextTaskPerform = (task) => {
    close();
  };
  if (isOpen)
    return (
      <>
        <div
          ref={contextMenuRef}
          className="context-menu-container"
          style={{ top: `${top}px`, left: `${left}px`, height: `${height}px` }}
        >
          {contextArray && contextArray.length
            ? contextArray.map((context, index) => (
                <div
                  className="context-menu-content"
                  key={`context-${index}`}
                  onClick={() => contextTaskPerform(context)}
                >
                  {context.className}
                </div>
              ))
            : null}
        </div>
      </>
    );
  else return null;
};

export default ContextMenu;
