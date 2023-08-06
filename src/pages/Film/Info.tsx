import React, { useState, useEffect } from "react";
//interfaces
import { IImages, ISeries } from "../../interface";
//components
import UserFilmSetting from "./UserFilmSetting";
//others
import { account } from "../../utils/Storage";
import axios from "axios";
//lib
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import useCheckImage from "../../hook/useCheckImage";
import PlaceHolder from "../../assets/placeholder_image.jpg";

const Info: React.FC<ISeries> = ({
  id,
  images,
  description,
  title,
  type,
  view,
  total_episodes,
  status,
  alt_title,
}) => {
  const [settingMenu, setSettingMenu] = useState<boolean>(false);
  const [isSeeMore, setSeeMore] = useState<boolean>(true);

  const [genersList, setGeneresList] = useState<any>([]);
  //add and remove scroll-bar
  if (settingMenu) {
    document.body.classList.add("overflow-hidden");
    window.scrollTo(0, 0);
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/film/get-geners/${id}`
      );
      setGeneresList(response.data.listFilmsGeners);
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [id]);
  const imageName = images.filter((image: IImages) => image.type === "card")[0]
    ?.name;

  const myImage = new CloudinaryImage(`/anime/card/${imageName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });
  const imgStatus = useCheckImage(myImage.createCloudinaryURL());

  return (
    <>
      {settingMenu && (
        <UserFilmSetting
          images={images}
          title={title}
          status={status}
          id={id}
          setMenu={setSettingMenu}
        />
      )}
      <main className="flex lg:flex-row md:flex-row flex-col w-full gap-x-4 bg-opacityText p-4 rounded-lg">
        <section aria-label="image" className="basis-1/5 ">
          {imgStatus ? (
            <AdvancedImage
              cldImg={myImage}
              alt={`img-${id}`}
              className="w-full md:h-full h-[200px] object-cover"
            />
          ) : (
            <img
              loading="lazy"
              className="w-[177px] h-[248px]"
              src={PlaceHolder}
              alt="placeholder-img"
            />
          )}
        </section>
        <section
          aria-label="content"
          className="basis-4/5 space-y-4 h-full xl:mt-0 mt-5"
        >
          <div className="flex justify-between">
            <h3 className="lg:text-4xl text-xl font-bold">{title}</h3>
            {account.get("username") && (
              <button
                onClick={() => setSettingMenu(true)}
                className="bg-secondColor hover:bg-secondColorBrighter p-2 rounded-md lg:text-xl text-md font-bold"
              >
                Settings
              </button>
            )}
          </div>
          <h4 className="font-extralight">{alt_title || title}</h4>

          <p
            className={`${
              isSeeMore && "line-clamp-4"
            } font-light lg:text-xl text-sm w-full`}
          >
            {description}
          </p>

          <div className="flex sm:justify-start sm:items-start justify-center items-center">
            <button
              onClick={() => {
                setSeeMore(!isSeeMore);
              }}
              className="bg-secondColor hover:bg-secondColorBrighter p-2.5 rounded-lg"
            >
              {`${isSeeMore ? "See More" : "See Less"}`}
            </button>
          </div>

          <div className="lg:text-base text-sm">
            <ul className="grid sm:grid-cols-2 grid-cols-1 lg:gap-y-2 gap-y-0.5">
              <li>
                Type:
                <span className="text-secondColor ml-3 font-bold">{type}</span>
              </li>
              <li>
                View:
                <span className="text-secondColor ml-3 font-bold">{view}</span>
              </li>
              <li>
                Episodes:
                <span className="text-secondColor ml-3 font-bold">
                  {total_episodes}
                </span>
              </li>
              <li>
                Generes:
                {genersList.length > 0 ? (
                  genersList.map((genere: any, index: number) => (
                    <span key={index} className="text-secondColor font-bold">
                      {` ${genere.name}${
                        index === genersList.length - 1 ? "" : ", "
                      } `}
                    </span>
                  ))
                ) : (
                  <span>{` Upcoming`}</span>
                )}
              </li>
              <li>
                Status:
                <span className="text-secondColor ml-3 font-bold  ">
                  {status
                    ? `${status.charAt(0).toUpperCase()}${status.slice(1)}`
                    : null}
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Info;
