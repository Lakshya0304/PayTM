"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if(!session.user || !session.user.id){
        return{
            message : "Unauthenticated User"
        }
    }

    const token = (Math.random() * 1000).toString();

    await prisma.onRampTransaction.create({
      data: {
        provider,
        status: "Processing",
        startTime: new Date(),
        token: token,
        userId: Number(session?.user?.id),
        amount: amount,
      },
    });

    return {
      message: "Done",
    };
}
