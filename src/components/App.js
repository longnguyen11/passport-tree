import React from 'react';
import RootFactory from './rootFactory';
import { StyleContext, initialStyle } from '../context/style';
import { StateProvider } from './StateProvider';
import initialState from '../constants/initialState';
import reducer from '../reducers';

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <StyleContext.Provider value={initialStyle}>
      <RootFactory />
    </StyleContext.Provider>
  </StateProvider>
);
export default App;