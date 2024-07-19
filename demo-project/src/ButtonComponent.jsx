import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Input = styled('input')({
    display: 'none',
});


const UploadButtons = () => {

    const [type, setType] = useState('')
    const [ID, setID] = useState('')

    const handleFileUpload = async (event) => {

        if(!ID){
            console.log('The id missing')
            return;
        }

        const selectedFile = event.target.files[0];

        const formData = new FormData();

        formData.append('file', selectedFile);
        formData.append('id', ID)
        formData.append('type', type)


        try {

            // console.log(formData,'this is the formData buddy')
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

        }
        catch (error) {

            console.error('An error occurred:', error.message);

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
