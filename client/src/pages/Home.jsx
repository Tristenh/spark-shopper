//import components cart and ProductList
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { CLEAR_SEARCH } from "../utils/actions";
//importing  GlobalState
import { useStoreContext } from "../utils/GlobalState";
import { useEffect } from "react";
const Home = () => {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    //clears the states
    dispatch({ type: CLEAR_SEARCH });
  }, [dispatch]);
  //renders products on home page
  return (
    <>
      <ProductList />
      <Cart />
    </>
  );
};

export default Home;
