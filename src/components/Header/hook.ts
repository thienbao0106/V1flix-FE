import { ISeries } from "../../interface";
import { useState, useEffect } from "react";
import axios from "axios";

const useSearchSeries: (input: string) => any = (searchInput) => {
  const regex = /[\\/,.]/gm;
  if (searchInput.match(regex)) searchInput = searchInput.replace(regex, "");
  const [series, setSeries] = useState<any>(null);

  //will find the way not to use useState
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setSeries(null);
    if (searchInput !== "") {
      setLoading(true);
      const controller = new AbortController();
      const fetchResultData = async () => {
        const response = await axios.get(
          `${
            import.meta.env.VITE_USER_URL
          }/series/find/${searchInput}?amount=3`,
          {
            signal: controller.signal,
          }
        );
        setSeries(() => response.data.series);
        setLoading(false);
      };
      fetchResultData();
      return () => controller.abort();
    }
    return;
  }, [searchInput]);

  return { series, isLoading };
};

export default useSearchSeries;
