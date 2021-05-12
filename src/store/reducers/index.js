import { combineReducers } from 'redux';


const images = (state = {}, action) => {
  if (action.type === 'merge') {
    const data =  {
      ...state,
      ...action.value
    }

    return data;
  }

  return [];
};


const rootReducer = combineReducers({
  images
});


export default rootReducer;
