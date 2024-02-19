import { whatsappAI } from "../../AI_Generate";
import DataBase from "../DataBase/databaseHistory";
import formatNumber from "./validateNumber";



export default async function whatsappControl(client,message){

    const number=formatNumber(message.from)
    const db = new DataBase();
    const Auth = await FindUserAuth(number,db);

    if (Auth) {

        try {  
            let Mensagem:string=message.body;
            const history=await db.GetHistoryByUser(Auth.id);
            const UHistory:[]=history.UHistory.map((item)=>{return item.text});
            const MHistory:[]=history.MHistory.map((item)=>{return item.text});

            const responseIA= await whatsappAI(Mensagem,UHistory,MHistory);
           
                if(responseIA.length) {
                    await db.StoreHistoryUser(Auth.id,Mensagem)
                    await db.StoreHistoryVictorIA(Auth.id,responseIA)
                    await client.sendMessage(message.from, responseIA);
                    console.log('Mensagem enviada com sucesso!');
                }

            } catch (error) {
                const sms="Peço desculpa mais não consegui entender o que disseste, podes por favor repetir ou formular melhor a sua questão ☺👧🏿\n\n Sou a VictorIA, portanto da próxima faço um esforço para te entender melhor 😇🙌";
                await client.sendMessage(message.from, sms);
                console.error('Erro ao enviar mensagem:', error);
            }
           return "first";
       }

     else{
         let prontIndex="Olá! Sou a VitorIA, a mais nova assistente virtual desenvolvida em Angola, Estou em faze expermental no entanto, apenas alguns contactos selecionados estão apto para testarem as minhas capacidades como assistente.\n\nDentro em breve estaremos aberto para todos e poderás testar também.\n\nAté lá!me despeço de ti🤗 \n VictorIA - a sua assistente.";
         await client.sendMessage(message.from, prontIndex);
         console.log('Mensagem enviada com sucesso!');

       }
}

async function FindUserAuth(NumerWhatsapp: string,db): object | undefined {

    const AllUser = await db.GetAllUsers();
    const User = AllUser.find(objeto => objeto.whatsapp === NumerWhatsapp);
    return User;

}