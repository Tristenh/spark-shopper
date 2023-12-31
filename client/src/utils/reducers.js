//import actions
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  CLEAR_CART,
  TOGGLE_CART,
  UPDATE_SUBCATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_CURRENT_SUBCATEGORY,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  UPDATE_WISHLIST,
  CLEAR_WISHLIST,
  CURRENT_PRODUCT,
  SEARCH,
  CLEAR_SEARCH,
  CLEAR_CURRENT_SUBCATEGORY,
  UPDATE_SEARCHED_PRODUCTS,
  CURRENT_SUBCATEGORY_NAME,  
} from "./actions";

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an updated products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    // Returns a copy of state with updated cart after adding new product to cart, sets the cartOpen to true
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    // Returns a copy of state, sets the cartOpen to true and maps through the items in the cart.
    // If the item's `id` matches the `id` that was provided in the action.payload, we update the purchase quantity.
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    // First we iterate through each item in the cart and check to see if the `product._id` matches the `action._id`
    // If so, we remove it from our cart and set the updated state to a variable called `newState`
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });
      // Then we return a copy of state and check to see if the cart is empty.
      // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    //sets cartOpen as false and clears the cart
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    //toggles the cartOpen to true or false
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    // Returns a copy of state with an updated categories array.
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    // Returns a copy of state with an updated categories array.
    case UPDATE_SUBCATEGORIES:
      return {
        ...state,
        subcategories: [...action.subcategories],
      };
    //return the state after updating current subcategory
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    case UPDATE_CURRENT_SUBCATEGORY:
      return {
        ...state,
        currentSubCategory: action.currentSubCategory,
      };
    // Returns a copy of state with updated wishlist after adding new product to wishlist
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishList: [...state.wishList, action.product],
      };
    // First we iterate through each item in the wishlist and check to see if the `product._id` matches the `action._id`
    // If so, we remove it from our wishlist and set the updated state to a variable called `newWishListState`
    case REMOVE_FROM_WISHLIST:
      let newWishListState = state.wishList.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        wishList: newWishListState,
      };

    // Returns a copy of state with an updated wishList array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_WISHLIST:
      return {
        ...state,
        wishList: [...action.wishList],
      };
    //sets cartOpen as false and clears the cart
    case CLEAR_WISHLIST:
      return {
        ...state,
        wishList: [],
      };

    // Returns a copy of state with an updated current product. We use the action.currentproduct property.

    case CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.currentProduct,
      };

    //sets the state as true for search
    case SEARCH:
      return {
        ...state,
        search: true,
      };
    //sets search as false
    case CLEAR_SEARCH:
      return {
        ...state,
        search: false,
      };
    //clears the current subcategory
    case CLEAR_CURRENT_SUBCATEGORY:
      return {
        ...state,
        currentSubCategory: "",
      };
    // Returns a copy of state with an updated searched products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: [...action.products],
      };
    //sets the current subcategory name
    case CURRENT_SUBCATEGORY_NAME:
      return {
        ...state,
        subCategoryName: [...action.currentSubCategoryName],
      };
    // Return the state as is in the event that the `action.type` passed to the reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};
