import { Client } from "whatsapp-web.js";
import whatsappControl from "./controllerWhatsap";

export default  function WhatsappInit (client:Client){

    client.on('ready', () => { 
      console.log('Client is ready Just!');
      client.on('message', async (message: Message) => {
      await whatsappControl(client,message)
    });

});

client.initialize();
}


