import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import client from "@/lib/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>) {
    
    if (req.method !== "POST") return res.status(405).end();

    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await client.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            },
        })

        return res.status(200).json(user);

    }
    catch (error) {
        console.log(error);
        return res.status(400).end();
    }


}
