import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
// import Input from '@mui/joy/Input';
import axios from 'axios';

const Input = styled('input')({
    display: 'none',
});


const UploadButtons = () => {

    const [type, setType] = useState('')
    const [ID, setID] = useState('')
    const handleFileUpload = async (event) => {
        console.log('the function is triggered')

        const selectedFile = event.target.files[0];
        console.log(selectedFile.name)

        const newFilename = `${ID}_${selectedFile.name}`;

        const formData = new FormData();
        formData.append('file', selectedFile, newFilename);
        formData.append('id', ID)
        formData.append('type', type)
        // setID('')

        console.log(type)

        try {
            const response = await axios.post('http://localhost:5000/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });

        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        }
    };

    const handleImageUpload = (event) => {
        //image for handling
    };

    return (
        <div>
            <label htmlFor="file-upload">
                <Input
                    accept="application/pdf,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                />
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadFileIcon />}
                    sx={{ marginRight: 2 }}
                    onClick={() => setType('file')}
                >
                    Upload File
                </Button>
            </label>

            <label htmlFor="image-upload">
                <Input
                    // accept="image/*"
                    accept="image/jpeg,image/png"
                    id="image-upload"
                    type="file"
                    onChange={handleFileUpload}
                />
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<ImageIcon />}
                    onClick={() => setType('image')}
                >
                    Upload Image
                </Button>
            </label>
            {/* <input /> */}
            <input
                color="success"
                placeholder="Enter the ID"
                size="lg"
                variant="outlined"
                style={{ padding: '8px', margin: '20px' }}
                onChange={(e) => setID(e.target.value)}
            />
        </div>
    );
};

export default UploadButtons;
