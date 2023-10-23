import { useEffect } from "react";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { ChevronDownIcon } from "@chakra-ui/icons";
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <Flex alignItems={"center"}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              colorScheme="WhiteAlpha"
              _hover={{ bg: 'gray.400',color:"black" }}
              rightIcon={<ChevronDownIcon />}
            >
              <Text fontSize={"1.50rem"}>
              {isOpen ? "Products" : "Products"}
              </Text>
          
            </MenuButton>
            <MenuList bg={"back.900"}  color={"white"}>
              {categories.map((item) => (
                <MenuItem
                  as="a"
                  key={item._id}
                  px={2}
                  py={1}
                  bg={"back.900"}
                  _hover={{ bg: 'gray.400',color:"black" }}
                  onClick={() => handleClick(item._id)}
                >
                  {item.name}
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
