import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import { ChakraProvider } from "@chakra-ui/react"
import './Popup.css';
import { getUserData, userEmail } from "../Background";


const Popup = () => {
  const [history, setHistory] = useState([]);
  
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
      raw.forEach(function(item, index, array){
        console.log("hi")
        console.log(item, index)
      })
    } 
    formatData(history)


  }, [history]);

  return (
      <ChakraProvider>
        <div className="App">
          {
            history.length
              ?
                <ul>
                  {history.map(h=>(
                    <li>{h.topic}</li>
                  ))}
                </ul>
              :
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
              
              
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    second test
                  </a>
                </header>
          }
        </div>
      </ChakraProvider>
  );
};

export default Popup;
