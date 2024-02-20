import { prismaClient } from "./PrismaClient";

export default async function DeleteHistory(id: string): Promise<void> {


    const uHistory =  prismaClient.userHistory;
    const MHistory =  prismaClient.victoriaHistory;

        await uHistory.deleteMany({
            where: {
              userId:id,
            },
          });

        await MHistory.deleteMany({
            where: {
              userId:id,
            },
          });

}