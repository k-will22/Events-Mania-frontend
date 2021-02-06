import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login({setLoggedIn}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [create, setCreate] = useState(false)
    const history = useHistory()

    const newUser = {
        username: username,
        password: password,
        location: location,
        can_verify: true
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((r) => r.json())
            .then(data => {
                console.log(data)
            })
            setLoggedIn(true)
            history.push("/main")
    }

    function handleLogin() {
        setLoggedIn(true)
        history.push("/main")
    }

    function handleCreate() {
        setCreate(true)
    }
    

    return (
        <div>
        <h1>Login</h1>
        <label>Username</label>&nbsp;
        <input type="text"></input>&nbsp; &nbsp;
        <label>Password</label>&nbsp;
        <input type="password"></input>&nbsp;
        <input type="submit" value="Login" onClick={handleLogin}></input>
        <br></br>
        <br></br>
        {create ? <h1>Create New Account</h1> : null}
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