import { SyntheticEvent, useState } from "react";
import { Helper } from "../../models/helper";

interface ILoginProps {
  currentUser: Helper | undefined;
  setCurrentUser: (nextUser: Helper) => void;
}

export default function HelperLogin(props: ILoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let updateUName = (e: SyntheticEvent) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  let updatePass = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  let helperLogin = async (e: SyntheticEvent) => {
    // e.preventDefault();
    if (!username || !password) {
      console.log("Please provide a username and a password");
    } else {
      try {
        let response = await fetch("http://localhost:8080/helper-auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        if (response.status === 200) {
            let token = response.headers.get('Authorization');
            console.log(response);
            if(token){
                sessionStorage.setItem('token', token);
            }
            const userObject = await response.json();
            props.setCurrentUser(userObject);
            console.log(userObject);
        } else {
          setErrorMessage(
            `Could not validate credentials : ERROR CODE ${response.status}`
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
      <div >

      <p>Helper Login</p>

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
      <a href={`/helper/${props?.currentUser?.id}`} className="btn btn-secondary" onClick={helperLogin}>
        Login
      </a>
      <a href="#" className="btn">Close</a>
      </div>
  );
}
