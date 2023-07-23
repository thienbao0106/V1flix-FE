import axios from "axios";

const fetchGeners: any = async () => {
  const response = await axios.get(`${import.meta.env.VITE_USER_URL}/geners`);

  return response.data.geners;
};
const genersMenu = await fetchGeners();
export const filters: any = [
  {
    id: 1,
    category: "genre",
    list: genersMenu,
  },
  {
    id: 2,
    category: "status",
    list: [
      {
        id: "completed",
        name: "completed",
      },
      {
        id: "releasing",
        name: "releasing",
      },
    ],
  },
];
