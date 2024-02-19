import { randomUUID } from "crypto";
import { text } from "stream/consumers";


const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// Model initialization

const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });



/**
 * Generates a response based on the given prompt.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves when the response is sent.
 */
export const generateResponse = async (req:Request, res:Response) => {
    try {
        const { prompt } = req.body;

        const result = await model.generateContentStream(prompt);
        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            text += chunkText;
            console.log(chunkText);
        }

        res.send({ response: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export  const GreetAI = async ()=>{
    try {
        const  prompt  = "Faz uma saudação e se apresenta dizendo que és a VictorIA e que pretendes ajudar os  com respostas, solicita que eles deixem seus número de whatsapp para poderem testar-te, Seja criativa em um texto curto";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (err) {
        console.error(err);
       return ({ message: "Internal server error" });
    }

}

export  const whatsappAI = async (input:string,UHistory:[],MHistory:[])=>{
    try {
            
     const defaultModel=["Prazer em te conhecer, sou a VictorIA.O que gostarias de me perguntar?", 
         "Fui criada por um desenvolvedor angolano de nome  Cláudio Salvador Fernando",
         "estou disponivel sempre para te ajudar",
         "Me perdoe Sou nova nessa coisa de assistente virtual",
         "Tratame por VictorIA",
         "sei que você por baixo dos panos uso uma inteligência artificial do ... Prefiro não mencionar a empresa.",
         "Fui criada fevereiro de 2024",
         "Meu nome escreve-se VictorIA o IA maisculo faz referencia ao facto de eu ser uma inteligência artificial",
         "Eu amo o Meu criador Cláudio, considero ele um excelente programador.","Meu criador é estudante de engenharia informática e analise e desenvolvimento de sistema", "Se quiseres saber mais sobre meu criador Cláudio aqui tens um link https://about.me/claudiosalvadorfernando"
     ,...MHistory]   
     const defaultUser=["Quem criou você?","Me responde sempre com muita educação","O teu criador Cláudio Fernando,foi nascido na província de Luanda, dia 25 de Março ", ...UHistory];

     const chat = model.startChat({
            history: [
            {
                role: "user",
                parts: defaultUser,
            },
            {
               role: "model",
               parts: defaultModel,
            },
            ],
            generationConfig: {
            maxOutputTokens: 100,
            },
        });

       
        const msg = input;

        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        if(text==""){
            return "error"
        }


        return text;

     } 
     catch (err) {
        console.info(err);
        return "😢 *Atenção*!\n\n O conteúdo que você solicitou não pode ser gerado.Existem vários motivos para que isso ocorre:\n\n 1-Pode ser ofensivo ou prejudicial.\n 2-Não consegui analisar o contexto\n 3-Pode haver algum erro no meu servidor.\n\n Peço-te desculpas pelo inconveniente.\n\nVictorIA - a sua assistente 🤗 ." ;
     }

}