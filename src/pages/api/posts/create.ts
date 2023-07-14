import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "POST") {
        const post_data = {
            ...req.body,
            date : new Date() 
        } 
        try {
            await prisma.post.create({
                data : post_data
            });
            return res.status(200).end();
        }
        catch (err) {
            console.log(err);
            return res.status(400).end();
        }
    }

}
