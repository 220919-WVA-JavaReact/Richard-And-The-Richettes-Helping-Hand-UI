import React, { SyntheticEvent, useState } from "react";
import { Helper } from "../../models/helper";
import { useNavigate } from "react-router-dom";

interface IRegisterProps {
  currentHelper: Helper | undefined;
  setCurrentHelper: (nextUser: Helper) => void;
}

function HelperRegister(props: IRegisterProps) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageFirst, setErrorMessageFirst] = useState("");
  const [errorMessageLast, setErrorMessageLast] = useState("");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const setCurrentUser = props.setCurrentHelper;
  const navigate = useNavigate();

  const settingUser = (user: Helper) => {
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

  async function registerForHelper(e: SyntheticEvent) {
    e.preventDefault();
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
      let res = await fetch("http://localhost:8080/helper", {
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
        console.log("could not connect");
      } else {
        const userObject = await res.json();
        settingUser(userObject);
        console.log(userObject.id);
        document?.getElementById("close")?.click();
        return navigate(`/helper/${userObject.id}`);
      }
    } catch (err) {
      console.log("There was an error communicating with the API.");
    }
  }
  }

  return (
    <div className='register-modal'>
      <p className="text-white">Helper Sign up</p><br/>
      {!first ? <p className="error-message font-bold text-info">{errorMessageFirst}</p> : ''}
      <input
        className="text-black"
        placeholder="First Name"
        type="first name"
        onChange={updateFirst}
      />
      <br />
      {!last ? <p className="error-message font-bold text-info">{errorMessageLast}</p> : ''}
      <input
        className="text-black"
        placeholder="Last Name"
        type="last name"
        onChange={updateLast}
      />
      <br />
      {!username ? <p className="error-message font-bold text-info">{errorMessageUsername}</p> : ''}
      <input
        className="text-black"
        placeholder="Username"
        type="username"
        onChange={updateUName}
      />
      <br />
      {!password ? <p className="error-message font-bold text-info">{errorMessagePassword}</p> : ''}
      <input
        className="text-black"
        placeholder="Password"
        type="password"
        onChange={updatePass}
      />
      <br />
      <a href="#" className="btn btn-secondary text-white px-12" onClick={registerForHelper}>
        Register
      </a><br/>
      <a href="#" className="btn text-black px-14">
        Close
      </a>
    </div>
  );
}

export default HelperRegister;
