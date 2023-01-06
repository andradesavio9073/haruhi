import DefaultTags from "../../DefaultTags";

export default async function Head({ params }: { params: { slug: string } }) {
  const data = await fetch(
    `${process.env.NEXT_SERVER}/api/getStudio?id=${params.slug}`
  ).then((res) => res.json());
  return (
    <>
      <DefaultTags />
      <title>{data.data.Studio.name}</title>
      <meta property="og:title" content={data.data.Studio.name} />
    </>
  );
}
