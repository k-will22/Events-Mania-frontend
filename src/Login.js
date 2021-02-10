import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login({setLoggedIn, setUserId}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [create, setCreate] = useState(false)
    const [loginName, setLoginName] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [loginError, setLoginError] = useState(null)
    const [createError, setCreateError] = useState(null)
    const history = useHistory()

    const newUser = {
        username: username,
        password: password,
        location: location,
        can_verify: false
    }

    const loginUser = {
        username: loginName,
        password: loginPassword
    }

    function redirect() {
        setTimeout(() => {
            setLoggedIn(true)
            history.push("/main")
        }, 500);
    }
         
    function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
          .then((r) =>
          r.json().then((data) => {
            if (r.ok) return data;
            throw data;
          })
        )
        .then((data) => {
            setUserId(data.user.id)
            redirect()
        })
        .catch((data) => {
          setCreateError(data.error);
        });
    }
               


    function handleLogin(event) {
        event.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUser),
          })
          .then((r) =>
          r.json().then((data) => {
            if (r.ok) return data;
            throw data;
          })
        )
        .then((data) => {
            setUserId(data.user.id)
            redirect()     
        })
        .catch((data) => {
          setLoginError(data.error);
        });
        }

    function handleCreate() {
        setCreate(true)
    }
    

    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
        <div style={{color: "red"}}>{loginError}</div>
        <br></br>
        <label>Username</label>&nbsp;
        <input type="text" onChange={(event) => setLoginName(event.target.value)}></input>&nbsp; &nbsp;
        <label>Password</label>&nbsp;
        <input type="password" onChange={(event) => setLoginPassword(event.target.value)}></input>&nbsp;
        <input type="submit" value="Login"></input>
        </form>
   
        <br></br>
        {create ? <h1>Create New Account</h1> : null}
        <div style={{color: "red"}}>{createError}</div>
        <br></br>
        {create ?
        <form onSubmit={handleSubmit}>
            <label>Username</label>&nbsp;
            <input 
                value={username} 
                onChange={(event) => setUsername(event.target.value)} 
                type="text"></input>
            <br></br>
            <br></br>
            <label>Password</label>&nbsp;
            <input 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"></input>
            <br></br>
            <br></br>
            <label>Location</label>&nbsp;
            <input 
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                type="text"></input>
            <br></br>
            <br></br>
            <input type="submit"></input>
        </form> : <button onClick={handleCreate}>Create New Account</button>}
        </div>
    )
}

export default Login