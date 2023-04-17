const {DataTypes}= require("sequelize");
const {connection}= require("./database");
const Endereco=require("./endereco");

const Cliente=connection.define("cliente",{
    nome: {        
        type: DataTypes.STRING(130),
        allowNull: false, 
      },
      email: {       
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefone: {        
        type: DataTypes.STRING,
        allowNull: false,
      },    
});

Cliente.hasOne(Endereco);
Endereco.belongsTo(Cliente); 

module.exports=Cliente;