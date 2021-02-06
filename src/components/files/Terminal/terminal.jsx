import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { removeActivity } from "../../../actions/activityActions";
import { resetToDefault } from "../../../actions/desktopActions";
import {
  makeDirectoryAction,
  removeDirectoryAction,
} from "../../../actions/fileSystemActions";
import "../../../assets/files/terminal.css";

const OutputDivision = ({ inputPath, command, error, success, startState }) => {
  if (startState)
    return (
      <>
        <div className="terminal-main-content terminal-blue">
          Welcome to Web OS
        </div>
        <div className="terminal-output">Type "help" for all the commands</div>
      </>
    );

  return (
    <div className="terminal-main-content">
      <span className="terminal-green">raghavdhingra@web-os: </span>
      <span className="terminal-blue">{inputPath}$ </span>
      <span className="terminal-text-editor">{command}</span>
      {error && <div className="terminal-output terminal-red">{error}</div>}
      {success && <div className="terminal-output">{success}</div>}
    </div>
  );
};

const TerminalWindow = ({
  fileSystem,
  activityList,
  removeActivity,
  makeDirectoryAction,
  removeDirectoryAction,
  resetToDefault,
  supplement: { terminalLocation },
}) => {
  const printOutput = ({ inputPath, command, error, success, startState }) => {
    let outputCommand = (
      <OutputDivision
        inputPath={inputPath}
        command={command}
        success={success}
        error={error}
        startState={startState}
      />
    );
    setCommandOutput([...commandOutput, outputCommand]);
  };
  const [inputPath, setInputPath] = useState("/");
  const [historyCommands, setHistoryCommand] = useState(["help"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [commandOutput, setCommandOutput] = useState([
    <OutputDivision startState={true} />,
  ]);
  const TextRef = useRef(null);

  const emptyTextRef = () => {
    setTimeout(() => {
      if (TextRef.current) TextRef.current.innerText = "";
    }, 10);
  };

  const clearScreen = () =>
    setCommandOutput([<OutputDivision startState={true} />]);

  const echoOnScreen = ({ command, tokens, isSudo }) => {
    if (isSudo) tokens.shift();
    tokens.shift();
    return printOutput({ inputPath, command, success: tokens.join(" ") });
  };
  const setInputPathConditionally = (pathArr) => {
    pathArr = pathArr.filter((system) => !!system);
    if (pathArr.length) setInputPath(`/${pathArr.join("/")}/`);
    else setInputPath("/");
  };
  const changeDirectory = ({ command, tokens, isSudo }) => {
    if (isSudo) tokens.shift();
    try {
      if (tokens.length > 2) {
        return printOutput({
          inputPath,
          command,
          error: `"cd" command can't have more than 1 parameter`,
        });
      } else {
        if (tokens[1] === "/") {
          setInputPath("/");
          return printOutput({ inputPath, command });
        }
        let fullPath = inputPath.split("/").filter((path) => !!path);
        let givenDirList = tokens[1].split("/").filter((path) => !!path);
        for (let i in givenDirList) {
          if (givenDirList[i] === ".") break;
          else if (givenDirList[i] === "..") {
            if (fullPath.length) fullPath.pop();
            else
              return printOutput({
                inputPath,
                command,
                error: "Already on the base directory",
              });
          } else fullPath.push(givenDirList[i]);
        }
        let curDir = fileSystem;
        for (let j in fullPath) {
          try {
            curDir = curDir.find(
              (dir) => dir.name === fullPath[j] && dir.type === "folder"
            );
            curDir = curDir.child;
          } catch (err) {
            return printOutput({
              inputPath,
              command,
              error: "No such directory exists",
            });
          }
        }
        setInputPathConditionally(fullPath);
        return printOutput({ inputPath, command });
      }
    } catch (err) {
      printOutput({ inputPath, command, error: "Please specify a folder" });
    }
  };
  const exitTerminal = ({ command, tokens }) => {
    if (tokens.length > 1) {
      return printOutput({
        inputPath,
        command,
        error: `"exit" command can't have more than 1 parameter`,
      });
    }
    let activityIndex = activityList.findIndex(
      (activity) => activity.name === "Terminal"
    );
    removeActivity(activityIndex);
  };
  const HelpTerminal = ({ command }) => {
    let childParameter = (
      <div className="terminal-help-grid">
        {commandList.map((com, index) => (
          <React.Fragment key={`command-list-${index}`}>
            <div>{com.invoke}</div>
            <div>-</div>
            <div>{com.description}</div>
          </React.Fragment>
        ))}
      </div>
    );
    return printOutput({ inputPath, command, success: childParameter });
  };
  const listInDirectory = ({ command }) => {
    let pathArray = inputPath.split("/").filter((paths) => !!paths);
    let childParameter;
    try {
      let currentDir = fileSystem;
      pathArray.forEach(
        (path) =>
          (currentDir = currentDir.find((system) => system.name === path).child)
      );
      childParameter = (
        <div className="terminal-file-system-grid">
          {currentDir.map((system, index) => (
            <React.Fragment key={`file-system-${index}`}>
              <div className={system.type === "folder" ? "terminal-blue" : ""}>
                {system.name}
              </div>
            </React.Fragment>
          ))}
        </div>
      );
      return printOutput({ inputPath, command, success: childParameter });
    } catch (err) {
      return printOutput({
        inputPath,
        command,
        error: "No such directory exists",
      });
    }
  };
  const pwdCommand = ({ command }) =>
    printOutput({ inputPath, command, success: inputPath });

  const makeDirectory = ({ command, tokens, isSudo }) => {
    if (isSudo) tokens.shift();
    if (tokens.length > 2)
      return printOutput({
        inputPath,
        command,
        error: "Folder name should not have space between them",
      });
    else if (tokens.length === 1)
      return printOutput({
        inputPath,
        command,
        error: "Please specify a folder name",
      });
    else {
      let pathArr = inputPath.split("/").filter((path) => !!path);
      let curDir = fileSystem;
      pathArr.forEach(
        (path) => (curDir = curDir.find((system) => system.name === path).child)
      );
      let newFolderName = tokens[1];
      let index = curDir.filter(
        (system) => system.type === "folder" && system.name === newFolderName
      );
      if (index.length > 0)
        return printOutput({
          inputPath,
          command,
          error: "Folder with same name exist",
        });
      makeDirectoryAction({ pathArray: pathArr, folderName: newFolderName });
      printOutput({ inputPath, command });
    }
  };
  const removeDirectory = ({ command, tokens, isSudo }) => {
    if (isSudo) tokens.shift();
    if (tokens.length > 2)
      return printOutput({
        inputPath,
        command,
        error: "Folder name should not have space between them",
      });
    else if (tokens.length === 1)
      return printOutput({
        inputPath,
        command,
        error: "Please specify a folder name",
      });
    else {
      let pathArr = inputPath.split("/").filter((path) => !!path);
      let curDir = fileSystem;
      pathArr.forEach(
        (path) => (curDir = curDir.find((system) => system.name === path).child)
      );
      let newFolderName = tokens[1];
      let index = curDir.filter(
        (system) => system.type === "folder" && system.name === newFolderName
      );
      if (index.length === 0)
        return printOutput({
          inputPath,
          command,
          error: "Folder with the given name does not exist",
        });
      removeDirectoryAction({ pathArray: pathArr, folderName: newFolderName });
      printOutput({ inputPath, command });
    }
  };
  const resetCommand = ({ inputPath, command }) => {
    printOutput({
      inputPath,
      command,
      success: "System settings and file system have been reset",
    });
    resetToDefault();
  };

  const commandList = [
    {
      invoke: "help",
      onActive: HelpTerminal,
      description:
        "Return the list of commands that you can run on terminal | No parameter",
    },
    {
      invoke: "ls",
      onActive: listInDirectory,
      description:
        "Return the list of all files and folder in current or specified directory | One parameter (optional)",
    },
    {
      invoke: "clear",
      onActive: clearScreen,
      description: "Clears the terminal | No parameters",
    },
    {
      invoke: "echo",
      onActive: echoOnScreen,
      description: "Prints the word or the line on the terminal",
    },
    {
      invoke: "cd",
      onActive: changeDirectory,
      description:
        "Change the directory of the terminal | One parameter (required)",
    },
    {
      invoke: "mkdir",
      onActive: makeDirectory,
      description:
        "Make a directory within current folder | One parameter (required)",
    },
    {
      invoke: "rm",
      onActive: removeDirectory,
      description:
        "Remove a directory within current folder | One parameter (required)",
    },
    {
      invoke: "pwd",
      onActive: pwdCommand,
      description: "Returns the working directory of the terminal",
    },
    {
      invoke: "reset",
      onActive: resetCommand,
      description: "Resets everything (settings and file system)",
    },
    {
      invoke: "exit",
      onActive: exitTerminal,
      description: "Exits the terminal | No parameters",
    },
  ];

  const focusTextRef = () => TextRef.current.focus();
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      setHistoryIndex(0);
      let command = TextRef.current.innerText;
      setHistoryCommand([...historyCommands, command]);
      let tokens = command.trim().replace(/\s\s+/g, " ").split(" ");
      let isSudo = false;
      if (tokens[0] === "sudo") isSudo = true;
      else {
        let commandObj = commandList.find(
          (com) => com.invoke === tokens[0].toLowerCase()
        );
        if (commandObj) commandObj.onActive({ command, tokens, isSudo });
        else
          printOutput({
            inputPath,
            command,
            error: `Error: "${tokens[0]}" is not a command`,
          });
      }
      emptyTextRef();
    } else if (e.keyCode === 38) {
      let lastIndex = historyCommands.length - 1;
      if (historyIndex === lastIndex) setHistoryIndex(lastIndex);
      else setHistoryIndex(historyIndex + 1);
      TextRef.current.innerText = historyCommands[lastIndex - historyIndex];
    } else if (e.keyCode === 40) {
      let lastIndex = historyCommands.length - 1;
      if (historyIndex === 0) setHistoryIndex(0);
      else setHistoryIndex(historyIndex - 1);
      TextRef.current.innerText = historyCommands[lastIndex - historyIndex];
    }
  };
  useEffect(() => {
    focusTextRef();
  }, []);
  useEffect(() => {
    if (terminalLocation && terminalLocation.length) {
      let innerPath = terminalLocation.join("/");
      setInputPath(`/${innerPath}/`);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="terminal-editable-container" onClick={focusTextRef}>
        <div>
          {commandOutput.map((OutputComp, index) => (
            <React.Fragment key={`output-division-${index}`}>
              {OutputComp}
            </React.Fragment>
          ))}
        </div>
        <div className="terminal-main-content">
          <span className="terminal-green">raghavdhingra@web-os: </span>
          <span className="terminal-blue">{inputPath}$ </span>
          <span
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="terminal-text-editor"
            ref={TextRef}
            onKeyDown={keyPress}
          ></span>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  fileSystem: state.fileSystemReducers.fileSystem,
  activityList: state.activityReducers.activity,
});
export default connect(mapStateToProps, {
  removeActivity,
  makeDirectoryAction,
  removeDirectoryAction,
  resetToDefault,
})(TerminalWindow);
