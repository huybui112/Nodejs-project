
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import fetchModel from '../../lib/fetchModelData';
import "./styles.css";
import { UserContext } from "../../context/UserContext";
import { toast } from 'react-toastify';
const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { username, userIdLogin } = React.useContext(UserContext)
    const navigate = useNavigate()
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (!username) {
            navigate('/login');
        }
    }, [username, navigate]);

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('userId', userIdLogin);
        try {
            await fetch('http://localhost:8081/api/photo/photos/new', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            setSelectedFile(null)
            navigate(`/photos/${userIdLogin}`)
            toast.success("Upload successfully")
            console.log('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed')
        }
    };
    if (username) {
        return (
            <div class="photo-uploader">
                <h2 class="uploader-title">Photo Uploader</h2>
                <div class="uploader-controls">
                    <input type="file" onChange={handleFileChange} />
                    <button class="upload-button" onClick={handleUpload}>Upload</button>
                </div>
            </div>

        );
    }
    return null
};

export default Upload