import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { get, merge, isEmpty } from 'lodash';
import ActionTypes from '../constants/actionTypes';
import { StyleContext } from '../context/style';
import { getState } from './StateProvider';
import { useFormInput } from '../hooks';
import {validateBranchForm, getRandomInt } from '../util/validation';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
const BranchFactory = (props) => {
  const amount = useFormInput('', {
    placeholder:"Range 1-15",
    type:"number",
    name:"amount",
  });
  const [state, dispatch] = getState();
  const leaves = get(state, `branches.${props.id}.leaf`, [])
    .map((val, idx) => <li key={`${props.id}-${idx}`}>{val}</li>)
  const branchErrors = get(state, `branches.${props.id}.branchErrors`, {});
  const errors = Object.keys(branchErrors).map((key) => {
    return <p key={`${props.id}-${key}`} style={{color: 'red'}}>{branchErrors[key]}</p>
  })
  const [show, setShow] = useState(false);
  const [hover, toggleHover] = useState(false);
  const styleContext = useContext(StyleContext);
  const branchStyle = {
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: hover ? 'rgb(99, 199, 199)' : 'rgb(51, 164, 194)'
  };
  return (
    <li>
      <span style={merge(branchStyle, styleContext.branch)}
        onClick={() => setShow(!show)}
        onMouseEnter={() => toggleHover(!hover)}
        onMouseLeave={() => toggleHover(!hover)}
      >{props.name}</span>
      {show && <input style={styleContext.input} {...amount}/>}
      {show && <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => {
          const action = {
            type: ActionTypes.GENERATE_LEAF,
            id: props.id,
            amount: amount.value,
            data: Array.from({length: amount.value}, () => getRandomInt(props.min, props.max)),
            min: props.min,
            max: props.max
          }
          const errors = validateBranchForm(action);
          if(!isEmpty(errors)) {
            return dispatch({
              type: ActionTypes.SHOW_BRANCH_ERROR,
              id: props.id,
              errors: errors
            });
          }
          props.ws.emit('message', JSON.stringify(action));
          return dispatch(action)}}>
        Generate
      </Button>}
      <input style={styleContext.input}
        type="number"
        value={props.min}
        onChange={(e) => {
          const action = {
            type: ActionTypes.CHANGE_BRANCH,
            min: e.target.value,
            id: props.id,
          }
          props.ws.emit('message', JSON.stringify(action));
          return dispatch(action)
        }}
      />
      <input style={styleContext.input}
        type="number"
        value={props.max}
        onChange={(e) =>{
          const action = {
            type: ActionTypes.CHANGE_BRANCH,
            max: e.target.value,
            id: props.id
          }
          props.ws.emit('message', JSON.stringify(action));
          return dispatch(action)
        }} />
      <span>
        <DeleteIcon
          viewBox='0 -3 24 24'
          onClick={() => {
            const action = {
              type: ActionTypes.DELETE_BRANCH,
              id: props.id,
            };
            props.ws.emit('message', JSON.stringify(action));
            return dispatch(action);
          }}
        />
      </span>
      {errors}
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
