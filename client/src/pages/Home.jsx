//import components cart and ProductList
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { CLEAR_STATES } from "../utils/actions";
//importing actions,queries, GlobalState and helpers
import { useStoreContext } from "../utils/GlobalState";
import { useEffect } from "react";
const Home = () => {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    //clears the states
    dispatch({ type: CLEAR_STATES });
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
