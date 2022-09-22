import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import "trix";
import "trix/dist/trix.css";

import { TrixEditor } from "react-trix";
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
// );
//}

function App() {
  const [value, setValue] = useState("Enter text...");
  const printContent = () => {
    console.log(value);
  }
  return (
    <div className="App">
    <div id="trix-toolbar" class="toolbar">
      <button onClick={printContent}>Spara</button>
      </div>
        <TrixEditor
          value = {value}
          onChange = {setValue}
        />
    </div>
  );
}


export default App;
