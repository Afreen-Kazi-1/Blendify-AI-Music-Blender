const express = require('express')
const router = express.Router()
const authcontroller = require('../controllers/controller.auth')
const passport = require('passport')
const jwt = require('jsonwebtoken')



router.post('/register', authcontroller.register)


router.post('/login', authcontroller.login)


router.post('/refresh-token', authcontroller.refreshToken)

router.delete('/logout', authcontroller.delete)


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    const user = req.user;

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1y' }
    );

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  }
);

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out successfully' });
  });
});


module.exports = router