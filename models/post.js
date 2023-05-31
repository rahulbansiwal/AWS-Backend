const sequelize = require('../utils/dbconnect');
const {DataTypes} =  require('sequelize');


const Post = sequelize.define('Post',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
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
            model:"users",
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

module.exports = Post;