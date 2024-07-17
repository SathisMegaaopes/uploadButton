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




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const yearFolder = path.join(__dirname, currentYear)
        const monthFolder = path.join(yearFolder, currentMonth)
        const fileFolder = path.join(monthFolder, 'filesFolder')
        const imagesFolder = path.join(monthFolder, 'imagesFolder')

        console.log(file.mimetype, 'this is tooo important')

        fs.access(yearFolder, fs.constants.F_OK, (yearErr) => {
            if (yearErr) {
                return res.status(400).json({ error: `Year folder ${currentYear} does not exist.` });
            }
            fs.access(monthFolder, fs.constants.F_OK, (monthErr) => {
                if (monthErr) {
                    return res.status(400).json({ error: `Month folder ${currentMonth} does not exist.` });
                }

                if (file.mimetype == 'application/vnd.ms-excel' ||
                    file.mimetype == 'application/pdf' ||
                    file.mimetype == 'application/msword') {
                    fs.access(fileFolder, fs.constants.F_OK, (folderErr) => {
                        if (folderErr) {
                            console.log('The File folder is missing')
                        }
                        const yearMonthImagePath = path.join(fileFolder);
                        console.log(yearMonthImagePath)
                        cb(null, yearMonthImagePath);
                    })
                } else if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
                    fs.access(imagesFolder, fs.constants.F_OK, (folderErr) => {
                        if (folderErr) {
                            console.log('The Image folder is missing')
                        }
                        const yearMonthImagePath = path.join(imagesFolder);
                        console.log(yearMonthImagePath)
                        cb(null, yearMonthImagePath);
                    })
                }

            });

        })
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage });

app.post('/', upload.single('file'), (req, res) => {
    try {
        // console.log(req.body)
        res.status(200).send(`File uploaded successfully ${req.file.filename}`);
    } catch (err) {
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





