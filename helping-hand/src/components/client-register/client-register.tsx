import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../../models/client";

interface IRegisterProps {
  currentUser: Client | undefined;
  setCurrentUser: (nextUser: Client) => void;
}

function ClientRegister(props: IRegisterProps) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setCurrentUser = props.setCurrentUser;
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
    // e.preventDefault();
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

      if (res.status !== 201) {
        console.log(res);
        console.log(res.status);
        console.log("could not connect");
      } else {
        const userObject = await res.json();
        settingUser(userObject);
        console.log(userObject.id);
        document?.getElementById("close")?.click();
        return navigate(`/client/${userObject.id}`);
      }
    } catch (err) {
      console.log("There was an error communicating with the API.");
    }
  }

  return (
    <div>
      <p>Client Sign up</p>

      <input
        className="text-black"
        placeholder="First Name"
        type="first name"
        onChange={updateFirst}
      />
      <br />
      <br />
      <input
        className="text-black"
        placeholder="Last Name"
        type="last name"
        onChange={updateLast}
      />
      <br />
      <br />
      <input
        className="text-black"
        placeholder="Username"
        type="username"
        onChange={updateUName}
      />
      <br />
      <br />
      <input
        className="text-black"
        placeholder="Password"
        type="password"
        onChange={updatePass}
      />
      <br />
      <br />
      <a href="#" className="btn btn-secondary" onClick={registerForClient}>
        Register
      </a>
      <a href="#" id="close" className="btn">
        Close
      </a>
    </div>
  );
}

export default ClientRegister;
