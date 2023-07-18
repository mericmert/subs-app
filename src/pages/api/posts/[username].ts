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
            const target_username: string | undefined = Array.isArray(username) ? username[0] : username;
            const posts = await prisma.post.findMany({
                where: {
                    author: {
                        username: target_username
                    }
                },
                include: {
                    author: {
                        select: {
                            username: true,
                            profile: {
                                select: {
                                    fullName: true,
                                    imageUrl: true
                                }
                            }
                        },
                    }
                },
                orderBy: {
                    date: "desc"
                }
            });
            if (posts) res.status(200).json(posts);
        }
        catch (err) {
            console.log(err)
            res.status(400).end();
        }
    }

}
