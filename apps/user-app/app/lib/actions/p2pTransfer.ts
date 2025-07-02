"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user.id;

    if(!from){
        return {
            message : "Error sender user side while sending"
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number : to 
        }
    })

    if(!toUser){
        return {
            message : "Error User not found to send money"
        }
    }

    try {
      await prisma.$transaction(async (rs) => {
        const fromSenderBalance = await rs.balance.findUnique({
          where: {
            userId: Number(from),
          },
        });

        if (!fromSenderBalance || fromSenderBalance.amount < amount) {
          throw new Error("Insufficient funds");
        }

        await rs.balance.update({
          where: {
            userId: Number(from),
          },
          data: {
            amount: {
              decrement: amount,
            },
          },
        });
        await rs.balance.update({
          where: {
            userId: toUser.id,
          },
          data: {
            amount: {
              increment: amount,
            },
          },
        });

        await rs.p2pTransfer.create({
          data: {
            fromUserId: Number(from),
            toUserId: toUser.id,
            amount: amount,
            timestamp: new Date(),
          },
        });
        console.log("Transaction performed!")
      });
    } catch (error) {
        console.error("Error during P2P transfer:", error);
        return {
            message: "An error occurred while processing the transaction.",
        };
    }
    
}
