import React, { useState, useEffect } from "react";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import fetchModel from '../../lib/fetchModelData';
import { UserContext } from "../../context/UserContext";
import "./styles.css";
/**
 * Define UserList, a React component of Project 4.
 */
const UserList = () => {
  const { username, userIdLogin } = React.useContext(UserContext)
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await fetchModel('http://localhost:8081/api/user/user/list');
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  if (username) {
    return (
      <List>
        {users && users.map((item) => (
          item._id !== userIdLogin && (
            <React.Fragment key={item._id}>
              <ListItem>
                <Link className="link" to={`/users/${item._id}`}>{item.last_name}</Link>
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        ))}
      </List>
    );
  }
  return null
};

export default UserList;
