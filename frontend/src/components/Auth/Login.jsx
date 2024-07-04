import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { toast } from 'react-toastify';
import { UserContext } from "../../context/UserContext";
const Login = () => {
    const [login_name, setLogin_name] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const { LoginContext } = React.useContext(UserContext)
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault()
        if (login_name === "" || password === "") {
            navigate('/login')
            toast.info('Please fill in all fields')
            return
        }
        try {

            const response = await fetch('http://localhost:8081/api/auth/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login_name: login_name,
                    password: password
                }),
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                LoginContext(data.name, data._id)
                navigate('/users')
                toast.success("Logged in successfully")
            } else {
                const errorData = await response.json();
                toast.error("Failed")
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Failed')
        }
    };
    const handleRegister = () => {
        navigate('/register')
    }
    return (
        <>
            <form>
                <h3>Login Here</h3>

                <label>Login name</label>
                <input type="text" value={login_name} onChange={(event) => setLogin_name(event.target.value)} placeholder="Login name" name="login_name" required />
                <br />
                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" name="password" required />
                {message &&
                    <i className="mes">{message}</i>
                }
                <button onClick={(event) => handleLogin(event)}>Log In</button>
            </form>
            <button className="ok" onClick={() => handleRegister()}>Register</button>
        </>
    )
}
export default Login