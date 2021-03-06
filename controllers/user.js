const jwt = require('jsonwebtoken');

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

exports.verifyUser = (token, cb) => {
  const { userId } = jwt.verify(token, 'CHANGE_THIS');
  User.findById(userId, cb);
};

exports.changePassword = (req, res) => {
  // Check all the data is in place
  if (req.body.password) {
    if (req.headers.authorization) {
      this.verifyUser(req.headers.authorization, (err1, user1) => {
        if (err1) {
          return res.status(500).send(err1);
        }
        if (!user1) {
          return res.status(403).send('Unauthorized access');
        }
        User.deleteOne(
          {
            name: user1.name
          },
          err2 => {
            if (err2) {
              return res.status(500).send(err2);
            }
            const newUser = new User({
              name: user1.name,
              password: req.body.password
            });
            newUser.save((err, user2) => {
              if (!err) {
                return res.send(user2._id);
              }
              return res.status(400).send(err);
            });
          }
        );
      });
    } else {
      return res.status(403).send('You must be logged in');
    }
  } else {
    return res.status(400).send('One or more parameters are empty');
  }
};

exports.loginUser = (req, res) => {
  // Check all the data is in place
  // Login using name and password
  if (req.body.name && req.body.password) {
    User.findOne(
      {
        name: req.body.name
      },
      (err1, user) => {
        if (err1) {
          return res.status(500).send(err1);
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
          const token = jwt.sign(
            {
              userId: user._id
            },
            'CHANGE_THIS'
          );
          return res.send({
            token
          });
        });
      }
    );
    // Login using token
  } else if (req.body.userToken) {
    this.verifyUser(req.body.userToken, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(403).send('Wrong token');
      }
      if (user) {
        return res.send({
          userName: user.name
        });
      }
    });
  } else {
    return res.status(400).send('One or more parameters are empty');
  }
};
