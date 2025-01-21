exports.getLandingPage = (req, res) => {
    res.status(200).json({ message: "Welcome to Blendify's Landing Page!" });
};
