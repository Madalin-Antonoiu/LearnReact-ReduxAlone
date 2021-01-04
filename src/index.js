//  Check the Console!
import { createStore, combineReducers } from "redux";
console.clear();

// Action Creators - People dropping off a form
const createPolicy = (name, ammount) => {
  return {
    // 2. Action - A form, in our analogy
    type: "CREATE_POLICY",
    payload: {
      name,
      ammount
    }
  };
};
const createClaim = (name, ammountToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name,
      ammountToCollect
    }
  };
};
const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name
    }
  };
};

// Reducers ( Departments! )
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    // we care about this action(form)
    return [...oldListOfClaims, action.payload];
    // meaning create new array and add action.payload to oldList
  }

  return oldListOfClaims;
  //we don't care about the action(form)
};
const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.ammountToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.ammount;
  }

  return bagOfMoney;
};
const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }

  return listOfPolicies;
};

// Combine Reducers
const departments = combineReducers({
  accounting,
  claimsHistory,
  policies
});

// Redux Store
const store = createStore(departments);

// Dispatch an action! ( form receiver, sends action to each departments )
store.dispatch(createPolicy("Alex", 20));
store.dispatch(createPolicy("Jim", 30));
store.dispatch(createPolicy("Bob", 40));

store.dispatch(createClaim("Alex", 120));

store.dispatch(deletePolicy("Bob"));

console.log(store.getState());
