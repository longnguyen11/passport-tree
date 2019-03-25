import React, { useState, useReducer } from 'react';
import ActionTypes from '../constants/actionTypes';
import initialState from '../constants/initialState';
// this works but it is tightly coupling components and reducers
import reducer from '../reducers/branch';
const RootFactory = () =>  {
  const [name, setName] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [show, setShow] = useState(false);
  const [branch, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      RootFactory
      <button
        onClick={e => setShow(!show)}
      >Add</button>
      {show && <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        type="text"
        name="name"
        required
      />}
      {show && <input
        value={min}
        onChange={e => setMin(e.target.value)}
        placeholder="Minimum value"
        type="number"
        name="min"
        required
      />}
      {show && <input
        value={max}
        onChange={e => setMax(e.target.value)}
        placeholder="Maximum value"
        type="number"
        name="max"
        required
      />}
      {show && <button
        onClick={e => dispatch({ type: ActionTypes.ADD_BRANCH, name, min, max })}
      >
        Add Group
      </button>}
    </div>
  );
}

export default RootFactory;
