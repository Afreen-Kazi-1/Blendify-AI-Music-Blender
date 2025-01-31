// const Project = require('../models/projects');

// const blendSongs = async (song1, song2) => {
//     //ML model
//     return 'mashup output';
// };

// exports.createBlend = async (req, res) => {
//     try {
//         if (!req.files || req.files.length < 2) {
//             return res.status(400).json({ error: 'Please upload two songs for blending.' });
//         }

//         const song1 = req.files[0];
//         const song2 = req.files[1];
//         console.log(req.files)

//         //external ML logic
//         const blendFileUrl = await blendSongs(song1, song2);

//         // Save blend
//         const { title, description, visibility } = req.body;
//         const userId = req.user.id;

//         const newProject = new Project({
//             title,
//             description,
//             blendFileUrl,
//             visibility,
//             createdBy: userId,
//         });

//         await newProject.save();

//         res.status(201).json({ message: 'Blend created and saved successfully!', project: newProject });
//     } catch (error) {
//         res.status(500).json({ error: 'Error creating blend' });
//     }
// };


const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const upload = multer({ dest: 'uploads/' });

const Project = require('../models/projects');

exports.createBlend = async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ error: 'Please upload two songs for blending.' });
        }

        const song1 = req.files[0];
        const song2 = req.files[1];

        console.log('Uploaded files:', req.files);

        // Prepare files for Flask API
        const formData = new FormData();
        formData.append('song1', fs.createReadStream(song1.path), song1.originalname);
        formData.append('song2', fs.createReadStream(song2.path), song2.originalname);

        // Send to Flask API for processing
        const flaskURL = 'http://YOUR_FLASK_SERVER_URL/process_songs'; // Replace with your actual Flask server URL

        const response = await axios.post(flaskURL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        if (!response.data.blendFileUrl) {
            return res.status(500).json({ error: 'Error processing songs in Flask server' });
        }

        const blendFileUrl = response.data.blendFileUrl;

        // Save blend to database
        const { title, description, visibility } = req.body;
        const userId = req.user.id;

        const newProject = new Project({
            title,
            description,
            blendFileUrl,
            visibility,
            createdBy: userId,
        });

        await newProject.save();

        // Cleanup uploaded files
        fs.unlinkSync(song1.path);
        fs.unlinkSync(song2.path);

        res.status(201).json({ message: 'Blend created and saved successfully!', project: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating blend' });
    }
};
