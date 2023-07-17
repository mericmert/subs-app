import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "GET") {
        try {
            const { username } = req.query;
            let targetUsername: string | undefined;
            if (typeof username === "string") {
                targetUsername = username;
            }
            else if (Array.isArray(username)) {
                targetUsername = username[0];
            }
            const posts = await prisma.post.findMany({
                where: {
                    username: targetUsername
                },
                include: {
                    author: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    date: "desc"
                }
            });
            if (posts) res.status(200).json(posts);
        }
        catch (err) {
            res.status(400).end();
        }
    }

}
