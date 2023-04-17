const {DataTypes}= require("sequelize");
const {connection}= require("./database");


const Cliente=connection.define("cliente",{
    nome:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    telefone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    
});
 

module.exports=Cliente;