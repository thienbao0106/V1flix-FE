import React from "react";
import Details from "./Details";
import { FiEye } from "react-icons/fi";
import { IImages, ISeries } from "../../interface";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage, placeholder } from "@cloudinary/react";

import PlaceHolder from "../../assets/placeholder_image.jpg";
//hook
import useCheckImage from "../../hook/useCheckImage";
import { slugifyString } from "../../utils/HandleString";

const TopAnimeCard: React.FC<ISeries | any> = ({
  id,
  title,
  status,
  view,
  images,
  rank,
}) => {
  const imageName = images.filter((image: IImages) => image.type === "card")[0]
    ?.name;
  const myImage = new CloudinaryImage(`/anime/card/${imageName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });
  const imgStatus = useCheckImage(myImage.createCloudinaryURL());
  return (
    <div className="flex flex-row w-full h-auto gap-3 bg-mainColor bg-opacity-50">
      <div className="basis-1/5 flex justify-center items-center">
        <span
          className={`${
            parseInt(rank) === 1
              ? "first"
              : parseInt(rank) === 2
              ? "second"
              : parseInt(rank) === 3
              ? "third"
              : "other"
          } text-7xl text-opacityText font-extrabold`}
        >
          {parseInt(rank)}
        </span>
      </div>
      <div className="basis-1/5">
        {imgStatus ? (
          <AdvancedImage
            className="xl:h-full md:h-[200px] h-[130px]"
            cldImg={myImage}
            plugins={[placeholder({ mode: "blur" })]}
          />
        ) : (
          <img
            loading="lazy"
            className="xl:h-[150px] lg:h-[108px]"
            src={PlaceHolder}
            alt="placeholder-img"
          />
        )}
      </div>
      <div className="flex flex-col basis-3/5  w-full  m-auto space-y-3 xl:mx-0 lg:-mx-12 sm:-mx-5 md:mx-0 mx-0">
        <h3 className="xl:text-base lg:text-3xl sm:text-2xl pt-2 text-lg font-semibold line-clamp-1">
          <a href={`/watch?title=${slugifyString(title)}&ep=1`}>{title}</a>
        </h3>
        <div className="flex flex-row items-center justify-between pr-5 py-0.5 mb-3 rounded-b-md">
          <Details type={"TV"} status={status} newep={8} />
        </div>
        <div className="flex flex-row gap-x-2 justify-start items-center">
          <FiEye />
          <span className="text-white">{view}</span>
        </div>
      </div>
    </div>
  );
};

export default TopAnimeCard;
