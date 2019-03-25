import React, { useState } from 'react';
import { get } from 'lodash';
import ActionTypes from '../constants/actionTypes';
import { getState } from './StateProvider';
import { useFormInput } from '../hooks';
const BranchFactory = (props) => {
  const amount = useFormInput('', {
    placeholder:"Enter amount of number, between 0 and 15",
    type:"number",
    name:"amount",
  });
  const [state, dispatch] = getState();
  const leaves = get(state, `branches.${props.id}.leaf`, [])
    .map((val, idx) => <li key={`${props.id}-${idx}`}>{val}</li>)
  const [show, setShow] = useState(false);
  return (
    <li>
      {props.index}
      {props.name}
      {props.min}
      {props.max}
      <button
        onClick={() => setShow(!show)}
      >Add random number</button>
      {show && <input {...amount}/>}
      {show && <button
        onClick={() => {
          return dispatch({
            type: ActionTypes.GENERATE_LEAF,
            parentId: props.id,
            amount: amount.value,
            min: props.min,
            max: props.max 
          })}}>
        Generate
      </button>}
      {<ul>
        {leaves}
      </ul>}
    </li>
  );
};

export default BranchFactory;
