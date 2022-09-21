
// Importing User model so that we can use in the other part of the application
const User = require('./User');

// importing Post model so that we can export it to use to the other part of the application

const Post = require("./Post");

const Vote = require("./Vote");
// Create associations
User.hasMany(Post,{
    foreignKey:'User_id'
});

Post.belongsTo(User,{
    foreignKey:'User_id',
});

User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Post.hasMany(Vote, {
  foreignKey: "post_id",
});

// exporting User and post models to use in the other part of the application.
module.exports = {User,Post,Vote};
