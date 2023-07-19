import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import client from "@/lib/prismadb";
import { Prisma, User } from "@prisma/client";




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>) {

    if (req.method !== "POST") return res.status(405).end();

    try {
        await client.$transaction(async () => {
            const { email, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await client.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword
                },
            })

            //associated profile
            await client.profile.create({
                data: {
                    id : user.id,
                    fullName: username,
                }
            })
            res.status(200).json(user);

        })
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(409).end()
        }
        else {
            res.status(400).end();
        }
    }


}
