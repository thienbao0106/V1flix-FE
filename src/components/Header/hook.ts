import { ISeries } from "../../interface";
import { useState, useEffect } from "react";
import axios from "axios";

const useSearchSeries: (input: string) => any = (searchInput) => {
  const regex = /[\\/,.]/gm;
  if (searchInput.match(regex)) searchInput = searchInput.replace(regex, "");
  const [series, setSeries] = useState<ISeries[]>(() => {
    return [];
  });
  console.log("re-render hook");
  //will find the way not to use useState
  useEffect(() => {
    const controller = new AbortController();
    const fetchResultData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/series/find/${searchInput}?amount=3`,
        {
          signal: controller.signal,
        }
      );
      setSeries(() => response.data.series);
      return () => controller.abort();
    };
    searchInput !== "" ? fetchResultData() : setSeries([]);
  }, [searchInput]);

  return series;
};

export default useSearchSeries;
