import React, {useState} from "react";
import Timer from "./Timer";
import { useNavigate } from 'react-router-dom';
import {db} from "../firebase/firebase";



function Reminder(props){
  const [activeHour, setActiveHour] = useState(null);
  const [activeMinute, setActiveMinute] = useState(null);
  const [selectedTime, setSelectedTime] = useState({
    index:0,
    hour:0,
    minute:0,
    isChecked: true
  });

    var optionHours = [];
    var optionMinutes = [];
    const handleHourClick = (index,hour) => {
        setActiveHour(index);
        setSelectedTime(prevTime=>{
          return {...prevTime,
            hour: hour}
          });
    };
    const handleMinuteClick = (index,minute) => {
        setActiveMinute(index);
        setSelectedTime(prevTime=>{
          return {...prevTime,
            minute: minute}
          });
    };

    for (var i = 0; i <= 23; i++) {
   optionHours.push(i);
    }
    for (var i = 0; i <= 59; i++) {
        optionMinutes.push(i);
    }


    function handleClick(event){
      props.onAdd(selectedTime);
      setSelectedTime({
        hour:0,
        minute:0,
        isChecked: true
      })
      setActiveMinute(null)
      setActiveHour(null)
      event.preventDefault();
    }

  
    
    return <div >
    <div style={{textAlign:"right"}}>
    <button type="button" className="btn SignOut" style={{backgroundColor:"#3A4F69", color:"white"}} onClick={props.handleSignout}>Sign Out</button>
    </div>
    <div>
    </div>
    <div className="addBtn">
    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add a Reminder</button>
    </div>
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Reminder</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body dropDwn" style={{minHeight:"300px", display:"flex"}}>
      <div className="dropdown" style={{marginRight:"160px"}}>
  <ul className="dropdown-menu show dropDwn" style={{minHeight:"270px"}}>
    {optionHours.map((hour,index)=>{
        return  <li key={index}>
                <a name="hour" className={`dropdown-item ${activeHour === index ? 'active' : ''}`} style={{ textAlign: "center",  backgroundColor: activeHour===index?'#757575':''}} href="#" onClick={() => handleHourClick(index, hour)}>
                {hour}
                </a>
                </li>
    })}
  </ul>
  
  </div>
<div className="dropdown">
  <ul className="dropdown-menu show dropDwn" style={{minHeight:"270px"}}>
    {optionMinutes.map((minute,index)=>{
        return  <li key={index}>
                <a name="minute" value={selectedTime.minute} className={`dropdown-item ${activeMinute === index ? 'active' : ''}`} style={{ textAlign: "center",  backgroundColor: activeMinute===index?'#757575':''}} href="#" onClick={() => handleMinuteClick(index, minute)}>
                {minute}
                </a>
                </li>
    })}
  </ul>
  
</div>
</div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClick}>Done</button>
      </div>
    </div>
  </div>
</div>
<div>
  {props.timers.map((item, index)=>{
        return <Timer
        id={index}
          key={index}
          hour={item.hour}
          minute={item.minute}
          isChecked={item.isChecked}
          onToggle={props.onToggle}
          onDelete={props.deleteTimer}
        />
      })}
</div>
    </div>
}

export default Reminder;