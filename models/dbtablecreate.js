const User = require('./users'); 
const Post = require('./post');
const Comment = require('./comments');

const main = async ()=>{
await User.sync();
await Post.sync();
await Comment.sync();
}
main();