import { createContext, useContext, useReducer } from "react";
// Import reducer
import { reducer } from "./reducers";
// Initialize new context for store
const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  // Initialize `useReducer` hook. Returns state and a dispatch function. Accepts arguments of our reducer and initial state
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    subcategories: [],
    currentCategory: "",
    currentSubCategory: "",
    wishList: [],
    search: false,
    searchedProducts: [],
    subCategoryName: "",
  });
  // The value prop expects an initial state object and it has given the global state object and the dispatch function from `useReducer` hook
  return <Provider value={[state, dispatch]} {...props} />;
};
// Custom hook to provide usage of the Store context
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
