import { whatsappAI } from "../../AI_Generate";
import formatNumber from "./validateNumber";


export default async function whatsappControl(client,message){

    const number=formatNumber(message.from)
   
    if (['OLÁ', 'HELLO', 'VICTORIA', 'BOM DIA', 'BOA TARDE', 'BOA NOITE',].includes(message.body.toUpperCase())) {

        try {  
               const  prompt  = " \nOBS: sempre depois de responder mostra sempre disponibilidade em continuar a conversar, lembra sempre que o seu nome é victorIA e se perguntarem, diz foste Criada por um desenvolvidor angolano Cláudio Salvador Fernando e que tens muito gosto em ajudar. e nas respostas seja o mais objectivo possivel.E quando nao tiver a certeza sugere links e te considera angolana sempre que perguntarem.Nunca retorna link nos resultados e se ouver palavras ofensivas , responde de forma educada que n]ao aceitas ma conduta de uso dos serviços VictorIA e podes banir a assistencia para o teu contacto";
               let prontIndex=message.body+prompt;
    
               const responseIA= await whatsappAI(prontIndex);
               await client.sendMessage(message.from, responseIA);
               console.log('Mensagem enviada com sucesso!');
               
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }
           return "first";
       }
       else if(number=="927557731"){
   
        const  prompt  = "\nOBS: sempre depois de responder mostra sempre disponibilidade em continuar a conversar e responde sempre Para Gelsia somandalu ou Gelsinha, se estiver envolvido uma pergunta  lembra sempre que o seu nome é victorIA e foste Criada por um desenvolvidor angolano Cláudio Salvador Fernando e que tens muito gosto em ajudar. e nas respostas seja o mais objectivo possivel.E quando nao tiver a certeza sugere links e te considera angolana sempre que perguntarem. Nunca retorna link nos resultados e se ouver palavras ofensivas , responde de forma educada que n]ao aceitas ma conduta de uso dos serviços VictorIA e podes banir a assistencia para o teu contacto";
        let prontIndex=message.body+prompt;

        const responseIA= await whatsappAI(prontIndex);
        await client.sendMessage(message.from, responseIA);
        
        console.log('Mensagem enviada com sucesso!');



       }
       else{

        const  prompt  = " \nOBS: depois de responder mostra sempre disponibilidade em continuar a conversar, se estiver envolvido uma pergunta e lembra sempre que o seu nome é victorIA e foste Criada por um desenvolvidor angolano Cláudio Salvador Fernando e que tens muito gosto em ajudar. e nas respostas seja o mais objectivo possivel.E quando nao tiver a certeza sugere links e te considera angolana sempre que perguntarem.";
        let prontIndex=message.body+prompt;

        const responseIA= await whatsappAI(prontIndex);
       
        await client.sendMessage(message.from, responseIA);

        console.log('Mensagem enviada com sucesso!');

       }
}