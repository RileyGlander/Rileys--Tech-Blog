const sequelize = require('sequelize')

const User = require('./User');
const Comment = require('./comment')
const Post = require('./post')



module.exports = { User, Comment, Post };