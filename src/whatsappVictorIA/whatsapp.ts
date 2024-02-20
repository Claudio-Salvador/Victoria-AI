import { prismaClient } from "../DataBase/PrismaClient";
import whatsappControl from "./controllerWhatsap";
import { Client, LocalAuth, Message, MessageMedia } from 'whatsapp-web.js';
const qrcodeG = require('qrcode');
const qrcode = require('qrcode-terminal');

export default class WhatsappInit {
  private client: Client;
  public codeQr: string;
 
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });

    this.initialize();
  }

  private  initialize() {
    this.client.on('qr', (qr: string) => {
      qrcode.generate(qr, { small: true });
        this.codeQr=qr;
      // const generateQR =  prismaClient.generateQrCode;
      //   await  generateQR.create({
      //     data: {
      //     code:qr
      //   }
      // });
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

  public qrcodeText(){
    
      return this.codeQr;
  }
}
