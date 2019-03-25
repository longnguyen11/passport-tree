import React, { Component } from 'react';
import * as Actions from '../actions';
const RootFactory = () =>  {
  // constructor() {
  //   super();
  //   this.handleAddBranch = this.handleAddBranch.bind(this);
  //   this.handleChangeProperty = this.handleChangeProperty.bind(this);
  //   this.state = {
  //     name: '',
  //     showInput: false, // do show/hide later
  //     rangeMin: 0,
  //     rangeMax: 0,
  //   }
  // }
  // handleChangeProperty(stateName = '', value) {
  //   this.setState({[stateName]: value});
  // }
  // handleAddBranch() {
  //   let error = false;
  //   if(this.state.name === '') {
  //     this.props.dispatch(Actions.showError('name', 'Name cannot be empty'));
  //     error = true
  //   }
  //   if(this.state.rangeMin >= this.state.rangeMax) {
  //     this.props.dispatch(Actions.showError('range', 'Minimum cannot exceed or match maximum'));
  //     error = true;
  //   }
  //   if(error) {
  //     console.log('hereee');
  //     return;
  //   }
  //   this.props.dispatch(Actions.addBranch(this.state.name, range));
  // }
  return (
    <div>
      RootFactory
      <input
        type='text'
        onChange={(e) => this.handleChangeProperty('name', e.target.value)}
      />
      <input
        type='number'
        min='0'
        onChange={(e) => this.handleChangeProperty('rangeMin', e.target.value)}
      />
      <input
        type='number'
        min='0'
        onChange={(e) => this.handleChangeProperty('rangeMax', e.target.value)}
      />
      <button
      onClick={this.handleAddBranch}
      >Add a group</button>
    </div>
  );
}

export default RootFactory;
