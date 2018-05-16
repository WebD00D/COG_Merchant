import { createStore as reduxCreateStore } from "redux";
import fire from "../fire";
import _ from "lodash";

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + 1
    });
  }

  if (action.type === `SET_ENTRY_TYPE`) {
    return Object.assign({}, state, {
      currentEntryType: action.entryType
    });
  }


  return state;
};

const initialState = {
  userAuthenticated: true,
  merchantId: ''
};

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
