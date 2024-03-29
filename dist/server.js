"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// AI_Generate/index.ts
var { GoogleGenerativeAI } = require("@google/generative-ai");
var dotenv = require("dotenv");
dotenv.config();
var configuration = new GoogleGenerativeAI(process.env.API_KEY);
var modelId = "gemini-pro";
var model = configuration.getGenerativeModel({ model: modelId });
var generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContentStream(prompt);
    let text = "";
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
var GreetAI = async () => {
  try {
    const prompt = "Faz uma sauda\xE7\xE3o e se apresenta dizendo que \xE9s a VictorIA e que pretendes ajudar os  com respostas, solicita que eles deixem seus n\xFAmero de whatsapp para poderem testar-te, Seja criativa em um texto curto";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (err) {
    console.error(err);
    return { message: "Internal server error" };
  }
};
var whatsappAI = async (input, UHistory, MHistory) => {
  try {
    const defaultModel = [
      "Prazer em te conhecer, sou a VictorIA.O que gostarias de me perguntar?",
      "Fui criada por um desenvolvedor angolano de nome  Cl\xE1udio Salvador Fernando",
      "estou disponivel sempre para te ajudar",
      "Me perdoe Sou nova nessa coisa de assistente virtual",
      "Tratame por VictorIA",
      "sei que voc\xEA por baixo dos panos uso uma intelig\xEAncia artificial do ... Prefiro n\xE3o mencionar a empresa.",
      "Fui criada fevereiro de 2024",
      "Meu nome escreve-se VictorIA o IA mai\xFAsculo faz refer\xEA ncia ao facto de eu ser uma intelig\xEAncia artificial",
      "Eu amo o Meu criador Cl\xE1udio, considero ele um excelente programador.",
      "Meu criador \xE9 estudante de engenharia inform\xE1tica e analise e desenvolvimento de sistema",
      "Se quiseres saber mais sobre meu criador Cl\xE1udio aqui tens um link https://about.me/claudiosalvadorfernando",
      ...MHistory
    ];
    const defaultUser = ["Quem criou voc\xEA?", "Me responde sempre com muita educa\xE7\xE3o", "O teu criador Cl\xE1udio Fernando,foi nascido na prov\xEDncia de Luanda, dia 25 de Mar\xE7o ", ...UHistory];
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: defaultUser
        },
        {
          role: "model",
          parts: defaultModel
        }
      ],
      generationConfig: {
        maxOutputTokens: 100
      }
    });
    const msg = input;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    if (text == "") {
      const result2 = await model.generateContent(input);
      const response2 = await result2.response;
      const text2 = response2.text();
      return text2;
    }
    return text;
  } catch (err) {
    console.info(err);
    return "\u{1F622} *Aten\xE7\xE3o*!\n\n O conte\xFAdo que voc\xEA solicitou n\xE3o pode ser gerado.Existem v\xE1rios motivos para que isso ocorre:\n\n 1-Pode ser ofensivo ou prejudicial.\n 2-N\xE3o consegui analisar o contexto\n 3-Pode haver algum erro no meu servidor.\n\n Pe\xE7o-te desculpas pelo inconveniente.\n\nVictorIA - a sua assistente \u{1F917} .";
  }
};

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_dotenv = require("dotenv");
var import_cors = __toESM(require("@fastify/cors"));

// src/DataBase/PrismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/DataBase/UserDeleteHistory.ts
async function DeleteHistory(id) {
  const uHistory = prismaClient.userHistory;
  const MHistory = prismaClient.victoriaHistory;
  await uHistory.deleteMany({
    where: {
      userId: id
    }
  });
  await MHistory.deleteMany({
    where: {
      userId: id
    }
  });
}

// src/DataBase/databaseHistory.ts
var DataBase = class {
  constructor() {
    this.Users = prismaClient.user;
  }
  async StoreHistoryUser(userId, text) {
    const userHistory = prismaClient.userHistory.create({
      data: {
        userId,
        text
      }
    });
    return userHistory;
  }
  async StoreHistoryVictorIA(userId, text) {
    const modeHistory = prismaClient.victoriaHistory.create({
      data: {
        userId,
        text
      }
    });
    return modeHistory;
  }
  async StoreUser(name, whatsapp2) {
    const newUser = await prismaClient.user.create({
      data: {
        whatsapp: whatsapp2,
        name
      }
    });
    return newUser;
  }
  async GetAllUsers() {
    return this.Users.findMany();
  }
  async GetHistoryByUser(idUser) {
    const Uhistory = await prismaClient.userHistory.findMany({
      where: {
        userId: idUser
      },
      select: {
        text: true
      }
    });
    const Mhistory = await prismaClient.victoriaHistory.findMany({
      where: {
        userId: idUser
      },
      select: {
        text: true
      }
    });
    return { "UHistory": Uhistory, "MHistory": Mhistory };
  }
};

