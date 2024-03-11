import { GreetAI, generateResponse } from "../AI_Generate/index";
import fastify, { FastifyError, errorCodes } from "fastify";
import { config } from "dotenv";
import cors from '@fastify/cors';
import path from "path";
import WhatsappInit from "./whatsappVictorIA/whatsapp";
config();





const whatsapp = new WhatsappInit();
let textQr:string;


whatsapp.initialize().then((qrCode) => {
    textQr=qrCode; // Agora você pode obter o valor do QR code quando estiver disponível
});
const showQRCode = (req:Request, reply:Response) => {
    reply.sendFile("qrcode.png");
  
};

const PORT = process.env.PORT;
const server = fastify();

let greetText: string;
const greet = async () => {
    greetText = await GreetAI();
}
greet();

server.register(cors, {
    origin: true,
});

server.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs"),
    },
    templates: "public", 
});




server.get("/qr-code", showQRCode);

server.get("/", (req, reply) => {
    reply.view("index.ejs", { text: greetText });
});

server.post('/generateRecipe', generateResponse);




//Porta     
server.listen({
    port: process.env.PORT ?? 3000,
})
console.log(`Server is listening on ${PORT}`)