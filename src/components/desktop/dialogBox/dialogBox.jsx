import React from "react";
import "../../../assets/desktop/dialogBox.css";

const DialogBox = ({
  onSuccess,
  onCancel,
  heading,
  body,
  isOpen,
  successText,
}) => {
  if (isOpen)
    return (
      <>
        <div className="dialog-overlay" onClick={onCancel}></div>
        <div className="dialog-container">
          <div className="dialog-header">
            {heading ? heading : "Confirmation"}
          </div>
          <div className="dialog-body">{body ? body : "Are You Sure?"}</div>
          <div className="dialog-footer">
            <div className="dialog-footer-btn" onClick={onCancel}>
              Cancel
            </div>
            <div className="dialog-footer-btn" onClick={onSuccess}>
              {successText ? successText : "Proceed"}
            </div>
          </div>
        </div>
      </>
    );
  else return null;
};

export default DialogBox;
