import { MediaSort } from "~/__generated__/graphql";
import CardCarosel, { Props as CCProps } from "../CardCarosel";
import { Category } from "~/types.shared/anilist";
import { api } from "~/trpc/server";

const Segment = ({
  title,
  data,
  type,
}: {
  title: string;
  data: CCProps["data"];
  type: Category.anime | Category.manga;
}) => {
  return (
    <div className="w-full bg-offWhite-50 px-2 dark:bg-offWhite-800">
      <div className="px-2 pt-2 text-xl font-medium">{title}</div>
      <CardCarosel type={type} data={data} />
    </div>
  );
};

export default async () => {
  const data_seasonal_trending = await api.anilist.getTrendingAnime.query({
    seasonal: true,
    sort: MediaSort.TrendingDesc,
  });
  const data_popularity = await api.anilist.getTrendingAnime.query({
    seasonal: false,
    sort: MediaSort.PopularityDesc,
  });
  const data_popularity_manga = await api.anilist.getTrendingManga.query({
    sort: MediaSort.PopularityDesc,
  });

  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <Segment
        title="Trending Anime This Season"
        data={data_seasonal_trending?.Page.data as CCProps["data"]}
        type={Category.anime}
      />
      <Segment
        title="Trending Anime of All Time"
        data={data_popularity?.Page.data as CCProps["data"]}
        type={Category.anime}
      />
      <Segment
        title="Trending Manga of All Time"
        data={data_popularity_manga?.Page.data as CCProps["data"]}
        type={Category.manga}
      />
    </div>
  );
};
