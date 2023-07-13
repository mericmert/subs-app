import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.method === "GET") {

    const { username } = req.query;
    let targetUsername : string | undefined;
    if (typeof username === "string") {
      targetUsername = username;
    }
    else if (Array.isArray(username)){
      targetUsername = username[0];
    }

    const profile = await client.profile.findUnique({
      where: {
        username: targetUsername
      }
    })

    res.status(200).json(profile);

  }
  else {
    return res.status(400).end();
  }


}
