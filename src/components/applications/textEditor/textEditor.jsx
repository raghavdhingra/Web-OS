import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { changeTextInFile } from "../../../actions/fileSystemActions";

const TextEditor = ({ system, fileSystem, changeTextInFile }) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => textAreaRef.current.focus(), []);
  useEffect(() => {
    let curDir = fileSystem.fileSystem;
    system.location.forEach(
      (path) => (curDir = curDir.find((system) => system.name === path).child)
    );
    let changedFile = curDir.find((sys) => system.name === sys.name);
    setText(changedFile.child);
  }, [fileSystem, system]);
  const changeText = (e) =>
    changeTextInFile({
      pathArray: system.location,
      name: system.name,
      child: e.target.value,
    });

  return (
    <>
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={changeText}
        className="text-area-editor"
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  fileSystem: state.fileSystemReducers,
});
export default connect(mapStateToProps, { changeTextInFile })(TextEditor);
