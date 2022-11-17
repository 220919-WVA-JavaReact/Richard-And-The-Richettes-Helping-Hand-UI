import { SyntheticEvent, useState } from "react";
import { Helper } from "../../models/helper";
import { useNavigate } from "react-router-dom";

interface ILoginProps {
  currentHelper: Helper | undefined;
  setCurrentHelper: (nextUser: Helper) => void;
}

export default function HelperLogin(props: ILoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setCurrentUser = props.setCurrentHelper;
  const navigate = useNavigate();

  const settingUser = (user: Helper) => {
    setCurrentUser(user);
  };

  let updateUName = (e: SyntheticEvent) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  let updatePass = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };


  let helperLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    setErrorMessageUsername('');
    setErrorMessagePassword('');
    if (!username) {
      setErrorMessageUsername("Please provide a Username!");
    }
    if(!password) {
      setErrorMessagePassword("Please provide a Password!");
    }
    if(username && password){
      try {
        let response = await fetch("http://localhost:8080/helper-auth", {
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
          document?.getElementById("close")?.click();
          return navigate(`/helper/${userObject.id}`);
        } else {
          setErrorMessage(
            'Invalid USERNAME or PASSWORD!'
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='login-modal text-white'>
      <p className='text-center'>Helper Login</p><br/>
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
      <a href="#" className="btn btn-secondary text-white px-12" onClick={helperLogin}>
        Login
      </a>
      <br/>
      <a href="#" className="btn px-12">
        Close
      </a>
    </div>
  );
}
