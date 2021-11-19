import React, { useEffect, useState } from 'react';
import { ChakraProvider, Spinner } from "@chakra-ui/react"
import { getUserData, userEmail } from "../Background";
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
import Staticrow from './Staticrow';
import Linkrow from './Linkrow';

const Popup = () => {
  const [history, setHistory] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLinksTableVisible, setIsLinksTableVisible] = useState(false);
  const [clickedTopic, setClickedTopic] = useState("")

  useEffect(()=>{
    async function fetchData() {
      let h = await getUserData();
      h = await h.json();
      // console.log("\n\nHistory from useEffect....", h, "\n\n");
      setHistory(h);
    }
    fetchData();
    
  }, []);

  useEffect(()=>{
    function formatData(raw) {
      const subjects = [];
      raw.forEach(function(item, index, array){
        if (item.topic !== '' && item.topic !== 'not found' && item.time && array[index + 1].time) {
          const timeSpent = Math.abs(parseInt(Date.parse(array[index+1].time.valueOf()) - Date.parse(item.time.valueOf())))
          const mins = Math.floor((timeSpent/1000)/60)
          if (mins <= 8) {
            const formatted = {"topic": item.topic, "time": mins, "url":item.url}
            console.log(formatted)
            subjects.push(formatted);
          }

        }
      })
      console.log(subjects)
      var result = [];
      subjects.reduce(function(res, value) {
        if (!res[value.topic]) {
          res[value.topic] = { topic: value.topic, time: 0 };
          result.push(res[value.topic])
        }
        res[value.topic].time += value.time;
        return res;
      }, {});

      setSubjects(result)
    } 
    formatData(history)
    


  }, [history]);

  const handleOnRowClick = (topic) => {
    setIsLinksTableVisible(true);
    setClickedTopic(topic)
  }
  const handleOnLinkClick = (link) => {
    const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null

  }

  return (
      <ChakraProvider>
        <div className="App">
          {
            history.length
              ?
                subjects.length
                  ?
                    isLinksTableVisible
                      ?
                        <Table variant="simple">
                          <TableCaption>Links Table</TableCaption>
                          <Thead>
                            <span style={{cursor: "pointer", marginTop: 20, marginBottom: 20, marginLeft: 20 }} onClick={()=>setIsLinksTableVisible(false)}>Back</span>
                            <Tr>
                              <Th>Link</Th>
                            </Tr>
                          </Thead>
                        
                          <Tbody>
                            {
                              history.filter(topic => topic.topic == clickedTopic).map((filteredTopic, index)=>(
                                <Linkrow
                                    handleOnLinkClick={handleOnLinkClick}
                                    rowIndex={index}
                                    item={filteredTopic.url}
                                  />
                              ))
                            }
                          </Tbody>
                        </Table>
                      :
                        <Table variant="simple">
                          <TableCaption>Your online learning</TableCaption>
                          <Thead>
                            <Tr>
                              <Th>Subject</Th>
                              <Th isNumeric>Time Spent (mins)</Th>
                            </Tr>
                          </Thead>
                        
                          <Tbody>
                            {
                              subjects.map((topic, index)=>(
                                <Staticrow
                                    handleOnRowClick={handleOnRowClick}
                                    rowIndex={index}
                                    item={topic.topic}
                                    time={topic.time}
                                  />
                              ))
                            }
                          </Tbody>
                        </Table>
                  :
                      <Table variant="simple">
                        <TableCaption>Your Online learning - something went wrong</TableCaption>
                        
                      </Table>
              :
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100%"}}>
                  <Spinner/>
                </div>
          }
        </div>
      </ChakraProvider>
  );
};

export default Popup;
