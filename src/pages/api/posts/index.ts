import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { Post } from "@prisma/client";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Post[]>
) {
    if (req.method === "GET") {
        try {
            const posts = await prisma.post.findMany({
               include : {
                    author : {
                        select : {
                            username : true,
                            profile : {
                                select : {
                                    fullName : true,
                                    imageUrl: true
                                }
                            }
                        }
                    }
               },
               orderBy : {
                    date : "desc"
               }
               
            });
            if (posts) res.status(200).json(posts);
        }
        catch (err) {
            res.status(400).end();
        }
    }

}
