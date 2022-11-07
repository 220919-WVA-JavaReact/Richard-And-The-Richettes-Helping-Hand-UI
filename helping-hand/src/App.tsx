import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from "./components/landing/landing";
import NavBar from "./components/navbar/navbar";
import {Client} from "./models/client";
import Register from "./components/client-register/client-register";

function App() {
  const [authUser, setAuthUser] = useState<Client>();


  return (
  <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/" element={<Landing />}></Route>
        <Route path="/register" element={<Register currentUser={authUser} setCurrentUser={setAuthUser}/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
