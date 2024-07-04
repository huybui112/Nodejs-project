import './App.css';

import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";
import UserList from "./components/UserList";
import Login from './components/Auth/Login';
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserPhotos from "./components/UserPhotos";
import { UserContext } from './context/UserContext';
import Profile from './components/Profile/Profile';
import Upload from './components/Upload/Upload';
import Home from './components/Home/Home';
import Register from './components/Auth/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = (props) => {
  const { username } = React.useContext(UserContext)
  return (
    <Router>
      <div>
        <TopBar />
        <div className="main-topbar-buffer" />
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {username &&
                <UserList />
              }
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                {!username &&
                  <Route path="/users" element={<UserList />} />
                }
                {!username &&
                  <Route path="/login" element={<Login />} />
                }
                {!username &&
                  <Route path="/register" element={<Register />} />
                }
                <Route path="/profile" element={<Profile />} />
                <Route path="/addPhoto" element={<Upload />} />
                {!username &&
                  <Route path="/" element={<Home />} />
                }
              </Routes>
            </Paper>
          </Grid>
        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
