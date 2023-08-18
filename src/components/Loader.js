import React from 'react';
import '../index.css';

// Spinner component
const Loader = () => {
  return (
    <div className='loader'>
      <img src='/loading.gif' alt="Loading..." />
    </div>
  )
}

export default Loader;