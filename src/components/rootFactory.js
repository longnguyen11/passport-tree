import React, { useState } from 'react';
import ActionTypes from '../constants/actionTypes';
import { getState } from './StateProvider';
import Branch from './branchFactory';
import { useFormInput } from '../hooks';
import uuid from '../util/uuid';
const RootFactory = () => {
  const name = useFormInput('', {
    placeholder:"Name",
    type:"text",
    name:"name",
  });
  const min = useFormInput('', {
    placeholder:"Minimum value",
    type:"number",
    name:"min",
  });
  const max = useFormInput('', {
    placeholder:"Maximum value",
    type:"number",
    name:"max",
  });
  const [show, setShow] = useState(false);
  const [state, dispatch] = getState();
  const branches = Object.keys(state.branches).map((key) => <Branch {...state.branches[key]}/>)
  return (
    <div>
      RootFactory
      <button
        onClick={() => setShow(!show)}
      >Add</button>
      {show && <input {...name}/>}
      {show && <input {...min}/>}
      {show && <input {...max}/>}
      {show && <button
        onClick={() => {
          const id = uuid('branch')
          return dispatch({
          type: ActionTypes.ADD_BRANCH,
          key: id,
          id,
          name: name.value,
          min: min.value,
          max: max.value 
        })}}
      >
        Add Group
      </button>}
      {<ul>
        {branches}
      </ul>}
    </div>
  )
}

export default RootFactory;
