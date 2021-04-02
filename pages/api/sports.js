// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getMatchesByDate } from '../../scripts/matchesByDate';

export default async (req, res) => {
  const { date, sports } = JSON.parse(req.body);
  console.log(date, sports);

  const data = sports.map((sport) => {
    const tmpData = getMatchesByDate(
      date,
      sport,
      [],
      `/es/calendar?date=${date}&sport_code=${sport}`
    );
    return tmpData;
  });

  Promise.all(data).then((resp) => {
    res.status(200).json({ data: resp });
  });
};
