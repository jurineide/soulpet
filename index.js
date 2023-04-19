require("dotenv").config();
const express=require("express");
const app=express();
app.use(express.json());
const { connection, authenticate } = require("./database/database");
authenticate(connection);
const Cliente=require("./database/cliente");
const Endereco=require("./database/endereco");
const Pet=require("./database/pet");
//todos clientes
app.get("/clientes",async (req,res)=>{
    const listaClientes= await Cliente.findAll();
    res.json(listaClientes);
});
//clientes por id
app.get("/clientes/:id",async (req,res)=>{
    const cliente=await Cliente.findOne({where:{id: req.params.id}});
if(cliente){
res.json(cliente);
}else{
res.status(404).json({message:"usuario não encontrado"});
    }});
    //adicionar clientes
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
//atualizar cliente
app.put("/clientes/:id",async(req, res)=>{
    const{nome,email,telefone,endereco}=req.body;
    const {id}=req.params;
    try{
        const cliente= await Cliente.findOne({where:{id}});
        if(cliente){
            if(endereco){
              await Endereco.update(endereco,{where:{clienteId:id}});
            }
            await cliente.update({nome, email, telefone});
      res.status(200).json({ message: "Cliente editado." });
    }else{
            res.status(404).json({message:"cliente não encontgrado"})
        }
    }
    catch(err){
        res.status(500).json({message:"um erro aconteceu"});
    }
});
//deletar clientes
app.delete("/cliente/:id",async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findOne({ where: { id } });
    try {
        if(cliente) {
          await cliente.destroy();
          res.status(200).json({ message: "Cliente removido." });
        }
        else {
          res.status(404).json({ message: "Cliente não encontrado." });
        }
      }
      catch(err) {
        console.error(err);
        res.status(500).json({ message: "Um erro aconteceu." });
      }
    });


///////PET/////////////////////////////////////////////////////




//lista Petz
    app.get("/pets", async (req, res) => {
        const listaPets = await Pet.findAll();
        res.json(listaPets);
      });

      //petz por id
      app.get("/pets/:id", async (req, res) => {
        const { id } = req.params;
      
        const pet = await Pet.findByPk(id);
        if(pet) {
          res.json(pet);
        } else {
          res.status(404).json({ message: "Pet não encontrado." });
        }
      });   

    //add petz
    app.post("/pets",async(req, res)=>{
        const{nome,tipo,porte,dataNasc,clienteId}=req.body;
        try{
          const cliente = await Cliente.findByPk(clienteId);
            if(cliente){
                const pet=await Pet.create({nome,tipo,porte,dataNasc,clienteId});
                res.status(201).json(pet);
            }else{
                res.status(404).json({message:"cliente não encontrado"});
            }
        }catch (err){
            res.status(500).json({message:"erro"})
        }
    });
    //edita Pet
    app.put("/pets/:id", async (req,res)=>{
      const{nome, tipo, dataNasc,porte}=req.body;
      const pet=await Pet.findByPk(req.params.id);
      try {
        if (pet) {          
          await Pet.update(
            { nome, tipo, dataNasc, porte },
            { where: { id: req.params.id } } // WHERE id = "req.params.id"
          );          
          res.json({ message: "O pet foi editado." });
        } else {          
          res.status(404).json({ message: "O pet não foi encontrado." });
        }
      } catch (err) {        
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
      }
    });
    //delete pet
    app.delete("/pets/:id",async(req,res)=>{
      const pet=await Pet.findByPk(req.params.id)
      try {
        if (pet) {
          
          await pet.destroy();
          res.json({ message: "O pet foi removido." });
        } else {
          res.status(404).json({ message: "O pet não foi encontrado" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
      }
    });







app.listen(3000, () => {
    connection.sync({force: true});
    console.log("Servidor rodando em http://localhost:3000/");
  });

  