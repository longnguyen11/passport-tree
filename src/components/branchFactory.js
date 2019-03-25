import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { get, merge } from 'lodash';
import ActionTypes from '../constants/actionTypes';
import { StyleContext } from '../context/style';
import { getState } from './StateProvider';
import { useFormInput } from '../hooks';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
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
  const [hover, toggleHover] = useState(false);
  const styleContext = useContext(StyleContext);
  const branchStyle = {
    paddingRight: 10,
    fontSize: 20,
    backgroundColor: hover ? 'rgb(51, 164, 194)' : 'white',
  };
  return (
    <li>
      <span style={merge(branchStyle, styleContext.branch)}
        onClick={() => setShow(!show)}
        onMouseEnter={() => toggleHover(!hover)}
        onMouseLeave={() => toggleHover(!hover)}
      >{props.name}</span>

      <input style={styleContext.input}
        value={props.min}
        onChange={(e) => dispatch({
          type: ActionTypes.CHANGE_BRANCH,
          min: e.target.value,
          id: props.id,
        })}
      />
      <input style={styleContext.input}
        value={props.max}
        onChange={(e) => dispatch({
          type: ActionTypes.CHANGE_BRANCH,
          max: e.target.value,
          id: props.id
        })} />
      <span>
        <DeleteIcon
          viewBox='0 -3 24 24'
          onClick={() => {
            return dispatch({
              type: ActionTypes.DELETE_BRANCH,
              id: props.id,
            })
          }}
        />
      </span>
      {show && <input {...amount}/>}
      {show && <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => {
          return dispatch({
            type: ActionTypes.GENERATE_LEAF,
            parentId: props.id,
            amount: amount.value,
            min: props.min,
            max: props.max
          })}}>
        Generate
      </Button>}

      {<ul>
        {leaves}
      </ul>}
    </li>
  );
};
BranchFactory.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string
};
export default BranchFactory;
