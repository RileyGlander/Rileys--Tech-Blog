const router = require('router')
const sequelize = require('sequelize')

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