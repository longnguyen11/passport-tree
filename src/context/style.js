import { createContext } from 'react';

export const StyleContext = new createContext();
export const initialStyle = {
  input: {
    width: 75,
    cursor: 'pointer',
    backgroundColor: 'grey',
    color: 'white',
    fontFamily: 'arial',
    paddingLeft: 5,
    paddingRight: 5,
    height: '100%',
    borderRadius: 5,
  },
  branch: {
    cursor: 'pointer',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    paddingLeft: 20,
    borderRadius: 5,
    margin: 'auto',
    color: 'white',
  },
}