import React from 'react';

const Alert = (props) => {
  const capitalize = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    props.alert && (
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" style={{position: 'fixed', top: '70px', right: '20px', zIndex: '9999'}}>
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
      </div>
    )
  );
};

export default Alert;
