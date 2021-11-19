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

  const Staticrow = ({item,time, rowIndex, handleOnRowClick})=>{
  
  
    return (
        <Tr cursor="pointer" onClick={()=>handleOnRowClick(item)}>
            <Td>{item}</Td>
            <Td isNumeric>{time}</Td>
        </Tr>
    );
  }

  export default Staticrow;