import NextAuth from "next-auth/next";

declare module "next-auth" {

    /* Asugmenting Default User interface */
    interface User {
        username : String;
    }
    interface Session {
        username : String;
    }
    
}