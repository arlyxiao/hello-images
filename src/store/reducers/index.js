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
    return {...state, ...action.value};
  }

  return state;
};

const paginationState = {
  perPage: 20,
  page: 1,
  aborterList: [new AbortController()]
};
const pagination = (state = paginationState, action) => {
  switch (action.type) {
    case "start_page":
      return {...state, page: 1};

    case "increase_page":
      return {...state, page: action.value + 1};

    case "set_aborter":
      let newList = [...state.aborterList, action.value];
      if (newList.length > 2) {
        newList.shift();
      }
      return {...state, aborterList: newList}

    default:
      return state;
  }
};


const rootReducer = combineReducers({
  images,
  queryParams,
  pagination
});


export default rootReducer;
