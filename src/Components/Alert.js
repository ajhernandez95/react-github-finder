import React, { useContext } from 'react';
import AlertContext from '../context/alerts/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { className, msg } = alertContext.alert;

  return (
    <div className={className}>
      <i className='fas fa-info-circle' /> {msg}
    </div>
  );
};

export default Alert;
