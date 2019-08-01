const User = require('../models/user');

exports.createUser = (req, res) => {
  // Check all the data is in place
  if (req.body.name && req.body.password) {
    const newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

    newUser.save((err, user) => {
      if (!err) {
        return res.send(user._id);
      }
      return res.status(400).send(err);
    });
  } else {
    res.status(400).send('Name or password are incorrect');
  }
};

exports.loginUser = (req, res) => {
  // Check all the data is in place
  if (req.body.name && req.body.password) {
    User.findOne(
      {
        name: req.body.name
      },
      (err1, user) => {
        if (err1) {
          return res.status(400).send(err1);
        }
        if (!user) {
          return res.status(404).send("User doesn't exist");
        }
        user.comparePassword(req.body.password, (err2, isMatch) => {
          if (err2) {
            return res.status(500).send(err2);
          }
          if (!isMatch) {
            return res.status(403).send('Wrong password');
          }
          return res.send('Access granted');
        });
      }
    );
  }
};
