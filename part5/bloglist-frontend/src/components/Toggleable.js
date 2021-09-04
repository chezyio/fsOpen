import React, { useState, useImperativeHandle } from "react";
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div
        className="hiddenByDefault"
        style={visible ? { display: "" } : { display: "none" }}
      >
        <div style={showWhenVisible} className="togglableContent">
          {props.children}
          <button onClick={toggleVisibility}>{props.cancelButtonLabel}</button>
        </div>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


export default Toggleable;

