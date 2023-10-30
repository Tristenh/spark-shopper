//import components cart and ProductList
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { CLEAR_CURRENT_SUBCATEGORY } from "../utils/actions";

//importing  GlobalState
import { useStoreContext } from "../utils/GlobalState";
import { useEffect } from "react";
const Search = () => {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    //clears the states
    dispatch({ type: CLEAR_CURRENT_SUBCATEGORY });
  }, [dispatch]);
  //renders wishlist and order history on profile page
  return (
    <>
      <ProductList />
      <Cart />
    </>
  );
};

export default Search;
