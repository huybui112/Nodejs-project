import "./styles.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import models from "../../modelData/models";
import fetchModel from '../../lib/fetchModelData';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
const Photo = (props) => {
    const { CommentContext } = React.useContext(UserContext)
    const [comment, setComment] = useState("");
    const [users, setUsers] = useState({});
    const [comments, setComments] = useState([]);
    const { username, userIdLogin } = React.useContext(UserContext)
    const photo = props.photo
    const fetchUserById = async (userId) => {
        try {
            const user = await fetchModel(`http://localhost:8081/api/user/user/${userId}`);
            return user;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    useEffect(() => {

        setComments(photo.comments);
    }, [photo, comment]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {

                const newUsers = {};

                for (const comment of photo.comments) {

                    if (!users[comment.user_id]) {
                        const user = await fetchUserById(comment.user_id);
                        if (user) {

                            newUsers[comment.user_id] = user;
                        }
                    }

                }

                setUsers(prevUsers => ({ ...prevUsers, ...newUsers }));
            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };

        fetchAllUsers();
    }, [photo]);

    const handleClick = (photo_id) => {
        props.handleComment(photo_id, comment)
        toast.success("Comment successfully")
        setComment("")
    }

    const handleDelete = (photo_id, comment_id) => {
        props.handleDeleteComment(photo_id, comment_id)
        toast.success("Delete comment successfully")
    }

    const formatDate = (dateTime) => {
        return moment(dateTime).format('DD/MM/YYYY HH:mm:ss');
    }

    return (
        <div className="photo-item">
            <img src={`data:${photo.contentType};base64,${photo.data}`} />
            <div className="photo-info">{formatDate(photo.date_time)}</div>
            <div className="comments">
                {comments.length > 0 ? (
                    comments.map((comment, idx) => {
                        const user = users[comment.user_id];
                        return (
                            <div className="comment" key={comment._id}>
                                <div className="comment-date">{user && user.last_name}({formatDate(comment.date_time)}):</div>
                                <div className="comment-text">{comment.comment} {comment.user_id === userIdLogin && <button onClick={() => handleDelete(photo._id, comment._id)}>Delete</button>}</div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-comments">No comments</div>
                )}
                <div className="text"><input name={photo._id} onChange={(event) => setComment(event.target.value)} value={comment} type="text" placeholder="write here" />
                    <button onClick={() => handleClick(photo._id)}>Comment</button>
                </div>
            </div>
        </div>
    )
}

export default Photo;