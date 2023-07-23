import axios from "axios";
import { useState, useEffect } from "react";

const useCheckImage = (url: string) => {
  const [imgStatus, setImgStatus] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const checkImage = async () => {
      const getImage = await axios.get(url, {
        signal: controller.signal,
      });
      if (getImage) {
        setImgStatus(true);
      }
    };
    checkImage();
    return () => {
      controller.abort;
    };
  }, []);
  return imgStatus;
};

export default useCheckImage;
