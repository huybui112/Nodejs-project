import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { toast } from 'react-toastify';
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const { username, comment } = React.useContext(UserContext)
  const { LogoutContext } = React.useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/auth/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        LogoutContext()
        navigate('/login'); // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng xuất
        toast.success('Logged out successfully')
      } else {
        const errorData = await response.json();
        toast.error('Failed')
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed')
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <div className="left-section">
          <Link to='/users' className="link">User List</Link>
        </div>
        {username &&
          <div className="middle-section">
            <Link to='/addPhoto' className="link">Add Photo</Link>
          </div>
        }
        {username &&
          <div className="middle-section">
            <Link to='/profile' className="link">Hello {username}</Link>
          </div>
        }
        {
          !username &&
          <div className="right-section">
            <Link to='/login' className="link">Login</Link>
          </div>
        }
        {
          username &&
          <div className="right-section">
            <button onClick={() => handleLogout()} className="link">Logout</button>
          </div>
        }

      </Toolbar>
    </AppBar>


  );
}

export default TopBar;
