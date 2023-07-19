import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.method === "GET") {

    const { username } = req.query;
    const target_username: string | undefined = Array.isArray(username) ? username[0] : username;
    try {
      const profile = await client.user.findUniqueOrThrow({
        where: {
          username: target_username
        },
        select: {
          profile: true,
          username: true
        }
      });
      res.status(200).json(profile);
    }
    catch (err) {
      console.log(err);
      res.status(400).end();
    }


  }


  else if (req.method === "POST") {
    const userData = req.body;
    try {
      await client.user.update({
        where: {
          username: userData.username
        },
        data: {
          profile: {
            update: {
              fullName: userData.fullName,
              bio: userData.bio,
              imageUrl: userData.imageUrl
            }
          }
        },
        include: {
          profile: true
        }
      })
      res.status(200).end();
    }
    catch (err) {
      res.status(400).end();
    }
  }
  else {
    res.status(400).end();
  }


}
