import fastify, { FastifyError, errorCodes } from "fastify";
import { config } from "dotenv";
import cors from '@fastify/cors';
import { generateResponse } from "../AI_Generate";

config();


const PORT = process.env.PORT;
const server= fastify();


server.register(cors,{
    origin:true, 
});


server.get('/',async ()=>{
    return "Hello, world!";
});

server.post('/generateRecipe',generateResponse);



//Porta 
server.listen({
    host:'0.0.0.0',
    port: process.env.PORT??3000,
})