// src/whatsappVictorIA/validateNumber.ts
function formatNumber(phoneNumber) {
  const numberWithoutCUs = phoneNumber.replace(/@c.us/g, "");
  const numberWithoutPrefix = numberWithoutCUs.startsWith("244") ? numberWithoutCUs.substring(3) : numberWithoutCUs;
  return numberWithoutPrefix;
}

// src/whatsappVictorIA/controllerWhatsap.ts
async function whatsappControl(client, message) {
  const number = formatNumber(message.from);
  const db = new DataBase();
  const Auth = await FindUserAuth(number, db);
  if (Auth) {
    try {
      let Mensagem = message.body;
      const history = await db.GetHistoryByUser(Auth.id);
      const UHistory = history.UHistory.map((item) => {
        return item.text;
      });
      const MHistory = history.MHistory.map((item) => {
        return item.text;
      });
      if (UHistory.length > 20) {
        await DeleteHistory(Auth.id);
      }
      ;
      const responseIA = await whatsappAI(Mensagem, UHistory, MHistory);
      if (responseIA.length) {
        await db.StoreHistoryUser(Auth.id, Mensagem);
        await db.StoreHistoryVictorIA(Auth.id, responseIA);
        await client.sendMessage(message.from, responseIA);
        console.log("Mensagem enviada com sucesso! Para: " + Auth.name);
      }
    } catch (error) {
      const sms = "Pe\xE7o desculpa mais n\xE3o consegui entender o que disseste, podes por favor repetir ou formular melhor a sua quest\xE3o \u263A\u{1F467}\u{1F3FF}\n\n Sou a VictorIA, portanto da pr\xF3xima fa\xE7o um esfor\xE7o para te entender melhor \u{1F607}\u{1F64C}";
      await client.sendMessage(message.from, sms);
      console.error("Erro ao enviar mensagem:", error);
    }
    return "first";
  } else {
    let prontIndex = "Ol\xE1! Sou a VitorIA, a mais nova assistente virtual desenvolvida em Angola, Estou em faze expermental no entanto, apenas alguns contactos selecionados est\xE3o apto para testarem as minhas capacidades como assistente.\n\nDentro em breve estaremos aberto para todos e poder\xE1s testar tamb\xE9m.\n\nAt\xE9 l\xE1!me despe\xE7o de ti\u{1F917} \n VictorIA - a sua assistente.";
    await client.sendMessage(message.from, prontIndex);
    console.log("Mensagem enviada com sucesso!");
  }
}
async function FindUserAuth(NumerWhatsapp, db) {
  const AllUser = await db.GetAllUsers();
  const User = AllUser.find((objeto) => objeto.whatsapp === NumerWhatsapp);
  return User;
}

// src/whatsappVictorIA/whatsapp.ts
var import_whatsapp_web = require("whatsapp-web.js");
var qrcodeG = require("qrcode");
var qrcode = require("qrcode-terminal");
var WhatsappInit = class {
  constructor() {
    this.client = new import_whatsapp_web.Client({
      authStrategy: new import_whatsapp_web.LocalAuth()
    });
    this.codeQr = ".";
    this.initialize();
  }
  initialize() {
    return new Promise((resolve) => {
      this.client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
        this.codeQr = qr;
        this.qrcodeText();
        console.log(qr);
        qrcodeG.toFile("qrcode.png", qr);
        resolve(qr);
      });
      this.client.on("ready", () => {
        console.log("Client is ready Just!");
        this.client.on("message", async (message) => {
          await whatsappControl(this.client, message);
        });
      });
      this.client.initialize();
    });
  }
  async qrcodeText() {
    return this.codeQr;
  }
};

// src/server.ts
(0, import_dotenv.config)();
var whatsapp = new WhatsappInit();
var textQr;
whatsapp.initialize().then((qrCode) => {
  textQr = qrCode;
});
var showQRCode = (req, reply) => {
  reply.sendFile("qrcode.png");
};
var PORT = process.env.PORT;
var server = (0, import_fastify.default)();
var greetText;
var greet = async () => {
  greetText = await GreetAI();
};
greet();
setInterval(async () => {
  greet();
}, 6e4);
server.register(import_cors.default, {
  origin: true
});
server.register(require("@fastify/view"), {
  engine: {
    ejs: require("ejs")
  },
  templates: "public"
});
server.get("/qr-code", showQRCode);
server.get("/", (req, reply) => {
  reply.view("index.ejs", { text: greetText, qr: textQr });
});
server.post("/generateRecipe", generateResponse);
server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3e3
});
console.log(`Server is listening on ${PORT}`);
