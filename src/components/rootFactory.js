import React, { useState, useContext, useEffect } from 'react';
import { get, merge, isEmpty } from 'lodash';
import { getState } from './StateProvider';
import Branch from './branchFactory';
import ActionTypes from '../constants/actionTypes';
import { useFormInput } from '../hooks';
import { uuid } from '../util/validation';
import { StyleContext } from '../context/style';
import { validateRootForm } from '../util/validation';
import Button from '@material-ui/core/Button';
import superagent from 'superagent';
import io from 'socket.io-client';
import './tree.css';
const url = 'https://tree-practice-app.herokuapp.com';
const RootFactory = () => {
  const ws = io(url);
  const name = useFormInput('', {
    placeholder:"Name",
    type:"text",
    name:"name",
    height: 25,
  });
  const min = useFormInput('', {
    placeholder:"Min",
    type:"number",
    name:"min",
    height: 25,
  });
  const max = useFormInput('', {
    placeholder:"Max",
    type:"number",
    name:"max",
    height: 25,
  });

  const [show, setShow] = useState(false);
  const [hover, toggleHover] = useState(false);
  const [state, dispatch] = getState();
  useEffect(() => {
    superagent.get(url+'/data').then((event) => {
      const transform = get(event.body, 'Items', []).reduce((acc, branch) => {
        let leaf = [];
        if(typeof branch.RandomGenerateData === 'string') {
          try {
            leaf = JSON.parse(branch.RandomGenerateData);
          } catch (e) {
            console.log(e);
          }
        }
        return merge(acc, {
          branches: {
            [branch.UserName]: {
              leaf,
              min: branch.MinimumRange || '',
              max: branch.MaximumRange || '',
              name: branch.DisplayName || '',
              id: branch.UserName,
              key: branch.UserName
            }
          }
        })
      }, {})
      dispatch({ type: ActionTypes.MERGE_DATA, transform});
    })
    ws.on('message', function (event) {
      let transform
      try {
        transform = JSON.parse(event)
      } catch (e) {
        console.log('Fail to parse data');
      }
      dispatch({ type: ActionTypes.CHANGE_BRANCH, ...transform});
    });
    ws.on('delete', function (event) {
      let transform;
      try {
        transform = JSON.parse(event)
      } catch (e) {
        console.log('Fail to parse data');
      }
      dispatch({ type: ActionTypes.DELETE_BRANCH, ...transform});
    });
  }, [])
  const branches = Object.keys(state.branches).map((key) => <Branch
    {...state.branches[key]} ws={ws}/>);
  const errorMessages = Object.keys(state.rootErrors).map((key) => {
    return <p key={`root-${key}`} style={{color: 'red'}}>{state.rootErrors[key]}</p>
  });
  const styleContext = useContext(StyleContext);
  const rootStyle = {
    fontSize: 25,
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
          const action = {
            type: ActionTypes.ADD_BRANCH,
            key: id,
            id,
            name: name.value,
            min: min.value,
            max: max.value
          }
          const errors = validateRootForm(action);
          if(!isEmpty(errors)) {
            return dispatch({type: ActionTypes.SHOW_ROOT_ERROR, errors});
          }
          ws.emit('message', JSON.stringify(action));
          return dispatch(action)}}
      >
        Add Group
      </Button>}
      {(show && errorMessages) && errorMessages}
      {<ul>
        {branches}
      </ul>}
    </div>
  )
}

export default RootFactory;
