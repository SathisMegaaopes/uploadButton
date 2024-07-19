const express = require('express')
const multer = require('multer')
const bodypaser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodypaser.json())
app.use(bodypaser.urlencoded({ extended: true }));
app.use(cors())

const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const fileUpload = (req, res, next) => {
    const type = req.body.type;
    const id = req.body.id;
    const file = req.file;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const yearFolder = path.join(__dirname, currentYear)
    const monthFolder = path.join(yearFolder, currentMonth)
    const fileFolder = path.join(monthFolder, 'filesFolder')
    const imagesFolder = path.join(monthFolder, 'imagesFolder')

    // console.log(type, 'this is the type')
    // console.log(id, 'this is the id')
    // console.log(file, 'this is the file')

    if (!file) {
        return res.send(400).send('No file is received')
    }

    let targetDirectory;

    
    fs.access(yearFolder, fs.constants.F_OK, (yearErr) => {
        if (yearErr) {
            fs.mkdir(yearFolder, { recursive: true }, (err) => {
                if (err) {
                    return res.status(500).json({ error: `Failed to create year folder ${currentYear}.` });
                }
            });
        }
        fs.access(monthFolder, fs.constants.F_OK, (monthErr) => {
            if (monthErr) {
                fs.mkdir(monthFolder, { recursive: true }, (err) => {
                    if (err) {
                        return res.status(500).json({ error: `Failed to create month folder ${currentMonth}.` });
                    }
                });
            }
            if (type === 'file') {
                fs.access(fileFolder, fs.constants.F_OK, (folderErr) => {
                    if (folderErr) {
                        fs.mkdir(fileFolder, { recursive: true }, (err) => {
                            if (err) {
                                return res.status(500).json({ error: 'Failed to create file folder.' });
                            }

                            const yearMonthImagePath = path.join(fileFolder);
                            targetDirectory = yearMonthImagePath
                            fileUploading()
                        });
                    } else {
                        const yearMonthImagePath = path.join(fileFolder);
                        targetDirectory = yearMonthImagePath
                        fileUploading()
                    }
                });
            } else if (type === 'image') {
                fs.access(imagesFolder, fs.constants.F_OK, (folderErr) => {
                    if (folderErr) {
                        fs.mkdir(imagesFolder, { recursive: true }, (err) => {
                            if (err) {
                                return res.status(500).json({ error: 'Failed to create image folder.' });
                            }

                            const yearMonthImagePath = path.join(imagesFolder);
                            targetDirectory = yearMonthImagePath
                            fileUploading()
                        });
                    } else {
                        const yearMonthImagePath = path.join(imagesFolder);
                        targetDirectory = yearMonthImagePath
                        fileUploading()
                    }
                });
            } else {
                res.status(400).json({ error: 'The file format is not acceptable.' });
            }
        });
    });


    function fileUploading(){
        const targetPath = path.join(targetDirectory, `${id}_${file.originalname}`);
        fs.writeFile(targetPath, file.buffer, (err) => {
            if (err) {
                return next(err);
            }

            next();
        });
    }

}

app.post('/', upload.single('file'), fileUpload, (req, res) => {
    try {
        res.status(200).send(`File uploaded successfully ${req.file.originalname}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


app.get('/', (req, res) => {
    res.send('the server is getted')
})


const port = 5000

app.listen(port, () => {
    console.log('The server is running successfully')
})





