import { createStore as reduxCreateStore } from "redux";
import fire from "../fire";
import _ from "lodash";

const reducer = (state, action) => {
 
  if (action.type === `CREATE_COURIER`) {
    return Object.assign({}, state, {
      user: action.user,
      courier: action.courier
    });
  }

  return state;
};

const initialState = {
  userTypes: [`COURIER`, `MERCHANT`, `SHOPPER`],
  user: {},
  courier: {},

  zones: [],
  merchants: [],
  twinjetAPI: null,

};

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;


// const user = {
//   authenticated: true,
//   id: courierId,
//   type: `COURIER`,
//   email: this.state.loginEmail,
//   name: this.state.contactPerson
// };

// const courier = {
//   id: courierId,
//   contactName: this.state.contactPerson,
//   contactEmail: this.state.email,
//   contactPhone: this.state.phone,
//   city: this.state.city,
//   state: this.state.usState,
//   zip: this.state.zip,
//   authenticationEmail: this.state.loginEmail
// };
