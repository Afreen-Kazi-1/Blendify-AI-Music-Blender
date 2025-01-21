exports.getAboutPage = (req, res) => {
    res.status(200).json({ message: "About page" });
};

exports.getHelpPage = (req, res) => {
    res.status(200).json({ message: "Get help page" });
};

