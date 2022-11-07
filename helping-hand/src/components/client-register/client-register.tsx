import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { Client } from "../../models/client";
import HHAPI from "../../utils/utility";

interface IRegisterProps {
  currentUser: Client | undefined;
  setCurrentUser: (nextUser: Client) => void;
}

function Register(props: IRegisterProps) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  async function register(e: SyntheticEvent) {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/client", {
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
      console.log(res)

      if (res.status !== 201) {
        console.log(res);
        console.log(res.status);
        console.log("could not connect");
      } else {
        const result = await res.json();
        return result;
      }
    } catch (err) {
      console.log("There was an error communicating with the API.");
    }
  }

  // const register = async (e: SyntheticEvent) => {
  //     e.preventDefault();
  //     HHAPI('/users', 'POST');
  // }
  return props.currentUser ? (
    <Navigate to="/dashboard" />
  ) : (
    <div>
      <p>Client Sign up</p>

      <input
        placeholder="First Name"
        type="first name"
        onChange={updateFirst}
      />
      <input placeholder="Last Name" type="last name" onChange={updateLast} />
      <input placeholder="Username" type="username" onChange={updateUName} />
      <input placeholder="Password" type="password" onChange={updatePass} />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
