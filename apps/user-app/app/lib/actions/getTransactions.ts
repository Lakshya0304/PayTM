"use server"
import prisma from "@repo/db/client"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getTransactions() {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
   
    const transactions = await prisma.p2pTransfer.findMany({
        where: {
            OR: [{ fromUserId: Number(userId) }, { toUserId: Number(userId) }],
        },
        orderBy: {
            timestamp: "desc",
        },
        include: {
            fromUser: true,
            toUser: true,
        },
    });
    console.log("🚀 ~ getTransactions ~ transactions:", transactions)



    const formattedTransactions = transactions.map((transaction) => {
        const isCredit = transaction.toUserId === userId;
        const type = isCredit ? "Credit" : "Debit";
        const amount = transaction.amount; 

        return {
            type, 
            amount, 
            timestamp: transaction.timestamp,
            counterpart: isCredit? transaction.fromUser.number : transaction.toUser.number, 
        };
    });

    return formattedTransactions;
}
