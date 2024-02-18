import fastify, { FastifyError, errorCodes } from "fastify";
import { config } from "dotenv";
import cors from '@fastify/cors';
import { GreetAI, generateResponse } from "../AI_Generate";
import path from "path";
config();


const PORT = process.env.PORT;
const server= fastify();
let greetText:string;
const greet = async () =>  {
    greetText = await GreetAI();
} 
greet();

setInterval(async ()=>{
  
    greet();
},60000)
server.register(cors,{
    origin:true, 
});

server.register(require("@fastify/view"), {
    engine: {
      ejs: require("ejs"),
    },
    templates: "public", // Diretório de visualizações
  });
    
server.get("/",(req, reply) => {
    reply.view("index.ejs", { text: greetText});    
});

server.post('/generateRecipe',generateResponse);

server.get('/whatsappVictoria',()=>{
    console.log("Whatsapp")
})

 

//Porta     
server.listen({
    host:'0.0.0.0',
    port: process.env.PORT??3000,
})
console.log(`http://localhost:${PORT}`)