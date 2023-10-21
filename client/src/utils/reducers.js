import { UPDATE_PRODUCTS } from "./actions";

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an updated products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    // Return the state as is in the event that the `action.type` passed to the reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};
