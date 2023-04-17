const {Sequelize}=require("sequelize");

const connection =new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:'mysql',
    }
);
async function authenticate(connection){

    try{
        await connection.authenticate();
        console.log("sucesso");

    } catch (err){
console.log("erro", err);
    }    

}

module.exports={connection,authenticate};