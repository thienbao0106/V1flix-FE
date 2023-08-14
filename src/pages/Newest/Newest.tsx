import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DefaultLoading from "../../components/Loading/DefaultLoading";
import Card from "../../components/Card/Card";

const Newest = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/episodes`
      );
      if (response.data) return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  if (isLoading) return <DefaultLoading msg={"Wait for the newest episode"} />;
  console.log(data);
  return (
    <main className="h-screen text-white mx-8 mt-2">
      <header className="font-bold  xl:text-3xl lg:text-2xl text-xl">
        Newest Episodes
      </header>
      <section className="w-full grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 lg:mt-4 mt-7">
        {data.episodes.map((episode: any) => {
          console.log(episode.ep_num);
          return (
            <div>
              <Card ep_num={episode.ep_num} {...episode.series} />
              <div>
                Episode:{" "}
                <span className="text-secondColor font-bold">
                  {episode.ep_num}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Newest;
