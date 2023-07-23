import React, { useEffect, useRef } from "react";
//lib
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

import { CiPlay1 } from "react-icons/ci";
import Details from "./Details";
//lib
import { gsap, CSSPlugin } from "gsap";
//interface
import { IImages, ISeries } from "../../interface";
//utils
import { slugifyString } from "../../utils/HandleString";
import PlaceHolder from "../../assets/placeholder_image.jpg";
import useCheckImage from "../../hook/useCheckImage";
import { checkVisibility } from "../../utils/HandlePost";

const Card: React.FC<ISeries | any> = ({
  id,
  title,
  images,
  type,
  total_episodes,
  status,
}) => {
  const imageName = images.filter(
    (image: IImages) => image.type === "thumbnail"
  )[0]?.name;
  const myImage = new CloudinaryImage(`/anime/thumb/${imageName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });
  const cardRef = useRef<any>(null);
  const imgStatus = useCheckImage(myImage.createCloudinaryURL());

  // useEffect(() => {
  //   gsap.registerPlugin(CSSPlugin);
  //   const handleScroll = () => {
  //     const check = checkVisibility(cardRef);
  //     if (check) {
  //       gsap.fromTo(
  //         cardRef.current,
  //         { opacity: 0 },
  //         { opacity: 1, duration: 0.2 }
  //       );
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className="flex flex-col w-full">
      <div
        onMouseEnter={() => {
          if (cardRef.current)
            cardRef.current.imageRef.current.style.opacity = 0.5;
        }}
        onMouseLeave={() => {
          if (cardRef.current)
            cardRef.current.imageRef.current.style.opacity = 1;
        }}
        className="relative group "
      >
        {images.length > 0 && (
          <>
            <a href={`/watch?title=${slugifyString(title)}&ep=1`}>
              {imgStatus ? (
                <AdvancedImage ref={cardRef} cldImg={myImage} />
              ) : (
                <img
                  loading="lazy"
                  className="lg:h-[348px]"
                  src={PlaceHolder}
                  alt="placeholder-img"
                />
              )}
            </a>
          </>
        )}

        <div className="absolute top-1/2 lg:left-1/3 md:left-1/4 sm:left-[4.5rem] left-[75px] group-hover:translate-x-4 group-hover:duration-1000 opacity-0  group-hover:opacity-100 group-hover:cursor-pointer">
          <CiPlay1 fontSize={50} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between bg-mainColor px-2 py-0.5 mb-3 rounded-b-md">
        <Details newep={total_episodes} type={type} status={status} />
      </div>
      <h3 className="lg:text-xl text-lg w-full line-clamp-2">{title}</h3>
    </div>
  );
};

export default Card;
