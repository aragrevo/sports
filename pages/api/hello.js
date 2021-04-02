// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAllMarkets } from '../../scripts/scrapper';

export default async (req, res) => {
  // const leagues = JSON.parse(req.body);
  // const data = await getAllMarkets(leagues);
  const data = [];
  res.status(200).json({ data });
};
