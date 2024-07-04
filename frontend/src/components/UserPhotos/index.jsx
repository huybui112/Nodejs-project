import { Typography } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import models from "../../modelData/models";
import fetchModel from '../../lib/fetchModelData';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Photo from "../Photo/Photo";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhoto] = useState([]);
  const navigate = useNavigate()
  const { username, userIdLogin } = React.useContext(UserContext)
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const userPhoto = await fetchModel(`http://localhost:8081/api/photo/photosOfUserTest/${userId}`);
        setPhoto(userPhoto);
      } catch (error) {
        console.error('Error fetching photo data:', error);
      }
    };

    fetchPhoto();
  }, [userId]);

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  const handleComment = async (photo_id, comment) => {
    try {
      const response = await fetch(`http://localhost:8081/api/cmt/commentsOfPhoto/${photo_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userIdLogin,
          comment: comment
        }),
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        const updatedPhotos = photos.map(photo => {
          if (photo._id === photo_id) {
            return { ...photo, comments: [...photo.comments, data] };
          }
          return photo;
        });
        setPhoto(updatedPhotos);
      } else {
        const errorData = await response.json();
        alert('Add comment failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error comment:', error);
      alert('Error.Please try again later.');
    }
  };

  const handleDeleteComment = async (photo_id, comment_id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/cmt/commentsOfPhoto/${photo_id}/${comment_id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        const updatedPhotos = photos.map(photo => {
          if (photo._id === photo_id) {
            // Xóa comment khỏi mảng comments của photo
            const updatedComments = photo.comments.filter(comment => comment._id !== comment_id);
            return { ...photo, comments: updatedComments };
          }
          return photo;
        });
        setPhoto(updatedPhotos);
      } else {
        const errorData = await response.json();
        alert('Delete comment failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Error. Please try again later.');
    }
  };


  if (username) {
    return (
      <div className="photo-container">
        {console.log(photos)}
        {photos && photos.map((photo, index) => (
          <Photo photo={photo} handleComment={handleComment} handleDeleteComment={handleDeleteComment} />
        ))}
        {photos.length === 0 &&
          <h1>No Photos</h1>
        }
      </div>
    );
  }
  return null

}

export default UserPhotos;