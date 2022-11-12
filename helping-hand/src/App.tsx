import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from "./components/landing/landing";
import NavBar from "./components/navbar/navbar";
import {Client} from "./models/client";
import { Helper } from './models/helper';
import ClientProfile from './components/client/clientProfile';
import HelperProfile from './components/helper/helperProfile';
// import Register from "./components/client-register/client-register";

function App() {
  const [loggedInHelper, setloggedInHelper] = useState<Helper>();
  const [authUserHelper, setAuthUserHelper] = useState<Helper>();
  const [authUserClient, setAuthUserClient] = useState<Client>();
  const [loggedInClient, setLoggedInClient] = useState<Client>();


  return (
  <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path={`/client/${loggedInClient?.id}`} element={<ClientProfile loggedInClient={loggedInClient}/>}></Route>
      <Route path={`/helper/${loggedInHelper?.id}`} element={<HelperProfile loggedInHelper={loggedInHelper}/>}></Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
