import React, { useContext, useRef, useState } from 'react';
import '../index.css';
import Popup from 'reactjs-popup';
import {AttendContext} from '../contexts/AttendContext'; // Attendance Context API
import { AlertContext } from '../contexts/AlertContext'; // Alerts Context API

const AddSub = () => {
  const context = useContext(AttendContext);
  const {addSub} = context; // Import add subject from Attendance Context API

  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext; // Import showAlert from Alerts Context API

  const [sub, setSub] = useState({subject: ""});

  const refClose = useRef(null);

  // New subject input
  const handleChange = (event) => {
    setSub({...sub, [event.target.name]: event.target.value});
  }

  // Adding new subject
  const addNewSub = (event) => {
    event.preventDefault();
    addSub(sub.subject);
    refClose.current.click();
    setSub({subject: ""});
    showAlert("Subject created", "#f8cf38");
  }

  return (
    <div> 
      <Popup overlayStyle={{background: 'rgba(0, 0, 0, .5)'}} trigger={<button className='addSub'><i className='fa-regular fa-plus'></i>Add Subject</button>} modal nested>
        {
          (close) => (
            <div className='newSubForm'>
              <div className="closebtn">
                <button onClick={() => close()} className='close'><i className='fa-solid fa-xmark'></i></button>
              </div>
              <form onSubmit={addNewSub} className="newSub">
                <p htmlFor="subject">New Subject</p>
                <input type="text" name='subject' placeholder='English'onChange={handleChange}/>
                <div className="subBtns">
                  <button ref={refClose} onClick={() => close()}>Cancel</button>
                  <button type='submit'>Add</button>
                </div>
              </form>
            </div>
          )
        }
      </Popup>
    </div>
  )
}

export default AddSub;
