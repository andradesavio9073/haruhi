import Marquee from "./Marquee";
import { Studio } from "~/__generated__/graphql";

export type Props = {
  data: Studio;
};

export default (props: Props) => {
  return (
    <div className="group relative grid grid-cols-4 place-content-center @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-8">
      {/* Image */}
      <div className="relative">
        {/* <Image
          draggable={false}
          className="col-span-1 object-contain"
          src={props.data.image?.medium!}
          alt={`Cover of ${props.data.name?.userPreferred}`}
          // objectFit="cover"
          fill
        /> */}
      </div>
      {/* Content */}
      <div className="col-span-full col-start-2 grid grid-flow-col grid-rows-[auto_1fr_auto] items-center">
        {/* Title */}
        <Marquee href={`/studio/${props.data?.id}`}>{props.data.name}</Marquee>
        {/* Description
        <div
          className="line-clamp-3 h-20 overflow-hidden p-1 md:line-clamp-4 md:h-24"
          dangerouslySetInnerHTML={{ __html: props.data.description! }}
        ></div> */}
      </div>
    </div>
  );
};
