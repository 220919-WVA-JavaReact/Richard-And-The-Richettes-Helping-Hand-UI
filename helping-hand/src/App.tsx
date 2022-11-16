import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/landing/landing";
import NavBar from "./components/navbar/navbar";
import { Request } from './models/request';
import { Client } from "./models/client";
import { Helper } from "./models/helper";
import { Bid } from "./models/bid";
import CreateBid from "./components/create-bid/create-bid";
import UpdateAmount from "./components/update-amount/update-amount";
import UpdateStatus from "./components/update-bid-status/update-bid-status";
import ClientProfile from './components/client/clientProfile';
import HelperProfile from './components/helper/helperProfile';
import CreateRequest from './components/create-request/create-request';
import HelperLogin from "./components/helper-login/helper-login";
import HelperRegister from "./components/helper-register/helper-register";
import ClientRegister from "./components/client-register/client-register";
import ClientLogin from "./components/client-login/client-login";
import ClientView from './components/client-view/client-view';
import HelperViewRequests from './components/helper-view/helper-view';

function App() {
  const [loggedInHelper, setloggedInHelper] = useState<Helper>();
  const [loggedInClient, setLoggedInClient] = useState<Client>();
  const [currentRequest, setCurrentRequest] = useState<Request>();
  const [currentBid, setCurrentBid] = useState<Bid>();

  return (
    <BrowserRouter>
      <NavBar
        currentClient={loggedInClient}
        setClient={setLoggedInClient}
        currentHelper={loggedInHelper}
        setHelper={setloggedInHelper}
      />
      <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path={`/client/${loggedInClient?.id}`} element={<ClientProfile loggedInClient={loggedInClient}/>}></Route>
      <Route path={`/helper/${loggedInHelper?.id}`} element={<HelperProfile loggedInHelper={loggedInHelper}/>}></Route>
      <Route path={`/client/${loggedInClient?.id}/create-request`} element={<CreateRequest loggedInClient={loggedInClient} />}></Route>
      <Route path={`/client/${loggedInClient?.id}/requests`} element={<ClientView loggedInClient={loggedInClient} />}></Route>
      <Route path={`/helper/request`} element={<HelperViewRequests loggedInHelper={loggedInHelper} />}></Route>
      <Route path={`/helper/${loggedInHelper?.id}`} element={<CreateBid currentBid={currentBid} setCurrentBid={setCurrentBid} loggedInHelper={loggedInHelper} currentRequest={currentRequest}/>}></Route>
      <Route path={`/helper/${loggedInHelper?.id}/bid/${currentBid?.id}`} element={<UpdateAmount currentBid={currentBid} setCurrentBid={setCurrentBid} loggedInHelper={loggedInHelper} currentRequest={currentRequest}/>}></Route>
      {/* <Route path="/bids" element={<UpdateStatus currentBid={currentBid} setCurrentBid={setCurrentBid} loggedInClient={loggedInClient} currentRequest={currentRequest}/>}></Route> */}
      </Routes>
      <div className="modal" id="my-modal-6">
        <div className="modal-box max-w-[15%]">
            <HelperRegister
              currentHelper={loggedInHelper}
              setCurrentHelper={setloggedInHelper}
            />
        </div>
      </div>

      <div className="modal" id="my-modal-5">
        <div className="modal-box max-w-[17%]">
            <ClientRegister
              currentClient={loggedInClient}
              setCurrentClient={setLoggedInClient}
            />
        </div>
      </div>

      <div className="modal" id="my-modal-7">
        <div className="modal-box max-w-[19%]">
          <ClientLogin
            currentClient={loggedInClient}
            setCurrentClient={setLoggedInClient}
          />
        </div>
      </div>

      <div className="modal" id="my-modal-8">
        <div className="modal-box max-w-[19%]">
          <HelperLogin
            currentHelper={loggedInHelper}
            setCurrentHelper={setloggedInHelper}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
