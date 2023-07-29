import { useState, useEffect, useContext } from "react";
//lib
import axios from "axios";
//Interface
import { ISeries } from "../../interface";
//Components
import Card from "../../components/Card/Card";
import TopAnimeCard from "../../components/Card/TopAnimeCard";
//Swiper
import "swiper/css";
import "swiper/css/pagination";
//Context

import Banner from "./Banner";
import { useQuery } from "@tanstack/react-query";
import DefaultLoading from "../../components/Loading/DefaultLoading";
import ErrorLoading from "../../components/Error/ErrorLoading";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchFilmsTrending } from "../../redux/slices/filmSlice";

const Home: React.FC = () => {
  //Redux
  const listTrending = useAppSelector((state) => state.films.listFilms);
  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    reduxDispatch(fetchFilmsTrending(new AbortController()));
  }, []);

  const [series, setSeries] = useState<ISeries[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  //Limit Page
  const limitPage = 4;
  const { isLoading, isError } = useQuery({
    queryFn: async () => {
      const responseSeries = await axios.get(
        `${
          import.meta.env.VITE_USER_URL
        }/series?limitPage=${limitPage}&currentPage=${currentPage}`
      );
      if (responseSeries) {
        setSeries(responseSeries.data.series);
        setTotalPage(responseSeries.data.totalPage);
      }
      return;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading)
    return <DefaultLoading msg={"Loading the anime, please wait for it..."} />;
  if (!isError) return <ErrorLoading msg={"Can't get the data..."} />;

  const handleSeeMore = async () => {
    const responseSeries = await axios.get(
      `${
        import.meta.env.VITE_USER_URL
      }/series?limitPage=${limitPage}&currentPage=${currentPage + 1}`
    );
    setCurrentPage((prevValue) => prevValue + 1);
    setSeries([...series, ...responseSeries.data.series]);
  };

  return (
    <>
      <section>
        <Banner />
      </section>

      <main className="bg-bgColor lg:px-9 px-4 py-2 flex xl:flex-row flex-col text-white">
        <section className="basis-3/4 mt-5 lg:pr-10 pr-0">
          <h1 className="font-bold lg:text-2xl text-xl mb-5">
            Recommendations
          </h1>
          <aside className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-8">
            {series.map((film: ISeries | any, index: number) => (
              <Card key={index} {...film} />
            ))}
          </aside>
          <aside className="flex justify-center items-center">
            {currentPage < totalPage && (
              <button
                className=" bg-secondColor font-bold rounded-md py-2 px-5 mt-14"
                onClick={() => handleSeeMore()}
              >
                See More
              </button>
            )}
          </aside>
        </section>
        <section className="basis-1/4 lg:mt-5 mt-8">
          <h1 className="font-bold lg:text-2xl text-4xl mb-5">Top Anime</h1>
          <aside>
            <ul className="flex gap-3 flex-col" role="list">
              {listTrending.map((film: ISeries, index: number) => (
                <li
                  key={film.id}
                  className="rounded-lg [&:nth-child(1)]:border-r-fistAnime [&:nth-child(2)]:border-r-secondAnime [&:nth-child(3)]:border-r-thirdAnime border-r-other border-r-4"
                >
                  <TopAnimeCard {...film} rank={index + 1} />
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </main>
    </>
  );
};

export default Home;
