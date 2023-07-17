import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";

declare module "next-auth" {

    interface User {
        username? : String;
    }

    interface Session {
        user? : {
            username? : string;
        } & DefaultSession["user"]
    }

}