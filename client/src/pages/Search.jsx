//import components cart and ProductList
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";

//importing CHAKRA UI components

const Search = () => {
  //renders wishlist and order history on profile page
  return (
    <>
      <ProductList />
      <Cart />
    </>
  );
};

export default Search;
