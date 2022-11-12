import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from "./components/landing/landing";
import NavBar from "./components/navbar/navbar";
import {Client} from "./models/client";
import { Helper } from '../src/models/helper';
import { Request } from '../src/models/request';
import CreateRequest from './components/create-request/create-request';
// import Register from "./components/client-register/client-register";

function App() {
  const [loggedInHelper, setloggedInHelper] = useState<Helper>();
  const [authUserHelper, setAuthUserHelper] = useState<Helper>();
  const [authUserClient, setAuthUserClient] = useState<Client>();
  const [loggedInClient, setLoggedInClient] = useState<Client>();
  const [currentRequest, setCurrentRequest] = useState<Request>();


  return (
  <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path={`/client/${loggedInClient.id}/create-request`} element={<CreateRequest currentRequest={currentRequest} setCurrentRequest={setCurrentRequest} loggedInClient={loggedInClient} />}></Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
