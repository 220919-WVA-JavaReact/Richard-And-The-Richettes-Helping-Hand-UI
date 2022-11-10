import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from "./components/landing/landing";
import NavBar from "./components/navbar/navbar";
import {Client} from "./models/client";
import {Helper} from "./models/helper";
import {Bid} from "./models/bid";
import {Request} from "./models/request";
import CreateBid from "./components/create-bid/create-bid";


// import Register from "./components/client-register/client-register";

function App() {
  const [loggedInHelper, setloggedInHelper] = useState<Helper>();
  const [authUserHelper, setAuthUserHelper] = useState<Helper>();
  const [authUserClient, setAuthUserClient] = useState<Client>();
  const [loggedInClient, setLoggedInClient] = useState<Client>();
  const [currentRequest, setCurrentRequest] = useState<Request>();
  const [currentBid, setCurrentBid] = useState<Bid>();
  


  return (
  <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/bids" element={<CreateBid currentBid={currentBid} setCurrentBid={setCurrentBid} loggedInHelper={loggedInHelper} currentRequest={currentRequest}/>}></Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
