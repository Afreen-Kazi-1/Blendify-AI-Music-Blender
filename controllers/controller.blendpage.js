const Project = require('../models/projects');

const blendSongs = async (song1, song2) => {
    //ML model
    return 'mashup output';
};

exports.createBlend = async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ error: 'Please upload two songs for blending.' });
        }

        const song1 = req.files[0];
        const song2 = req.files[1];

        //external ML logic
        const blendFileUrl = await blendSongs(song1, song2);

        // Save blend
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

        res.status(201).json({ message: 'Blend created and saved successfully!', project: newProject });
    } catch (error) {
        res.status(500).json({ error: 'Error creating blend' });
    }
};
