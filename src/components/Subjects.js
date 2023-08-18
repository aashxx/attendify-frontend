import React, {useContext, useEffect} from 'react';
import '../index.css';
import SubItem from './SubItem';
import AddSub from './AddSub';
import {AttendContext} from '../contexts/AttendContext'; // Context API
import NoSubjects from './NoSubjects';
import { useNavigate } from 'react-router-dom';

const Subjects = () => {
  const context = useContext(AttendContext);
  const {subs, fetchSubs} = context; // Import fetchSubs from Context API
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")) {
      fetchSubs();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <AddSub/>
    {
      (subs.length > 0) ? (
        <div className='subJects'>
          {
            subs.map((sub) => {
              return (
                <SubItem key={sub._id} sub={sub}/>
              )
            })
          }
        </div>
      ) : (
        <NoSubjects />
      )
    }
    </>
  )
}

export default Subjects;
