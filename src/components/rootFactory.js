import React, { useState, useContext } from 'react';
import { merge } from 'lodash';
import { getState } from './StateProvider';
import Branch from './branchFactory';
import ActionTypes from '../constants/actionTypes';
import { useFormInput } from '../hooks';
import uuid from '../util/uuid';
import { StyleContext } from '../context/style';

import Button from '@material-ui/core/Button';
import './tree.css';

const RootFactory = () => {

  const name = useFormInput('', {
    placeholder:"Name",
    type:"text",
    name:"name",
    height: 25,
  });
  const min = useFormInput('', {
    placeholder:"Minimum value",
    type:"number",
    name:"min",
    height: 25,
  });
  const max = useFormInput('', {
    placeholder:"Maximum value",
    type:"number",
    name:"max",
    height: 25,
  });

  const [show, setShow] = useState(false);
  const [hover, toggleHover] = useState(false);
  const [state, dispatch] = getState();

  const branches = Object.keys(state.branches).map((key) => <Branch
    {...state.branches[key]}/>);

  const styleContext = useContext(StyleContext);
  const rootStyle = {
    fontSize: 25,
    color: 'white',
    backgroundColor: hover ? 'rgb(99, 199, 199)' : 'rgb(51, 164, 194)'
  }
  return (
    <div className="clt">
      <p style={merge(rootStyle, styleContext.branch)}
        onClick={() => setShow(!show)}
        onMouseEnter={() => toggleHover(!hover)}
        onMouseLeave={() => toggleHover(!hover)}>Root</p>
      {show && <input style={styleContext.input} {...name}/>}
      {show && <input style={styleContext.input} {...min}/>}
      {show && <input style={styleContext.input} {...max}/>}
      {show && <Button
        size="small"
        variant="contained"
        color="primary"
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
      </Button>}
      {<ul>
        {branches}
      </ul>}
    </div>
  )
}

export default RootFactory;
