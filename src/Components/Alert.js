import React from 'react';

const Alert = ({ alert }) => {
  return (
    <div className={alert.class}>
      <i className="fas fa-info-circle" /> {alert.msg}
    </div>
  );
};

export default Alert;
