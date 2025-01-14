const SupportRequest = require('../models/supportrequest');

const getSupportPage = (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Support page. How can we help you?',
  });
};

const submitSupportRequest = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newRequest = new SupportRequest({
      name,
      email,
      message,
    });

    await newRequest.save();

    res.status(200).json({
      message: 'Your support request has been submitted successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while submitting your request. Please try again later.',
    });
  }
};

module.exports = {
  getSupportPage,
  submitSupportRequest,
};
