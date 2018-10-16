'use strict';

const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: String,
  password: String
});

const Users = mongoose.model('user', User, 'userInfo');

module.exports = Users;
