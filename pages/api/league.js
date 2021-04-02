import { getMarkets } from '../../scripts/scrapper';

export default async (req, res) => {
  // const data = await getMarkets();

  // const leagues = data.map((x) => {
  //   return {
  //     label: x.league.replace('\n', '').replace('\n', ''),
  //     value: x.league.replace('\n', '').replace('\n', ''),
  //   };
  // });
  const leagues = [];
  res.status(200).json({ leagues });
};
