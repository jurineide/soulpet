require("dotenv").config();
const express=require("express");
const app=express();
app.use(express.json());
const { connection, authenticate } = require("./database/database");

authenticate(connection);
const Cliente=require("./database/cliente");
const Endereco=require("./database/endereco");


app.post("/clientes",async(req,res)=>{
    const{nome, email, telefone, endereco}=req.body;

    try{
        const novo = await Cliente.create(
            {nome,email,telefone,endereco},
            {include:[Endereco]});

        res.status(201).json(novo);
    } catch (err){        
        res.status(500).json({message:"um erro aconteceu."});

    } 
});


app.listen(3000, () => {
    connection.sync({force: true});
    console.log("Servidor rodando em http://localhost:3000/");
  });