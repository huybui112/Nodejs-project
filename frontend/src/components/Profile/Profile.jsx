import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
    const { username, userIdLogin } = React.useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/users/${userIdLogin}`)
    });
}

export default Profile