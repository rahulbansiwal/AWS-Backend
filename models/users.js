const sequelize=require('../utils/dbconnect');
const {DataTypes} =  require('sequelize');
const bcrypt = require('bcrypt');
const {ENCRYPT_SALT} = require('../utils/env');
const ValidationError = require('../errors/validationError');
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
            return rawvalue ? rawvalue.toUpperCase() : "";
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
            return rawvalue ? rawvalue.toUpperCase() : "";
        },
        set(value){
            this.setDataValue('last_name',value.toLowerCase().trim());
        }
    },
    full_name:{
        type:DataTypes.VIRTUAL,
        get(){
            return `${(this.first_name).toUpperCase()} ${(this.last_name).toUpperCase()}`
        },
        set(val){
            throw new ValidationError(400,"invalid writes",'Do not try to set full_name field');
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
          set(value){
            const hashedpassword =  bcrypt.hashSync(value,parseInt(ENCRYPT_SALT));
            this.setDataValue('password',hashedpassword);
        }
    }
})

module.exports = User;
