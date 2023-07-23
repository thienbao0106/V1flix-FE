import React, { useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";

import { ISeries } from "../../interface";
import { FaPlay } from "react-icons/fa";
import { slugifyString } from "../../utils/HandleString";
import axios from "axios";
//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import BannerCard from "./BannerCard";
const Banner = () => {
  const [seriesBanner, setSeriesBanner] = useState<ISeries[]>([]);
  const [imgStatus, setImgStatus] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const responseSeries = await axios.get(
        `${import.meta.env.VITE_USER_URL}/series`,
        {
          signal: controller?.signal,
        }
      );
      if (responseSeries) {
        setSeriesBanner(responseSeries.data.series.slice(0, 5));
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <section aria-label="banner" className="lg:h-auto h-80">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          slidesPerView={1}
          className="h-full w-full mySwiper"
        >
          {/* //Will fix soon */}
          {seriesBanner.map((banner: ISeries) => (
            <SwiperSlide key={banner.id}>
              <BannerCard {...banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Banner;
