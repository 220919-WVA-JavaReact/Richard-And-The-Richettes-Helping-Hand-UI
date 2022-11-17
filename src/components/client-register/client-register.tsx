import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../../models/client";
import './client-register.css';

interface IRegisterProps {
  currentClient: Client | undefined;
  setCurrentClient: (nextUser: Client) => void;
}

function ClientRegister(props: IRegisterProps) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageFirst, setErrorMessageFirst] = useState("");
  const [errorMessageLast, setErrorMessageLast] = useState("");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const setCurrentUser = props.setCurrentClient;
  const navigate = useNavigate();

  const settingUser = (user: Client) => {
    setCurrentUser(user);
  };

  const updateFirst = (e: SyntheticEvent) => {
    setFirst((e.target as HTMLInputElement).value);
  };
  const updateLast = (e: SyntheticEvent) => {
    setLast((e.target as HTMLInputElement).value);
  };
  const updateUName = (e: SyntheticEvent) => {
    setUsername((e.target as HTMLInputElement).value);
  };
  const updatePass = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };


  async function registerForClient(e: SyntheticEvent) {
    e.preventDefault();
    setFirst('');
    setLast('');
    setUsername('');
    setPassword('');
    setErrorMessageFirst('');
    setErrorMessageLast('');
    setErrorMessageUsername('');
    setErrorMessagePassword('');
    if(!first) {
      setErrorMessageFirst("Must provide a First name!")
    }
    if(!last){
      setErrorMessageLast("Must provide a Last name!")
    }
    if(!username){
      setErrorMessageUsername("Must provide a Username!")
    }
    if(!password){
      setErrorMessagePassword("Must provide a Password!")
    }
    if(first && last && username && password){
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first,
          last,
          username,
          password,
        }),
      });

      if (res.status !== 201) {
        console.log(res);
        console.log(res.status);
        setErrorMessage('Username is already taken!')
      } else {
        const userObject = await res.json();
        settingUser(userObject);
        console.log(userObject);
        console.log(userObject.id);
        document?.getElementById("close")?.click();
        return navigate(`/client/${userObject.id}`);
      }
    } catch (err) {
      setErrorMessage('Username is already taken!')
    }
  }
  }

  return (
    <div className='register-modal'>
      <p className="text-white">Client Sign up</p><br/>
      {!first ? <p className="error-message font-bold text-info" >{errorMessageFirst}</p> : ''}
      <input
        id='first-input'
        className="text-white input input-bordered input-info max-w-xs"
        placeholder="First Name"
        type="first name"
        onChange={updateFirst}
      />
      <br />
      {!last ? <p className="error-message font-bold text-info">{errorMessageLast}</p> : ''}
      <input
        id='last-input'
        className="text-white input input-bordered input-info max-w-xs"
        placeholder="Last Name"
        type="last name"
        onChange={updateLast}
      />
      <br />
      <p className='font-bold text-info'>{errorMessage}</p>
      {!username ? <p className="error-message font-bold text-info" >{errorMessageUsername}</p> : ''}
      <input
        id='user-input'
        className="text-white input input-bordered input-info max-w-xs"
        placeholder="Username"
        type="username"
        onChange={updateUName}
      />
      <br />
      {!password ? <p className="error-message font-bold text-info" >{errorMessagePassword}</p> : ''}
      <input
        id='pass-input'
        className="text-white input input-bordered input-info max-w-xs"
        placeholder="Password"
        type="password"
        onChange={updatePass}
      />
      <br />
      <a href="#" className="btn btn-secondary text-white px-12" onClick={registerForClient}>
        Register
      </a><br/>
      <a href="#" id="close" className="btn text-black px-14">
        Close
      </a>
    </div>
  );
}

export default ClientRegister;
