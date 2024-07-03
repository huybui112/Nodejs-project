import { Typography } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import fetchModel from '../../lib/fetchModelData';
import "./styles.css";
import React, { useState, useEffect } from "react";
import models from "../../modelData/models";
import { UserContext } from "../../context/UserContext";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams(); // Destructuring the userId from useParams
  const [user, setUser] = useState([]);
  const { username } = React.useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchModel(`http://localhost:8081/api/user/user/${userId}`); // Update the endpoint
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  if (username) {
    return (
      <>
        <div className="user-info">
          <h1>{user.first_name} {user.last_name}</h1>
        </div>
        <div className="user-info">
          Hometown: {user.location}
        </div>
        <div className="user-info">
          Description: {user.description}
        </div>
        <div className="user-info">
          Occupation: {user.occupation}
        </div>
        <Link to={`/photos/${user._id}`} className="see-pictures-link">
          See pictures
        </Link>
      </>
    );

  }
  return null
}

export default UserDetail;
