import React from 'react';
import RootFactory from './rootFactory';
import { StateProvider } from './StateProvider';
import initialState from '../constants/initialState';
import reducer from '../reducers';
const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <RootFactory />
  </StateProvider>
);  
export default App;