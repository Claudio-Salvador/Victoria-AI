import { prismaClient } from "../DataBase/PrismaClient";
import whatsappControl from "./controllerWhatsap";
import { Client, LocalAuth, Message, MessageMedia } from 'whatsapp-web.js';
const qrcodeG = require('qrcode');
const qrcode = require('qrcode-terminal');

export default class WhatsappInit {
  private client: Client;
 
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });

    this.initialize();
  }

  private async  initialize() {
    this.client.on('qr', async (qr: string) => {
      qrcode.generate(qr, { small: true });
      // Empty the table before inserting
      const clearTable = await prismaClient.generateQrCode.deleteMany();
      const generateQR =  prismaClient.generateQrCode;
        await  generateQR.create({
        data:{
          code:qr
        }
      });
      qrcodeG.toFile('qrcode.png', qr);
    });

    this.client.on('ready', () => {
      console.log('Client is ready Just!');
      this.client.on('message', async (message: Message) => {
        await whatsappControl(this.client, message);
      });
    });

    this.client.initialize();
  }
}
