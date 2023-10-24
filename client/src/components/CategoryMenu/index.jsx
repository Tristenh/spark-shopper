import { useEffect, useState, useRef } from "react";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Link,
} from "@chakra-ui/react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_SUBCATEGORIES } from "../../utils/actions";
import { QUERY_CATEGORIES, QUERY_SUBCATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Dropdown from "../Dropdown";
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const [getSubCategories] = useLazyQuery(QUERY_SUBCATEGORIES);
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();
  const depthLevel = 0;

  useEffect(() => {
    //  console.log(categoryData)
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
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
         setDropdown(false);
      }
   };
   document.addEventListener("mousedown", handler);
   document.addEventListener("touchstart", handler);
   return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
   };
  }, [categoryData, loading, dispatch, dropdown]);

  const handleClick = async (id) => {
    // closeDropdown();
    const sub = await getSubCategories({
      variables: {
        category: id,
      },
    });
    dispatch({
      type: UPDATE_SUBCATEGORIES,
      subcategories: sub.data.subcategories,
    });
    // console.log(state.subcategories)
    // dispatch({
    //   type: UPDATE_CURRENT_SUBCATEGORY,
    //   subcurrentCategory: id,
    // });
  };
  const onMouseEnter = async (id) => {
    const sub = await getSubCategories({
      variables: {
        category: id,
      },
    });
    dispatch({
      type: UPDATE_SUBCATEGORIES,
      subcategories: sub.data.subcategories,
    });
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  // console.log(state.subcategories)
  return (
    <Flex alignItems={"center"}>
      <Menu>
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
            <MenuList bg={"back.900"} color={"white"}>
              {categories.map((item) => (
                // <Dropdown key={i} items={item} subcategories={state.subcategories}
                //     setDropdown={setDropdown}
                //     dropdown={dropdown}
                //     depthLevel={depthLevel}
                //   />

                <MenuItem
                  as="ul"
              position={"relative"}
                  opacity={".8"}
                  key={item._id}
                  px={2}
                  py={1}
                  bg={"back.900"}
                  onMouseEnter={() => onMouseEnter(item._id)}
                  onMouseLeave={onMouseLeave}
                  _hover={{ bg: "gray.400", color: "black" }}
                  onClick={() => setDropdown((prev) => !prev)}
                >
                  <Text>{item.name}</Text>
                  
                  {depthLevel === 0 ? (
                    <span> &raquo;</span>
                  ) : (
                    <Link to={'/'}>{item.name}</Link>
                  )}
                  
                  {state.subcategories?
                   (<Dropdown 
                    subcategories={state.subcategories}
                    setDropdown={setDropdown}
                    dropdown={dropdown}
                    depthLevel={depthLevel}
                  />):<Link to={'/'}></Link>}
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
