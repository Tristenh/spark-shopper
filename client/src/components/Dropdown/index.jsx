import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, MenuItem } from "@chakra-ui/react";
// import global state
import { useStoreContext } from "../../utils/GlobalState";
// import query and action
import { QUERY_SUBCATEGORIES } from "../../utils/queries";
import {
  UPDATE_SUBCATEGORIES,
  UPDATE_CURRENT_SUBCATEGORY,
} from "../../utils/actions";
// import package
import { useLazyQuery } from "@apollo/client";

import { idbPromise } from "../../utils/helpers";

const submenu = {
  position: "absolute",
  left: "100%",
  top: "-7px",
};
export default function Dropdown({ level, dropdown }) {
  const [state, dispatch] = useStoreContext();
  level = level + 1;
  // class to open new box as dropdown
  const dropdownClass = level > 0 ? submenu : "";
  const showDropdown = dropdown ? { display: "block" } : "";

  const [getSubCategories, { loading }] = useLazyQuery(QUERY_SUBCATEGORIES);
  const { currentCategory } = state;

  useEffect(() => {
    // get subcategories of selected currentcategory
    // save subcategories to state and indexdb
    if (currentCategory) {
      getSubCategories({
        variables: {
          category: currentCategory,
        },
      }).then((sub) => {
        dispatch({
          type: UPDATE_SUBCATEGORIES,
          subcategories: sub.data.subcategories,
        });
        sub.data.subcategories.forEach((subcategory) => {
          idbPromise("subcategories", "put", subcategory);
        });
      });
    } else if (!loading) {
      idbPromise("subcategories", "get").then((subcategories) => {
        dispatch({
          type: UPDATE_SUBCATEGORIES,
          subcategories: subcategories,
        });
      });
    }
  }, [dispatch, getSubCategories, currentCategory, loading]);

  // update current subcategory state after click on subcategory
  const handleItemClick = async (id) => {
    dispatch({
      type: UPDATE_CURRENT_SUBCATEGORY,
      currentSubCategory: id,
    });
  };

  return (
    
    <Box
      as="ul"
      position="absolute"      
      right={0}
      left="auto"
      border="2px solid white"
      fontSize="1xl"
      zIndex={"999"}
      minWidth="12rem"
      padding="0.5rem 0"
      listStyleType="none"
      bgColor={"back.900"}
      borderRadius="0.5rem"
      display="none"
      {...dropdownClass}
      {...showDropdown}
    >
      {/* displays subcategories in menuitem */}
      {state.subcategories && state.subcategories.map((item) => (
        <MenuItem
          as="li"
          key={item._id}
          px={2}
          py={1}
          color={"white"}
          bg={"back.900"}
          _hover={{ bg: "gray.400", color: "black" }}
          onClick={() => handleItemClick(item._id)}
        >
          <Link style={{ textDecoration: "none" }} to={"/"}>
            {" "}
            {item.name}
          </Link>
        </MenuItem>
      ))}
    </Box>
  );
}
