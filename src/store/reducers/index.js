import { combineReducers } from 'redux';


const images = (state = {}, action) => {
  if (action.type === "merge_images") {
    const data =  {
      ...state,
      ...action.value
    }

    return data;
  }

  return state;
};


const queryParams = (state = {}, action) => {
  if (action.type === "merge_query") {
    return Object.assign({}, state, action.value);
  }

  return state;
};


const rootReducer = combineReducers({
  images,
  queryParams
});


export default rootReducer;
