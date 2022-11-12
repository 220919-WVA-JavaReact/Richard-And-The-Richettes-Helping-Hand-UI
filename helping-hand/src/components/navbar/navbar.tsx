import "./navbar.css";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Client } from "../../models/client";
import { Helper } from "../../models/helper";
import { useNavigate } from "react-router-dom";

interface INavbarProps {
  currentClient: Client | undefined;
  setClient: (nextClient: Client | undefined) => void;
  currentHelper: Helper | undefined;
  setHelper: (nextHelper: Helper | undefined) => void;
  registeredClient: Client | undefined;
  setRegClient: (nextClient: Client | undefined) => void;
  registeredHelper: Helper | undefined;
  setRegHelper: (nextHelper: Helper | undefined) => void;
}

function NavBar(props: INavbarProps) {
  const client = props?.currentClient;
  const helper = props?.currentHelper;
  const regClient = props?.registeredClient;
  const regHelper = props?.registeredHelper;
  const setClient = props.setClient;
  const setHelper = props.setHelper;
  const setRegClient = props.setRegClient;
  const setRegHelper = props.setRegHelper;
  const navigate = useNavigate();

  function logout() {
    setClient(undefined);

    setRegClient(undefined);

    setHelper(undefined);

    setRegHelper(undefined);

    return navigate("/");
  }
  console.log(props)

  const theCondition =<>
  <div className="flex-none px-10">
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-accent rounded-btn text-xl px-10 mr-5"
      >
        Login
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li>
          <a
            href="#my-modal-7"
            className="btn btn-secondary text-lg text-white"
          >
            Client Login
          </a>
          <br />
        </li>
        <li>
          <a
            href="#my-modal-8"
            className="btn btn-secondary text-lg text-white"
          >
            Helper Login
          </a>
        </li>
      </ul>
    </div>
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-accent text-xl rounded-btn px-8"
      >
        Register
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li>
          <a
            href="#my-modal-5"
            className="btn btn-secondary text-lg text-white"
          >
            Client Register
          </a>
          <br />
        </li>
        <li>
          <a
            href="#my-modal-6"
            className="btn btn-secondary text-lg text-white"
          >
            Helper Register
          </a>
        </li>
      </ul>
    </div>
  </div>
</>

let condition;
if(!client && !helper && !regClient && !regHelper){
condition = theCondition;
}else{
condition = <button onClick={logout}>Log out</button>
}

  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost font-sans text-xl text-base-100">
          Helping Hand
        </Link>
      </div>
      <>
      {condition}
      </>
    </div>
  );
}

export default NavBar;
