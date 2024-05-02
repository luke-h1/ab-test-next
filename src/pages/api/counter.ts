import redis from "@/util/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const KEY = 'new-design-experiment';

  // would need to set custom redis keys if we were running multiple experiments
  switch (req.method) {
    case "GET":
      const response = (await redis.get(KEY)) || "0";
      console.info("[GET counter]: Retreived count", response);
      return res.status(200).json({ count: response });

    case "POST":
      const count = await redis.incr(KEY);
      console.info("[POST counter]: Incremented count", count);
      return res.status(200).json({ count });

    case "DELETE":
      const delCount = await redis.del(KEY);
      console.info("[DELETE counter]: Deleted count", delCount);
      return res.status(200).json({ count: 0 });

    default:
      return res.status(405).end();
  }
}
