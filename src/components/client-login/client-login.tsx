import { SyntheticEvent, useState } from "react";
import { Client } from "../../models/client";
import { useNavigate } from "react-router-dom";
import "./client-login.css";

interface ILoginProps {
  currentClient: Client | undefined;
  setCurrentClient: (nextUser: Client) => void;
}

export default function ClientLogin(props: ILoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setCurrentUser = props.setCurrentClient;
  const navigate = useNavigate();

  const settingUser = (user: Client) => {
    setCurrentUser(user);
  };

  let updateUName = (e: SyntheticEvent) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  let updatePass = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };



  let clientLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    setErrorMessageUsername("");
    setErrorMessagePassword("");
    if (!username) {
      setErrorMessageUsername("Please provide a Username!");
    }
    if (!password) {
      setErrorMessagePassword("Please provide a Password!");
    }
    if (username && password) {
      try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/client-auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        if (response.status === 200) {
          let token = response.headers.get("Authorization");
          console.log(response);
          if (token) {
            sessionStorage.setItem("token", token);
          }
          const userObject = await response.json();
          settingUser(userObject);
          console.log(userObject);
          console.log(userObject.id);
          document?.getElementById("close")?.click();
          return navigate(`/client/${userObject.id}`);
        } else {
          setErrorMessage("Invalid USERNAME or PASSWORD!");
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login-modal text-white">
      <p className="text-center text-xl">Client Login</p>
      <br />
      <p className="font-bold text-info">{errorMessage}</p>
      {!username ? (
        <p className="error-message font-bold text-info">
          {errorMessageUsername}
        </p>
      ) : (
        ""
      )}
      <input
        id="user-input"
        className="text-white input input-bordered input-info max-w-xs"
        placeholder="Username"
        type="username"
        onChange={updateUName}
      />
      <br />
      {!password ? (
        <p className="error-message font-bold text-info">
          {errorMessagePassword}
        </p>
      ) : (
        ""
      )}
      <input
        id="pass-input"
        className="text-white input input-bordered input-info max-w-xs"
        placeholder="Password"
        type="password"
        onChange={updatePass}
      />
      <br />
      <a
        href="#"
        className="btn btn-secondary text-white px-12"
        onClick={clientLogin}
      >
        Login
      </a>
      <br />
      <a href="#" id="close" className="btn text-black px-12">
        Close
      </a>
    </div>
  );
}

// export default ClientLogin;
