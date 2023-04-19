const Pet=require("../database/pet");
const Cliente=require("../database/endereco");
const {Router}= require("express");
const router=Router();



//lista Petz
router.get("/pets", async (req, res) => {
    const listaPets = await Pet.findAll();
    res.json(listaPets);
  });
//petz por id
  router.get("/pets/:id", async (req, res) => {
    const { id } = req.params;
  
    const pet = await Pet.findByPk(id);
    if(pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Pet não encontrado." });
    }
  });  
//add petz
router.post("/pets",async(req, res)=>{
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
router.put("/pets/:id", async (req,res)=>{
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
router.delete("/pets/:id",async(req,res)=>{
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



module.exports=router;