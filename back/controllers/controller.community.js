const Project = require('../models/projects');

const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProjects = await Project.find({ createdBy: userId });
    res.status(200).json(userProjects);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching your projects.' });
  }
};

const getAllPublicProjects = async (req, res) => {
  try {
    const publicProjects = await Project.find({ visibility: 'public' });
    res.status(200).json(publicProjects);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching public projects.' });
  }
};

module.exports = {
  getUserProjects,
  getAllPublicProjects,
};
