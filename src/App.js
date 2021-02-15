import React, { useState, useEffect, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {DataProvider, DataContext} from "./components/DataProvider";
import Header from './components/Header';


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";


const App = () => {
  return (
    <DataProvider>
      <div className="App">
        <Header/>
      </div>
    </DataProvider>
  );
};

export default App;
