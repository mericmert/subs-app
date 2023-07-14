import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.method === "GET") {

    const { username } = req.query;
    let targetUsername: string | undefined;
    if (typeof username === "string") {
      targetUsername = username;
    }
    else if (Array.isArray(username)) {
      targetUsername = username[0];
    }

    const profile = await client.profile.findUnique({
      where: {
        username: targetUsername
      }
    })

    return res.status(200).json(profile);

  }


  else if (req.method === "POST") {
    const userData = req.body;
    console.log(userData);
    try {
      await client.profile.update({
        where : {
          username : userData.username
        },
        data : {
          fullName : userData.fullName,
          bio : userData.bio
        }
      })
      return res.status(200).end();
    }
    catch (err) {
      return res.status(400).end();
    }
  }
  else {
    return res.status(400).end();
  }


}
