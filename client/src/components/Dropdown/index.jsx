import { useState, useEffect, useRef } from "react";
// ...

import { Box, MenuItem, Link } from "@chakra-ui/react";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_SUBCATEGORIES,
  UPDATE_CURRENT_SUBCATEGORY,
} from "../../utils/actions";
import { useLazyQuery } from "@apollo/client";

import { QUERY_SUBCATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

const styleDropdownSubmenu = {
  position: "absolute",
  left: "100%",
  top: "-7px",
};
export default function Dropdown({ depthLevel, dropdown }) {
  const [state, dispatch] = useStoreContext();
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 0 ? styleDropdownSubmenu : "";
  const showDropdown = dropdown ? { display: "block" } : "";
  const [getSubCategories, { loading }] = useLazyQuery(QUERY_SUBCATEGORIES);

  const { currentCategory } = state;

  useEffect(() => {
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
        sub.data.subcategories.forEach((category) => {
          idbPromise("subcategories", "put", category);
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

  const handleItemClick = async (id) => {
    dispatch({
      type: UPDATE_CURRENT_SUBCATEGORY,
      currentSubCategory: id,
    });
  };

  return (
    // <Flex alignItems={"center"}>
    //   <Menu >
    //     {({ isOpen }) => (
    //       <>
    //         <MenuButton
    //           isActive={isOpen}
    //           as={Button}
    //           key={key}
    //           w={"100%"}
    //           colorScheme="WhiteAlpha"
    //           _hover={{ bg: "gray.400", color: "black" }}
    //           onClick={() => handleClick(items._id)}
    //           rightIcon={<ChevronDownIcon />}
    //         >
    //           <Text fontSize={"1xl"}>
    //             {isOpen ? items.name : items.name}
    //           </Text>
    //         </MenuButton>
    //         <MenuList

    //           display="none"
    //           {...dropdownClass}
    //           {...showDropdown}
    //           bg={"back.900"}
    //           color={"white"}
    //         >
    //           {subcategories.map((item) => (
    //             <MenuItem
    //             as="li"
    //             borderRadius={""}
    //               key={item._id}
    //               px={2}
    //               py={1}
    //               bg={"back.900"}
    //               _hover={{ bg: "gray.400", color: "black" }}
    //               onClick={() => handleItemClick(item._id)}

    //             >
    //                 <Link  style={{ textDecoration: 'none' }} to={'/'}> {item.name}</Link>

    //             </MenuItem>
    //           ))}
    //         </MenuList>
    //       </>
    //     )}
    //   </Menu>
    // </Flex>
    <Box
      as="ul"
      position="absolute"
      right={0}
      left="auto"
      //   transform={"translateX(-50%)"}
      //   transition={"200ms"}
      //   transitionDelay={"200ms"}

      fontSize="0.875rem"
      zIndex={999}
      minWidth="10rem"
      padding="0.5rem 0"
      listStyleType="none"
      bgColor={"black"}
      borderRadius="0.5rem"
      display="none"
      {...dropdownClass}
      {...showDropdown}
      //  className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}
    >
      {state.subcategories.map((item) => (
        <MenuItem
          as="li"
          key={item._id}
          px={2}
          py={1}
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
