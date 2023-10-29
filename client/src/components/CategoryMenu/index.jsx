import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// importing components from chakra
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

// importing package 
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
//import component for dropdown
import Dropdown from "../Dropdown";

function CategoryMenu() {
  // get state and action for managing category data
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  // get category data from database
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  //create state for dropdown to check open or close
  const [dropdown, setDropdown] = useState(false);
// level to check menu has submenu item
  const level = 0;

  useEffect(() => {
    // save category data into state and indexdb
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      // if its not loading data from db then get saved data from indexdb
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  // on mouse-enter it dispatches to update current category
  const onMouseEnter = async (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <Flex alignItems={"center"}>
      <Menu >
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              colorScheme="WhiteAlpha"
              _hover={{ bg: "gray.400", color: "black" }}
              rightIcon={<ChevronDownIcon />}
            >
              <Text fontSize={"1.50rem"}>
                {isOpen ? "Products" : "Products"}
              </Text>
            </MenuButton>
            <MenuList bg={"back.900"} color={"white"}  opacity={".8"} minWidth={{base:"8rem",sm:"12rem"}} >
              {/* run through all categories */}
              {categories.map((item) => (
                <MenuItem
                  as="ul"
                  position={"relative"}
                 
                  key={item._id}
                  px={2}
                  py={1}
                  bg={"back.900"}
                  onMouseEnter={() => onMouseEnter(item._id)}
                  onMouseLeave={onMouseLeave}
                  onTouchStart={() => onMouseEnter(item._id)}
                  _hover={{ bg: "gray.400", color: "black" }}
                  onClick={closeDropdown}
                >
                  <Text >
                   {item.name} </Text>
                    {level === 0 ? (
                      <span style={{right:"4px",position: "absolute"}} > &raquo;</span>
                    ) : (
                      <Link to={"/"}>{item.name}</Link>
                    )}
                 {/* check current category is same as selected id and fetches subcategories of selected category */}
                  {state.currentCategory === item._id ? (
                    <Dropdown
                      setDropdown={setDropdown}
                      dropdown={dropdown}
                      level={level}
                    />
                  ) : (
                    <Link to={"/"}></Link>
                  )}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
}

export default CategoryMenu;
