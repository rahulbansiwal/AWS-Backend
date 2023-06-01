const User = require('./users');
const Post = require('./post');
const Comment = require('./comments');

User.hasMany(Post,{
foreignKey:"createdBy"
});
Post.belongsTo(User);

User.hasMany(Comment,{
    foreignKey:"commentBy"
});
Comment.belongsTo(User);

Post.hasMany(Comment,{
    foreignKey:"post"
});
Comment.belongsTo(Post);