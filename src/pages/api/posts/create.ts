import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "POST") {
        const post_data = {
            username: req.body.username,
            text_content: req.body.text_content,
            imageUrl: req.body.imageUrl,
            date: new Date()
        }
        try {
            await prisma.post.create({
                data: {
                    text_content : post_data.text_content,
                    imageUrl : post_data.imageUrl,
                    date : post_data.date,
                    author : {
                        connect : {
                            username : post_data.username
                        }
                    }
                }
            });
            res.status(200).end();
        }
        catch (err) {
            console.log(err);
            res.status(400).end();
        }
    }

}
