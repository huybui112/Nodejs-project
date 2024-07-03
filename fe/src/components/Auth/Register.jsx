import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const Register = () => {
    const [last_name, setLast_name] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [occupation, setOccupation] = useState("")
    const [login_name, setLogin_name] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login')
    }
    const handleRegister = async (event) => {
        event.preventDefault()
        if (last_name === "" || location === "" || description === "" || occupation === "" || login_name === "" || password === "") {
            navigate('/register')
            toast.info('Please fill in all fields')
            return
        }
        try {
            const response = await fetch('http://localhost:8081/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    last_name,
                    location,
                    description,
                    occupation,
                    login_name,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                toast.success('Register successfully')
                navigate('/login')
            } else {
                console.error('Failed to register user');
                toast.error("Failed")

            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed")
        }
    };

    return (
        <>
            <form>
                <h3>Register Here</h3>
                <label>Last name</label>
                <input type="text" value={last_name} onChange={(event) => setLast_name(event.target.value)} placeholder="Last name" name="last_name" required />
                <br />
                <label>Location</label>
                <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" name="location" required />
                <br />
                <label>Description</label>
                <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description" name="description" required />
                <br />
                <label>Occupation</label>
                <input type="text" value={occupation} onChange={(event) => setOccupation(event.target.value)} placeholder="Occupation" name="occupation" required />
                <br />
                <label>Login name</label>
                <input type="text" value={login_name} onChange={(event) => setLogin_name(event.target.value)} placeholder="Login name" name="login_name" required />
                <br />
                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" name="password" required />
                {message &&
                    <i className="mes">{message}</i>
                }
                <button onClick={(event) => handleRegister(event)}>Register</button>
            </form>
            <button onClick={() => handleClick()}>You've already have account. Login now!</button>
        </>
    )
}

export default Register