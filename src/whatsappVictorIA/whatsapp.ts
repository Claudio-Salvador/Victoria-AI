import { prismaClient } from "../DataBase/PrismaClient";
import whatsappControl from "./controllerWhatsap";
import { Client, LocalAuth, Message } from 'whatsapp-web.js';
const qrcodeG = require('qrcode');
const qrcode = require('qrcode-terminal');

export default class WhatsappInit {
  private client: Client; 
  public codeQr: string;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });
    this.codeQr = ".";
    this.initialize();
  }

  public initialize(): Promise<string> {
    return new Promise((resolve) => {
      this.client.on('qr', (qr: string) => {
        qrcode.generate(qr, { small: true });
        this.codeQr = qr;
        this.qrcodeText();
        console.log(qr);
        qrcodeG.toFile('qrcode.png', qr);
        resolve(qr); // Resolvendo a Promise com o valor do QR code
      });

      this.client.on('ready', () => {
        console.log('Client is ready Just!');
        this.client.on('message', async (message: Message) => {
          await whatsappControl(this.client, message);
        });
      });
  
      this.client.initialize();
    });
  }

  public async qrcodeText(): Promise<string> {
    return this.codeQr;
  }
}
