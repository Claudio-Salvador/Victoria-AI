"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/DataBase/databaseHistory.ts
var databaseHistory_exports = {};
__export(databaseHistory_exports, {
  default: () => DataBase
});
module.exports = __toCommonJS(databaseHistory_exports);

// src/DataBase/PrismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

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
  async StoreUser(name, whatsapp) {
    const newUser = await prismaClient.user.create({
      data: {
        whatsapp,
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
