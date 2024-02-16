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

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_dotenv = require("dotenv");
var import_cors = __toESM(require("@fastify/cors"));

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
      console.log(chunkText);
      text += chunkText;
    }
    res.send({ response: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// src/server.ts
(0, import_dotenv.config)();
var PORT = process.env.PORT;
var server = (0, import_fastify.default)();
server.register(import_cors.default, {
  origin: true
});


server.get("/", async () => {
  return "Hello, world!";
});


server.post("/generateRecipe", generateResponse);
server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3e3
});
