import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
const Home = () => {
  //renders products on home page
  return (
    <>
      <ProductList />
      <Cart />
    </>
  );
};

export default Home;
