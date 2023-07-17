import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/lib/prismadb";
import {compare} from 'bcrypt';

export const authOptions: AuthOptions = {
    secret : process.env.NEXTAUTH_URL,
    providers: [
        CredentialsProvider({
            name: "credentials",
            id: "credentials",
            credentials: {
                email: { label: "E-mail", type: "email", placeholder: "E-mail" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                let user;
                try {
                    user = await client.user.findUnique({
                        where: {
                            email: credentials?.email
                        }
                    })
                }
                catch (err) {
                    console.log(err);
                    throw Error("Internal server error. Please try again later");
                }
                if (!user) throw Error("User not found!");
                if (!credentials) throw Error("No credentials!");
                if (!user.password) throw Error("Incorrect password!");

                const isPasswordMatched = await compare(credentials.password, user.password);
                
                if (!isPasswordMatched) {
                    throw Error("Invalid password!");
                }
                console.log("signed in");
                return {
                    id : user.id.toString(),
                    email : user.email,
                    username: user.username
                }
            },
        })
    ],
    callbacks : {
        async jwt({token, user, account}){
            if (user) {
                token.username = user.username
            }
            return token;
        },
        async session({session, token, user}){
            session.user = token;
            return session;
        }
    },
    pages : {
        signIn : "/"
    },
    session : {
        strategy : "jwt",
        maxAge : 30 * 24 * 60 * 60
    }

}

export default NextAuth(authOptions);

