import "./navbar.css";

import { Link } from "react-router-dom";
import ClientRegister from '../client-register/client-register';
import HelperRegister from '../helper-register/helper-register';
import ClientLogin from "../client-login/client-login";
import React, { useState } from 'react';
import {Client} from "../../models/client";
import {Helper} from '../../models/helper';

function NavBar() {
    const [authUserClient, setAuthUserClient] = useState<Client>();
    const [authUserHelper, setAuthUserHelper] = useState<Helper>();
    const [loggedInClient, setLoggedInClient] = useState<Client>();



  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-black">
          Helping Hand
        </Link>
      </div>


      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
          <a href="#my-modal-5" className="btn btn-secondary text-black">Client Register</a>
            <div className="modal" id="my-modal-5">
            <div className="modal-box max-w-[15%]">
                <div className="modal-action">
                    <ClientRegister currentUser={authUserClient} setCurrentUser={setAuthUserClient}/>
                </div>
            </div>
            </div>
          </li>
          <li>
          <a href="#my-modal-6" className="btn btn-secondary text-black">Helper Register</a>
            <div className="modal" id="my-modal-6">
            <div className="modal-box max-w-[15%]">
                <div className="modal-action">
                    <HelperRegister currentUser={authUserHelper} setCurrentUser={setAuthUserHelper}/>
                </div>
            </div>
            </div>
          </li>
          <li>
            <a href="#my-modal-7" className="btn">Client Login</a>
            <div className="modal" id="my-modal-7">
                <div className="modal-box max-w-[15%]">
            {/* <input type="checkbox" id="my-modal-7" className="modal-toggle" /> */}

                    <ClientLogin currentUser={loggedInClient} setCurrentUser={setLoggedInClient}/>
                </div>
            </div>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost rounded-btn">Dropdown</label>
        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
            
        </ul>
      </div>
      </div>
    </div>
  );
}

export default NavBar;