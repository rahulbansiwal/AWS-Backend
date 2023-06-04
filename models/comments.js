const sequelize = require('../utils/dbconnect');
const {DataTypes} =  require('sequelize');
const User = require('./users');
const Post = require('./post');

const Comment = sequelize.define('Comment',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    commentBy:{
        type:DataTypes.STRING(255),
        references:{
            model:"users",
            key: "username"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    },
    text:{
        type:DataTypes.TEXT('medium'),
        allowNull:false
    },
    post:{
        type: DataTypes.STRING(300),
        references:{
            model:"posts",
            key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"NO ACTION"
    }
});
Post.hasMany(Comment,{
    foreignKey: "post",
    onDelete: "CASCADE",
    onUpdate:"CASCADE"
})
Comment.belongsTo(Post,{foreignKey:"post"});
User.hasMany(Comment,{
    foreignKey:"commentBy",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
Comment.belongsTo(User,{foreignKey:"commentBy"});
Comment.sync();

module.exports = Comment;