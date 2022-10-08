import React, { useState } from "react";

//Interface for user to input credentials and validate them with information in MongoDB
const Login = ( { setUser } ) => {
    const [username, setName] = useState("");
    const [password, setPass] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
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
                alert(result.message);
            }
            setPass("");
            setName("");  
        }
        catch(err) {
            alert("nothing to show");
            throw err;
            console.log(err);
        }
    }

  return (
    <>
        <h1>Zoo Authentication System</h1>
          
        <form action="">
            <label>Username:</label>
            <input type="text" placeholder="Enter username" 
            value={username} onChange={(e) => setName(e.target.value)} />
              
            <label>Password:</label>
            <input type="password" placeholder="Enter password" 
            value={password} onChange={(e) => setPass(e.target.value)} />
              
            <button type="submit" 
            onClick={handleOnSubmit}>Log In</button>
        </form>  
    </>
  );
};
  
export default Login;