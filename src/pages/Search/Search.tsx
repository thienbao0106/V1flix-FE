import React, { useState, useEffect, useContext } from "react";
//lib
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
//data
import { filters } from "./data";
import axios from "axios";
import { ISeries } from "../../interface";
//components
import Card from "../../components/Card/Card";
import TopAnimeCard from "../../components/Card/TopAnimeCard";
//css
let render = 0;
const CSS =
  "bg-opacity-40 bg-gray-500 p-2 rounded-md lg:w-fit focus:outline-none focus:bg-gray-700";

const Search: React.FC = () => {
  const { keyword } = useParams();
  const [filter, setFilter] = useState<string>(keyword || "");
  const [result, setResult] = useState<ISeries[]>([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      let url =
        filter !== ""
          ? `${import.meta.env.VITE_USER_URL}/series/find/${keyword}`
          : `${import.meta.env.VITE_USER_URL}/series`;

      const response = await axios.get(url, {
        signal: controller.signal,
      });

      setResult(response.data.series);
      console.log(response.data.series);
    };
    fetchData();

    return () => controller.abort();
  }, []);

  //will improve this code soon
  const onSubmit = async (queries: any) => {
    console.log("test");
    document.title = `Result: ${queries.filter}` || "Search";
    setFilter(queries.filter);
    console.log(queries);
    const dataFiltered = Object.keys(queries)
      .filter((key) => queries[key].includes("Select"))
      .reduce((object: any, key: any) => {
        object[key] = "";

        return object;
      }, {});

    //write get query here
    //data phía sau sẽ đè data phía trước
    const queriesData = { ...queries, ...dataFiltered };
    console.log(queriesData);

    const response = await axios.post(
      `${import.meta.env.VITE_USER_URL}/series/query`,
      queriesData,
      {
        headers: {
          "Content-Type": " application/json",
        },
      }
    );
    console.log(response.data.series);
    setResult(response.data.series);
  };

  return (
    <>
      <main className="xl:px-10 px-4 text-white xl:flex xl:flex-row lg:space-y-8">
        <section
          aria-label="result-query"
          className="xl:basis-3/4 space-y-5 pr-8"
        >
          <h1 className="text-3xl font-bold">{`Result for ${filter}`}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <aside
              aria-label="query"
              className="w-full flex lg:flex-row flex-col gap-2 "
            >
              <input
                placeholder="Type your filter"
                {...register("filter")}
                className={CSS}
              />
              <div className="lg:flex-none flex gap-2">
                {filters.map((filter: any) => {
                  console.log(filter.list);
                  return (
                    <select
                      defaultValue={`Select ${filter.category}`}
                      className={CSS}
                      key={filter.id}
                      {...register(filter.category)}
                    >
                      <option
                        value={`Select ${filter.category}`}
                        disabled
                        hidden
                      >{`Select ${filter.category}`}</option>

                      {filter.list.map((data: any, index: number) => (
                        <option
                          key={index}
                          value={data.id}
                        >{`${data.name}`}</option>
                      ))}
                    </select>
                  );
                })}
              </div>
              <button
                type="submit"
                className="bg-secondColor p-2 rounded-md font-bold flex gap-2 cursor-pointer"
              >
                Filter
              </button>
            </aside>
          </form>
          <aside aria-label="result">
            {result.length > 0 ? (
              <aside className="grid lg:grid-cols-4 grid-cols-2 gap-3">
                {result.map((data: ISeries) => (
                  <div key={data.id}>
                    <Card {...data} />
                  </div>
                ))}
              </aside>
            ) : (
              <div className="w-full flex h-44 justify-center items-center">
                <h1 className="font-bold text-4xl">{`Can't find the data for ${keyword}`}</h1>
              </div>
            )}
          </aside>
        </section>
        <section
          aria-label="top-anime-query"
          className="lg:basis-1/4 space-y-4 lg:mt-0 mt-5"
        >
          <h1 className="text-3xl font-bold">{`Top anime based on ${filter}`}</h1>
          <ul className="space-y-4">
            {result.length > 0 ? (
              result
                .sort((a: ISeries, b: ISeries) => b.view - a.view)
                .map((film, index) => (
                  <>
                    <li
                      key={film.id}
                      className="rounded-lg [&:nth-child(1)]:border-r-fistAnime [&:nth-child(2)]:border-r-secondAnime [&:nth-child(3)]:border-r-thirdAnime border-r-other border-r-4"
                    >
                      <TopAnimeCard {...film} rank={index + 1} />
                    </li>
                  </>
                ))
            ) : (
              <div>Can't sort the top</div>
            )}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Search;
