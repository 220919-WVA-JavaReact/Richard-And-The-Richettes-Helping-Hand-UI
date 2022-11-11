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

    <div className="flex-none px-10">
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary rounded-btn px-10 mr-5">Login</label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li>
                    <a href="#my-modal-7" className="btn btn-secondary text-black">Client Login</a><br/>
                </li>
                <li>
                    <a href="#my-modal-8" className='btn btn-secondary text-black'>Helper Login</a>
                </li>
            </ul>
            </div>
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-primary rounded-btn px-8">Register</label>
        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
            <li>
                <a href="#my-modal-5" className="btn btn-secondary text-black">Client Register</a><br/>
            </li>
            <li>
                <a href="#my-modal-6" className="btn btn-secondary text-black">Helper Register</a>
            </li>
        </ul>
        </div>
    </div>
    </div>
  );
}

export default NavBar;
