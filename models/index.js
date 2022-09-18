
// Importing User model so that we can use in the other part of the application
const User = require('./User');

// importing Post model so that we can export it to use to the other part of the application

const Post = require("./Post");

// Create associations
User.hasMany(Post,{
    foreignKey:'User_id'
});

Post.belongsTo(User,{
    foreignKey:'User_id',
});

// exporting User and post models to use in the other part of the application.
module.exports = {User,Post};
