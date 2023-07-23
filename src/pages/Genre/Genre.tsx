import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
import { useQuery } from "@tanstack/react-query";
import DefaultLoading from "../../components/Loading/DefaultLoading";
import ErrorLoading from "../../components/Error/ErrorLoading";

const Genre: React.FC = () => {
  const { name } = useParams();

  const [pages, setPages] = useState<any>({
    totalPage: 1,
    currentPage: 1,
  });

  const { data, isLoading, isError } = useQuery(
    ["filmsData", name, pages.currentPage],
    {
      queryFn: async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_USER_URL}/geners/find/${name
            ?.charAt(0)
            .toUpperCase()}${name?.slice(1)}?currentPage=${
            pages.currentPage - 1
          }`
        );
        console.log(response);

        return response.data;
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (isLoading)
    return <DefaultLoading msg={"Loading the anime, please wait for it..."} />;
  if (isError) return <ErrorLoading msg={"Can't get the data..."} />;
  return (
    <section className="h-screen px-8 text-white">
      <header>
        <aside aria-label="header">
          <h1 className="font-bold xl:text-3xl lg:text-2xl text-xl">{`List film for "${name
            ?.charAt(0)
            .toUpperCase()}${name?.slice(1)}"`}</h1>
        </aside>
      </header>
      <main className="w-full grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 lg:mt-4 mt-7">
        {data.films.map((film: any, index: number) => (
          <section className="w-full" key={index}>
            <Card {...film} />
          </section>
        ))}
      </main>
      <footer className="mt-5">
        <section>
          <ul className="flex flex-row gap-5">
            {data.totalPage > 1 &&
              Array.from(Array(data.totalPage).keys()).map((page: number) => {
                return (
                  <li
                    key={page}
                    onClick={() => {
                      setPages({
                        ...pages,
                        currentPage: page + 1,
                      });
                    }}
                    className="text-white bg-mainColor py-3 px-5 rounded-lg hover:bg-secondColor cursor-pointer"
                  >
                    {page + 1}
                  </li>
                );
              })}
          </ul>
        </section>
      </footer>
    </section>
  );
};

export default Genre;
