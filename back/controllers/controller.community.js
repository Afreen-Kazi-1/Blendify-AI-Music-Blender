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

exports.likeProject = async (req, res) => {
  try {
      const { projectId } = req.params;
      const userId = req.user.id; 

      const project = await Project.findById(projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });

      const index = project.likes.indexOf(userId);
      if (index === -1) {
          project.likes.push(userId); // Like
      } else {
          project.likes.splice(index, 1); // Unlike
      }

      await project.save();
      res.status(200).json({ message: 'Like status updated', likes: project.likes.length });
  } catch (error) {
      res.status(500).json({ error: 'Error updating like status' });
  }
};

// Add a Comment to a Project
exports.addComment = async (req, res) => {
  try {
      const { projectId } = req.params;
      const { text } = req.body;
      const userId = req.user.id;

      if (!text) return res.status(400).json({ message: 'Comment text is required' });

      const project = await Project.findById(projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });

      project.comments.push({ user: userId, text });
      await project.save();

      res.status(201).json({ message: 'Comment added successfully', comments: project.comments });
  } catch (error) {
      res.status(500).json({ error: 'Error adding comment' });
  }
};

// Get Comments for a Project
exports.getComments = async (req, res) => {
  try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId)
          .populate('comments.user', 'username'); // Fetch username of commenter

      if (!project) return res.status(404).json({ message: 'Project not found' });

      res.status(200).json({ comments: project.comments });
  } catch (error) {
      res.status(500).json({ error: 'Error fetching comments' });
  }
};

module.exports = {
  getUserProjects,
  getAllPublicProjects,
};
