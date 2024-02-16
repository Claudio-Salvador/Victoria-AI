import fastify, { FastifyError, errorCodes } from "fastify";
import { config } from "dotenv";
import cors from '@fastify/cors';
import { generateResponse } from "../AI_Generate";
import path from "path";
config();


const PORT = process.env.PORT;
const server= fastify();


server.register(cors,{
    origin:true, 
});

server.register(require("@fastify/view"), {
    engine: {
      ejs: require("ejs"),
    },
    templates: "public", // Diretório de visualizações
  });
    
server.get("/", (req, reply) => {
    reply.view("index.ejs", { text: "Ola Porra" });
});
server.post('/generateRecipe',generateResponse);

 

//Porta 
server.listen({
    host:'0.0.0.0',
    port: process.env.PORT??3000,
})