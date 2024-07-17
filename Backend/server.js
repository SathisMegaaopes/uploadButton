const express = require('express')
const multer = require('multer')
const bodypaser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(bodypaser.json())
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
        console.log(req.body,'this is you want da')

        // const uploadPath = 'uploads/';

        // if (!fs.existsSync(uploadPath)) {
        //     fs.mkdirSync(uploadPath);
        // }

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const yearFolder = path.join(__dirname, currentYear)
        const monthFolder = path.join(yearFolder, currentMonth)


        // if (!fs.existsSync(yearPath)) {
        //     try {
        //         fs.mkdirSync(yearPath);
        //     } catch (err) {
        //         cb(err);
        //         return;
        //     }
        // }

        fs.access(yearFolder, fs.constants.F_OK, (yearErr) => {
            if (yearErr) {
                return res.status(400).json({ error: `Year folder ${currentYear} does not exist.` });
            }
            fs.access(monthFolder, fs.constants.F_OK, (monthErr) => {
                if (monthErr) {
                    return res.status(400).json({ error: `Month folder ${currentMonth} does not exist.` });
                }
                const yearMonthPath = path.join(monthFolder);
                console.log(yearMonthPath)
                cb(null, yearMonthPath);
                console.log('File is added to the directory sathis')
            });

        })

        // if (!fs.existsSync(yearMonthPath)) {
        //     fs.mkdirSync(yearMonthPath, { recursive: true });
        // }
    },
    filename: function (req, file, cb) {
        // cons
        cb(null, file.originalname); // You can modify the filename if needed
    }
});


const upload = multer({ storage });


app.post('/', upload.single('file'), (req, res) => {
    try {
        // console.log(req.body, 'it is the body details')
        const { id, type } = req.body
        // console.log(req.file);
        res.status(200).send(`File uploaded successfully ${req.file.filename}`);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/', (req, res) => {

    // console.log(currentDate)
    // console.log(currentYear)
    // console.log(currentMonth)
    // console.log(currentMonth2)

    res.send('the server is getted')
})

const port = 5000

app.listen(port, () => {
    console.log('The server is running successfully')
})





