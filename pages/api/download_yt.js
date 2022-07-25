// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getLinksDownload} from '../../scripts/downloaderYT';

export default async (req, res) => {
  try {
    await getLinksDownload(req.body.urls);
    res.status(200).json({response: 'OK', data: req.body.urls.length});
  } catch (error) {
    res.status(500).json({response: 'ERROR', error});
  }
};
