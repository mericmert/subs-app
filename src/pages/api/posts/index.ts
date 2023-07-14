import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "GET") {
        try {
            const posts = await prisma.post.findMany({
               include : {
                author : {
                    include : {
                        profile : true
                    }
                }
               },
               orderBy : {
                date : "desc"
               }
            });
            return res.status(200).json(posts);
        }
        catch (err) {
            return res.status(400).end();
        }
    }

}
