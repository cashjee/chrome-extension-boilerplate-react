import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

  const Linkrow = ({item, rowIndex, handleOnLinkClick})=>{
  
  
    return (
        <Tr cursor="pointer" onClick={()=>handleOnLinkClick(item)}>
            <Td>{item}</Td>
        </Tr>
    );
  }

  export default Linkrow;