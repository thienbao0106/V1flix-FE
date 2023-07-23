import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const GenersContext = createContext<any>(null);

const GenersProvider = ({ children }: any) => {
  const [listGeners, setListGeners] = useState([]);
  useEffect(() => {
    let controller: AbortController = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/geners`,
        {
          signal: controller.signal,
        }
      );

      setListGeners(response.data.geners);
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);
  const value = { listGeners };
  return (
    <GenersContext.Provider value={value}>{children}</GenersContext.Provider>
  );
};

export default GenersProvider;
