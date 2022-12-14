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
import ClientProfile from './components/client/clientProfile';
import HelperProfile from './components/helper/helperProfile';
import CreateRequest from './components/create-request/create-request';
import HelperLogin from "./components/helper-login/helper-login";
import HelperRegister from "./components/helper-register/helper-register";
import ClientRegister from "./components/client-register/client-register";
import ClientLogin from "./components/client-login/client-login";
import UpdateRequest from "./components/create-request/update-request";
import ClientViewBids from "./components/client-view/client-view-bids";
import UpdateStatus from "./components/update-bid-status/update-bid-status";


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
      <Route path={`/client/${loggedInClient?.id}`} element={<ClientProfile loggedInClient={loggedInClient} setCurrentRequest={setCurrentRequest}/>}></Route>
      <Route path={`/helper/${loggedInHelper?.id}`} element={<HelperProfile loggedInHelper={loggedInHelper} setCurrentRequest={setCurrentRequest} setCurrentBid={setCurrentBid}/>}></Route>
      <Route path={`/client/${loggedInClient?.id}/create-request`} element={<CreateRequest loggedInClient={loggedInClient} />}></Route>
      <Route path={`/request/${currentRequest?.id}/new-bid`} element={<CreateBid currentBid={currentBid} setCurrentBid={setCurrentBid} loggedInHelper={loggedInHelper} currentRequest={currentRequest}/>}></Route>
      {/* <Route path={`/helper/${loggedInHelper?.id}/bid/${currentBid?.id}`} element={<UpdateAmount currentBid={currentBid} setCurrentBid={setCurrentBid} loggedInHelper={loggedInHelper} currentRequest={currentRequest}/>}></Route> */}
      <Route path={`/client/${loggedInClient?.id}/request/${currentRequest?.id}/update-request`} element={<UpdateRequest loggedInClient={loggedInClient} currentRequest={currentRequest} setCurrentRequest={setCurrentRequest} />}></Route>
      <Route path={`/helper/${loggedInHelper?.id}/bid/${currentBid?.id}/update-bid`} element={<UpdateAmount currentBid={currentBid} setCurrentBid={setCurrentBid} loggedInHelper={loggedInHelper} currentRequest={currentRequest}/>}></Route>
      <Route path={`/client/${loggedInClient?.id}/request/${currentRequest?.id}/bids`} element={<ClientViewBids loggedInClient={loggedInClient} currentRequest={currentRequest} setCurrentBid={setCurrentBid}/>}></Route>
      <Route path={`/client/${loggedInClient?.id}/request/${currentRequest?.id}/bid/${currentBid?.id}/update-bid`} element={<UpdateStatus loggedInClient={loggedInClient} currentRequest={currentRequest} setCurrentBid={setCurrentBid} currentBid={currentBid}/>}></Route>
      </Routes>
      <div className="modal" id="my-modal-6">
        <div className="modal-box max-w-[18%]">
            <HelperRegister
              currentHelper={loggedInHelper}
              setCurrentHelper={setloggedInHelper}
            />
        </div>
      </div>

      <div className="modal" id="my-modal-5">
        <div className="modal-box max-w-[18%]">
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
