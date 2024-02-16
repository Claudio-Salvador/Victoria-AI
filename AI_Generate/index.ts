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
            console.log(chunkText);
            text += chunkText;
        }

        res.send({ response: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
