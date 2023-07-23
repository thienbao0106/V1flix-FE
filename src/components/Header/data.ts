import { NavMenu } from "./interface";
import axios from "axios";
const fetchGeners: any = async () => {
  const response = await axios.get(`${import.meta.env.VITE_USER_URL}/geners`);

  return response.data.geners;
};

const genersMenu: any = await fetchGeners();
export const listNavMenu: NavMenu[] = [
  {
    id: "Nav02",
    title: "Genre",
    url: "/home",
    subMenu: genersMenu.map((gener: any) => {
      return {
        id: gener.id,
        title: gener.name,
        url: `/genre/${gener.name.toLowerCase()}`,
      };
    }),
  },

  {
    id: "Nav04",
    title: "Newest",
    url: "/newest",
  },
];
