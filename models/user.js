const moongose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = moongose;
const { ObjectId } = moongose.Schema.Types;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  key: ObjectId,
  name: {
    type: String,
    required: true,
    index: { unique: true },
    max: 100,
    validate: {
      validator(v) {
        User.find({ name: v }, function(err, docs) {
          return docs.length === 0;
        });
      },
      msg: 'User already exists!'
    }
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the password
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err1, salt) => {
      if (err1) {
        return next(err1);
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          return next(err2);
        }
        this.password = hash;
        next();
      });
    });
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (!err) {
      return cb(null, isMatch);
    }
    return cb(err);
  });
};

const User = moongose.model('User', UserSchema);

module.exports = User;
