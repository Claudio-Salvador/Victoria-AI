import { GreetAI, generateResponse } from "../AI_Generate/index";
import fastify, { FastifyError, errorCodes } from "fastify";
import { config } from "dotenv";
import cors from '@fastify/cors';
import path from "path";
import WhatsappInit from "./whatsappVictorIA/whatsapp";
config();

//thanks



const whatsapp = new WhatsappInit();
let textQr;


whatsapp.initialize().then((qrCode) => {
    textQr=qrCode; // Agora você pode obter o valor do QR code quando estiver disponível
});
const showQRCode = (req:Request, reply:Response) => {
    // const qrCodePath = path.join(__dirname, "qrcode.png");
    // reply.header('Content-Disposition', `attachment; filename=${qrCodePath}`);
    reply.sendFile("qrcode.png");
  
};

const PORT = process.env.PORT;
const server = fastify();

let greetText: string;
const greet = async () => {
    greetText = await GreetAI();
}
greet();

setInterval(async () => {
    greet();
}, 60000)
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
    reply.view("index.ejs", { text: greetText, qr:textQr });
});

server.post('/generateRecipe', generateResponse);




//Porta     
server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
})
console.log(`Server is listening on ${PORT}`)
