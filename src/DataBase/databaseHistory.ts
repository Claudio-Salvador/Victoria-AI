
import { prismaClient } from "./PrismaClient";

export default class DataBase{
    private Users =  prismaClient.user;
    

    async StoreHistoryUser(userId:string,text:string): Promise<object>{

        const userHistory=prismaClient.userHistory.create({
                data:{
                    userId,
                    text
                }
         });
         return userHistory;
      

    }
    async StoreHistoryVictorIA(userId:string,text:string): Promise<object>{

            const modeHistory=prismaClient.victoriaHistory.create({
                data:{
                    userId,text
                }
            });
            return modeHistory;
        }

    
    async StoreUser(name:string,whatsapp:string): Promise<object>{
        const newUser= await prismaClient.user.create({
            data:{
                whatsapp,
                name
            }
        });

        return newUser;
    }
    async GetAllUsers(): Promise<object>{
        return  this.Users.findMany();
    }
    async GetHistoryByUser(idUser:string): Promise<object>{
        const Uhistory= await prismaClient.userHistory.findMany({
            where: {
                userId: idUser
            },
            select: {
                text:true
            }

        });
        const Mhistory = await prismaClient.victoriaHistory.findMany({
            where: {
                userId: idUser
            },
            select: {
                text:true
            }
        });
        return {"UHistory":Uhistory,"MHistory":Mhistory};
    }



}