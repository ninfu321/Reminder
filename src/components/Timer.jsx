import React, { useState , useEffect} from "react";

function Timer(props) {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  useEffect(() => {
    setIsChecked(props.isChecked);
  }, [props.isChecked]);
  function handleToggle() {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (props.onToggle) {
      props.onToggle(props.id);
    }
  }
  function handleClick() {
    props.onDelete(props.id);
  }
  return (
    <div className="timer">
      <div className="timerHeading"> 
        {props.hour.toString().length === 1 ? (
          <h1> 0{props.hour}</h1>
        ) : (
          <h1>{props.hour}</h1>
        )}
        {props.minute.toString().length === 1 ? (
          <h1 className="headingMargin"> : 0{props.minute}</h1>
        ) : (
          <h1 className="headingMargin">: {props.minute}</h1>
        )}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={isChecked}
            onChange={handleToggle}
          />
        </div>
      </div>
      <div className="deleteButtonContainer"><button className="deleteButton" onClick={handleClick}>DELETE</button></div>
    </div>
  );
}

export default Timer;