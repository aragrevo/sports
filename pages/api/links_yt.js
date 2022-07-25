// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getLinksYT} from '../../scripts/downloaderYT';

export default async (req, res) => {
  try {
    const data = await getLinksYT(req.body.url);
    res.status(200).json({response: 'OK', data});
  } catch (error) {
    res.status(500).json({response: 'ERROR', error});
  }
};
