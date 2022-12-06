import type { NextApiRequest, NextApiResponse } from "next";
import makeQuery from "../../utils/makeQuery";

type Response = {} | [{}];

const getSeason = () => {
  let currentTime = new Date();
  let currentYear = currentTime.getUTCFullYear();

  var seasonArray = [
    {
      name: "SPRING",
      date: new Date(
        currentTime.getFullYear(),
        2,
        currentTime.getFullYear() % 4 === 0 ? 19 : 20
      ).getTime(),
    },
    {
      name: "SUMMER",
      date: new Date(
        currentTime.getFullYear(),
        5,
        currentTime.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime(),
    },
    {
      name: "FALL",
      date: new Date(
        currentTime.getFullYear(),
        8,
        currentTime.getFullYear() % 4 === 0 ? 22 : 23
      ).getTime(),
    },
    {
      name: "WINTER",
      date: new Date(
        currentTime.getFullYear(),
        11,
        currentTime.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime(),
    },
  ];
  let season = seasonArray
    .filter(({ date }) => date <= currentTime.getTime())
    .slice(-1)[0] || { name: "WINTER" };
  return { season: season.name, year: currentYear };
};

const getAiring = (media: any) => {
  const airingSchedule = media.airingSchedule;
  delete media.airingSchedule;
  const nextAiringIndex = airingSchedule.edges.findIndex(
    (element: any) => element.node.timeUntilAiring > 0
  );
  media["nextAiring"] = airingSchedule.edges[nextAiringIndex]
    ? airingSchedule.edges[nextAiringIndex]
    : null;
  return media;
};

//api/getTrending?{?season}&type={ANIME/MANGA}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.query.type) {
    const shouldGetSeason = req.query.season !== undefined;
    const { season, year } = getSeason();
    const query = `query getMediaTrend {
        Page(perPage: 25){
          pageInfo{
            hasNextPage
          }
          media(sort:[POPULARITY_DESC], type:${req.query.type}, ${
      shouldGetSeason ? `season: ${season}` : ""
    },  ${shouldGetSeason ? `seasonYear: ${year}` : ""}) {
            id
            type
            description
            chapters
            title{
              userPreferred
            }
            format
            episodes
            status
            coverImage{
              large
            }
            mediaListEntry{
              progress
              status
            }
            airingSchedule {
              edges {
                node {
                  airingAt
                  timeUntilAiring
                  episode
                }
              }
            }
          }
        }
        }`;
    let data = await makeQuery({
      query,
      variables: {},
      token: req.cookies.access_token,
    });
    res.status(200).json(data.data.Page.media.map((el: any) => getAiring(el)));
  } else {
    res.status(400).json({ error: "type must be speicifed" });
  }
}
