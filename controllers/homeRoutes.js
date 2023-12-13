const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/dashboard', (req, res) => {
  // Get the necessary data for the dashboard
  const data = {
    username: req.user.username,
    // Add more data as needed
  };

  // Render the dashboard template and pass in the data
  res.render('dashboard', data);
});

// If user is logged in, see navigation links for the homepage, 
// the dashboard, and the option to log out


module.exports = router;
