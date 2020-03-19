import React from 'react';
import { noop } from './util.js';

export const TextInput = function(props) {
  return (
    <div className="form-group">
      <input
        className={props.className}
        type="text"
        name={props.name}
        value={props.value}
        // Avoids the annoying and baseless warnings about "you provided a `value` prop to a form
        // field without an `onChange` handler.
        onChange={noop}
      />
    </div>
  );
};

export const TextareaInput = function(props) {
  return (
    <div className="form-group">
      <textarea
        className={props.className}
        name={props.name}
        default={props.default}
        defaultValue={props.value}
      />
    </div>
  );
};
