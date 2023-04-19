const{DataTypes}=require("sequelize");
const {connection}=require("./database");
const Cliente =require("./cliente");

const Pet=connection.define("pet",{
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tipo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    porte:{
        type:DataTypes.STRING,
        allowNull:false
    },
    dataNasc:{
        type:DataTypes.DATEONLY,        
    }
});

Cliente.hasMany(Pet);
Pet.belongsTo(Cliente);

module.exports=Pet;