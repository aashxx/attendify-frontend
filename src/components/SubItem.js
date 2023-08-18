import React, { useContext, useRef, useState } from 'react';
import '../index.css';
import Popup from 'reactjs-popup';
import { AttendContext } from '../contexts/AttendContext'; // Context API
import { AlertContext } from '../contexts/AlertContext';

const SubItem = ({sub}) => {

  const context = useContext(AttendContext);
  const {deleteSub, updateSub} = context; // Importing delete and update from Context API

  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;

  // Renaming a subject
  const [newName, setNewName] = useState("");
  const [confirmRename, setConfirmRename] = useState('none');
  const [subRename, setSubRename] = useState(false);
  const nameRef = useRef(null);

  // Present 
  const handlePresent = () => {
    const updatedPresent = sub.present + 1;
    const updatedClasses = sub.classes + 1;
    const updatedPercent = ((updatedPresent / updatedClasses) * 100).toFixed(2);
    updateSub(sub._id, sub.subject, updatedPresent, updatedClasses, updatedPercent);
  }

  // Absent
  const handleAbsent = () => {
    const updatedClasses = sub.classes + 1;
    const updatedPercent = ((sub.present / updatedClasses) * 100).toFixed(2);
    updateSub(sub._id, sub.subject, sub.present, updatedClasses, updatedPercent);
  }

  // Close options menu
  const closeRef = useRef(null);

  // Renaming subject
  const handleRename = () => {
    setSubRename(!subRename);
    if(!subRename) {
      nameRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(nameRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    closeRef.current.click();
  }

  // Renaming subject using contentEditable
  const handleNameChange = (event) => {
    setNewName(event.target.innerHTML);
    setConfirmRename('block');
  }

  // Updating the name in db
  const handleConfirmRename = () => {
    updateSub(sub._id, newName, sub.present, sub.classes, sub.percent);
  }

  // Setting timeout for rename button
  const handleNameBlur = () => {
    setSubRename(false);
    setTimeout(() => {
      setConfirmRename('none');
    }, 300);
    showAlert("Subject Renamed", "#f8cf38");
  }

  // Reset subject attendance
  const handleSubReset = () => {
    updateSub(sub._id, sub.subject, 0, 0, 0);
    closeRef.current.click();
    showAlert("Subject Reset", "#f8cf38");
  }

  // Delete subject
  const handleDelete = () => {
    deleteSub(sub._id);
    showAlert("Subject Deleted", "#f8cf38");
  }

  return (
    <div className='subItem'>
      <div className="subName" id='subReset' style={{color: sub.percent < 75 && sub.classes!==0 ? '#e5322d' : 'rgb( 24 49 83 )'}} suppressContentEditableWarning={true} onInput={handleNameChange} contentEditable={subRename} onBlur={handleNameBlur} ref={nameRef}>{sub.subject}</div>
      <button className="confirmRename" style={{display: `${confirmRename}`}} onClick={handleConfirmRename}>Rename</button>
      <div className='percent' style={{color: sub.percent < 75 && sub.classes!==0 ? '#e5322d' : 'rgb( 24 49 83 )'}}>{sub.percent}%</div>
      <div className="attended" style={{color: sub.percent < 75 && sub.classes!==0 ? '#e5322d' : 'rgb( 24 49 83 )'}}>
        Attendance: <span className="present">{sub.present}/{sub.classes}</span>
      </div>
      <div className="clicks">
        <button onClick={handlePresent}>Present</button>
        <button onClick={handleAbsent}>Absent</button>
        
        {/* Popup for displaying more options in a subject item - RENAME - RESET - DELETE */}
        <Popup trigger={<button className='kebab'><i className="fa-solid fa-ellipsis-vertical"></i></button>}>
          {
            (close) => (
              <div className='options'>
                <button onClick={handleRename}>Rename</button>
                <button onClick={handleSubReset}>Reset</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => close()} ref={closeRef} style={{display: 'none'}}>Close</button>
              </div> 
            )
          }
        </Popup>
      </div>
    </div>
  )
}

export default SubItem;
