import React, { useReducer } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

const store = createStore(rootReducer)
console.log(store.getState());
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};