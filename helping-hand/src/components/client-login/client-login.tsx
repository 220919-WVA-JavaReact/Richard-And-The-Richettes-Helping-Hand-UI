import { SyntheticEvent, useState } from "react";
import { Client } from "../../models/client";
import { useNavigate } from "react-router-dom";

interface ILoginProps {
  currentClient: Client | undefined;
  setCurrentClient: (nextUser: Client) => void;
}

export default function ClientLogin(props: ILoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    if (!username || !password) {
      console.log("Please provide a username and a password");
    } else {
      try {
        let response = await fetch("http://localhost:8080/client-auth", {
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
          document?.getElementById('close')?.click();
          return navigate(`/client/${userObject.id}`);
        } else {
          setErrorMessage(
            `Could not validate credentials : ERROR CODE ${response.status}`
          );
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <p>Client Login</p>

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
      <a href="#" className="btn btn-secondary" onClick={clientLogin}>
        Login
      </a>
      <a href="#" id='close' className="btn">
        Close
      </a>
    </div>
  );
}

// export default ClientLogin;
