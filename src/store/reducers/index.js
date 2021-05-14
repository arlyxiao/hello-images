import { combineReducers } from 'redux';


const images = (state = {}, action) => {
  switch (action.type) {
    case "first_loading":
      return action.value;

    case "merge_images":
      return [...state, ...action.value];

    default:
      return state;
  }
};

const queryParams = (state = {}, action) => {
  if (action.type === "merge_query") {
    return Object.assign({}, state, action.value);
  }

  return state;
};

const currentPage = (state = 1, action) => {

  switch (action.type) {
    case "start_page":
      return 1;

    case "increase_page":
      return action.value + 1;

    default:
      return state;
  }
};


const rootReducer = combineReducers({
  images,
  queryParams,
  currentPage
});


export default rootReducer;
