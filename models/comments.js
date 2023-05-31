const sequelize = require('../utils/dbconnect');
const {DataTypes} =  require('sequelize');

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
        type: DataTypes.INTEGER,
        references:{
            model:"posts",
            key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"NO ACTION"
    }
});

module.exports = Comment;