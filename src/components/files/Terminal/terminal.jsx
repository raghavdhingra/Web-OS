import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { removeActivity } from "../../../actions/activityActions";
import "../../../assets/files/terminal.css";

const OutputDivision = ({ inputPath, command, error, success, startState }) => {
  if (startState)
    return (
      <div className="terminal-main-content terminal-blue">
        Welcome to Web OS
      </div>
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

const TerminalWindow = ({ fileSystem, activityList, removeActivity }) => {
  const [inputPath, setInputPath] = useState("/");
  const [historyCommands, setHistoryCommand] = useState(["help"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [commandOutput, setCommandOutput] = useState([
    <OutputDivision startState={true} />,
  ]);
  const TextRef = useRef(null);

  const emptyTextRef = () => {
    setTimeout(() => {
      try {
        TextRef.current.innerText = "";
      } catch (err) {
        return null;
      }
    }, 10);
  };

  const clearScreen = () =>
    setCommandOutput([<OutputDivision startState={true} />]);

  const echoOnScreen = ({ command, tokens, isSudo }) => {
    tokens.shift();
    if (isSudo) tokens.shift();
    let outputCommand = (
      <OutputDivision
        inputPath={inputPath}
        command={command}
        success={tokens.join(" ")}
      />
    );
    setCommandOutput([...commandOutput, outputCommand]);
  };
  const setInputPathConditionally = (pathArr) => {
    pathArr = pathArr.filter((system) => !!system);
    if (pathArr.length) setInputPath(`/${pathArr.join("/")}/`);
    else setInputPath("/");
  };
  const changeDirectory = ({ command, tokens, isSudo }) => {
    if (isSudo) tokens.shift();
    if (tokens.length > 2) {
      let outputCommand = (
        <OutputDivision
          inputPath={inputPath}
          command={command}
          error={`"cd" command can't have more than 1 parameter`}
        />
      );
      return setCommandOutput([...commandOutput, outputCommand]);
    } else {
      if (tokens[1] === "/") {
        setInputPath("/");
        let outputCommand = (
          <OutputDivision inputPath={inputPath} command={command} />
        );
        return setCommandOutput([...commandOutput, outputCommand]);
      }
      let fullPath = inputPath.split("/").filter((path) => !!path);
      let givenDirList = tokens[1].split("/").filter((path) => !!path);
      for (let i in givenDirList) {
        if (givenDirList[i] === ".") break;
        else if (givenDirList[i] === "..") {
          if (fullPath.length) fullPath.pop();
          else {
            let outputCommand = (
              <OutputDivision
                inputPath={inputPath}
                command={command}
                error="Already on the base directory"
              />
            );
            return setCommandOutput([...commandOutput, outputCommand]);
          }
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
          let outputCommand = (
            <OutputDivision
              inputPath={inputPath}
              command={command}
              error="No such directory exists"
            />
          );
          return setCommandOutput([...commandOutput, outputCommand]);
        }
      }
      setInputPathConditionally(fullPath);
      let outputCommand = (
        <OutputDivision inputPath={inputPath} command={command} />
      );
      return setCommandOutput([...commandOutput, outputCommand]);
    }
  };
  const exitTerminal = ({ command, tokens }) => {
    if (tokens.length > 1) {
      let outputCommand = (
        <OutputDivision
          inputPath={inputPath}
          command={command}
          error={`"exit" command can't have more than 1 parameter`}
        />
      );
      return setCommandOutput([...commandOutput, outputCommand]);
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
    let outputCommand = (
      <OutputDivision
        inputPath={inputPath}
        command={command}
        success={childParameter}
      />
    );
    return setCommandOutput([...commandOutput, outputCommand]);
  };
  const listInDirectory = ({ command }) => {
    let pathArray = inputPath.split("/");
    pathArray = pathArray.filter((paths) => !!paths);
    let childParameter, outputCommand;
    try {
      let currentDir = fileSystem;
      for (let i in pathArray) {
        currentDir = currentDir.find((system) => system.name === pathArray[i])
          .child;
      }
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
      outputCommand = (
        <OutputDivision
          inputPath={inputPath}
          command={command}
          success={childParameter}
        />
      );
    } catch (err) {
      outputCommand = (
        <OutputDivision
          inputPath={inputPath}
          command={command}
          error={"No such directory exists"}
        />
      );
    }
    return setCommandOutput([...commandOutput, outputCommand]);
  };
  const pwdCommand = ({ command }) => {
    let outputComponent = (
      <OutputDivision
        inputPath={inputPath}
        command={command}
        success={inputPath}
      />
    );
    setCommandOutput([...commandOutput, outputComponent]);
  };
  const makeDirectory = ({ command, tokens }) => {
    if (tokens[0] === "sudo") tokens.shift();
    console.log(tokens);
    if (tokens.length > 2) {
      let outputComponent = (
        <OutputDivision
          inputPath={inputPath}
          command={command}
          error={"Folder name should not have space between name"}
        />
      );
      setCommandOutput([...commandOutput, outputComponent]);
    }
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
      invoke: "pwd",
      onActive: pwdCommand,
      description: "Returns the working directory of the terminal",
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
      if (tokens[0] === "sudo") alert("You are using sudo");
      else {
        let commandObj = commandList.find(
          (com) => com.invoke === tokens[0].toLowerCase()
        );
        if (commandObj) commandObj.onActive({ command, tokens });
        else {
          let outputComponent = (
            <OutputDivision
              inputPath={inputPath}
              command={command}
              error={`Error: "${tokens[0]}" is not a command`}
            />
          );
          setCommandOutput([...commandOutput, outputComponent]);
        }
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
  // const checkCommand = () => {};
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
  fileSystem: state.fileSystemReducers,
  activityList: state.activityReducers,
});
export default connect(mapStateToProps, { removeActivity })(TerminalWindow);
