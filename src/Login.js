import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")

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
            setUsername("")
            setPassword("")
            setLocation("")      
    }
    

    return (
        <div>
        <h1>Login</h1>
        <h1>Create New Account</h1>
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
        </form>
        </div>
    )
}

export default Login