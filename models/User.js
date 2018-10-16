'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('user', UserSchema, 'userInfo');

module.exports = User;
