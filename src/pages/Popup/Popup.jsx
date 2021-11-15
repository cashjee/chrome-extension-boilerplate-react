import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import { ChakraProvider } from "@chakra-ui/react"

import './Popup.css';

const Popup = () => {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            hi there testing if github is accepting my identity
          </a>
        </header>
      </div>
    </ChakraProvider>
  );
};

export default Popup;
