import fastify from "fastify";
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



server.listen({ port: PORT }, err => {
    if (err) throw err;
    console.log(`server listening on http://localhost:${PORT}`);
});