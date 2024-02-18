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
export const generateResponse = async (req, res) => {
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