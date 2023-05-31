const sequelize=require('../utils/dbconnect');
const {DataTypes} =  require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config({path:'../config.env'});
const salt = process.env.ENCRYPT_SALT;

const User = sequelize.define('User',{
    username:{
        type: DataTypes.STRING(255),
        primaryKey:true,
        allowNull:false

    },
    first_name:{
        type:DataTypes.STRING(255),
        allowNull:false,
        get(){
            const rawvalue = this.getDataValue('first_name');
            return rawvalue ? rawvalue.toUpperCase() : null;
        },
        set(value){
            this.setDataValue('first_name',value.toLowerCase().trim());
        }
    },
    last_name:{
        type:DataTypes.STRING(255),
        allowNull:false,
        get(){
            const rawvalue = this.getDataValue('last_name');
            return rawvalue ? rawvalue.toUpperCase() : null;
        },
        set(value){
            this.setDataValue('last_name',value.toLowerCase().trim());
        }
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING(300),
        allowNull:false,
        validate:{
            isAlphanumeric:{msg:"Password must contains AlphaNumeric values"},
            isUppercase:{msg:"Password must cotnains an uppercase letter"},
            len:{args:[6,12],msg:"password is either short or too long!"}
        },
        async set(value){
            const hashedpassword = await bcrypt.hash(value,salt);
            this.setDataValue('password',hashedpassword);
        }
    }
})

module.exports = User;
