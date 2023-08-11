import React, { useState } from "react";
import { CircularProgress } from "@mui/material";

//Interface for user to input credentials and validate them with information in MongoDB
const Login = ( { setUser } ) => {
    const [username, setName] = useState("");
    const [password, setPass] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            document.getElementById('login-button').hidden = true;
            document.getElementById('loading-login-button').hidden = false;
            let response = await fetch(
            `http://localhost:5000/user/?username=${username}&password=${password}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let result = await response.json();
            if(result.statusCode === 200) {
                setUser(result.data[0]);
            }
            else {
                document.getElementById('incorrect-credentials').hidden = false;
                document.getElementById('loading-login-button').hidden = true;
                document.getElementById('login-button').hidden = false;
            }
            setPass("");
            setName("");  
        }
        catch(err) {
            document.getElementById('access-err').hidden = false;
            document.getElementById('loading-login-button').hidden = true;
            document.getElementById('login-button').hidden = false;
            setPass("");
            setName("");
            throw err;
        }
    }

  return (
    <>
        <h1>Zoo Authentication System</h1>
          
        <p class="credentials-error-msg" id="incorrect-credentials" hidden>Incorrect username or password.</p>
        <p class="credentials-error-msg" id="access-err" hidden>Cannot log you in at this time. Please try again later.</p>

        <form action="">
            <label>Username:</label>
            <input type="text" placeholder="Enter username" 
            value={username} onChange={(e) => setName(e.target.value)} />
              
            <label>Password:</label>
            <input type="password" placeholder="Enter password" 
            value={password} onChange={(e) => setPass(e.target.value)} />
            
            <button type="submit" id="login-button" onClick={handleOnSubmit}>Log In</button>
            <button type="submit" id="loading-login-button" hidden>
                <CircularProgress size="15px" color="inherit" /> Logging In
            </button>
        </form>  
    </>
  );
};
  
export default Login;