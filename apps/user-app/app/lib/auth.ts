import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name : {label : "Name" , type:"text" , placeholder: "Your name" , required : true},
            email : {label: "E-mail Id" , type:"text", placeholder: "XXX@mail.com", required : true},
            phone: { label: "Phone number", type: "text", placeholder: "XXX-XXX-XXXX", required: true },
            password: { label: "Password", type: "Password", required: true }
          },
          async authorize(credentials: any) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        number: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        name : credentials.name,
                        email: credentials.email,
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });

                await db.balance.create({
                  data: {
                    userId: user.id, 
                    amount: 1000, 
                    locked: 0, 
                  },
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    number: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}
  