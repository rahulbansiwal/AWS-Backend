const sequelize = require('../utils/dbconnect');
const {DataTypes} =  require('sequelize');
const User = require('./users');

const Post = sequelize.define('Post',{
    id:{
        type: DataTypes.STRING(300),
        primaryKey:true
    },
    likes:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    caption:{
        type:DataTypes.TEXT('medium'),
        allowNull:true
    },
    createdBy:{
        type:DataTypes.STRING(255),
        references:{
            model:"Users",
            key: "username"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    },
    s3URI:{
        type:DataTypes.STRING(1000),
        allowNull:false
    }
});

User.hasMany(Post,
    {
    foreignKey: "createdBy",
    onDelete: "CASCADE",
    onUpdate:"CASCADE"
}
);
Post.belongsTo(User,{foreignKey:"createdBy"});
module.exports = Post;