import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helper } from "../../models/helper";
import HHAPI from "../../utils/utility";
import { Link } from "react-router-dom";

interface IRegisterProps {
  currentUser: Helper | undefined;
  setCurrentUser: (nextUser: Helper) => void;
}

function HelperRegister(props: IRegisterProps) {
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

  async function registerForHelper(e: SyntheticEvent) {
    // e.preventDefault();
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
        props.setCurrentUser(userObject);
        console.log("hi");
        console.log(props?.currentUser?.id);
      }
    } catch (err) {
      console.log("There was an error communicating with the API.");
    }
    console.log(props?.currentUser?.id);
  }

  return (
    <div>
      <p>Helper Sign up</p>

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
      <a
        href={`/helper/${props?.currentUser?.id}`}
        className="btn btn-secondary"
        onClick={registerForHelper}
      >
        Register
      </a>
      <a href="#" className="btn">
        Close
      </a>
    </div>
  );
}

export default HelperRegister;
