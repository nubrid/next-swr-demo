// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import posts from './posts.json'

export default function handler(req: NextApiRequest, res: NextApiResponse<string[]>) {
	res.status(200).json([...new Set(posts.data?.map(({ tag }) => tag))])
}
