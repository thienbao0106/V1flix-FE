import { useEffect, useState } from "react";
//lib
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
//components
import Avatar from "../../assets/default_avatar.jpg";
import Banner from "../../assets/default_banner.png";
import Card from "../../components/Card/Card";
import { MdOutlineAddToQueue } from "react-icons/md";
//localStorage
import { account } from "../../utils/Storage";
import UserSetting from "./UserSetting";
import { navData } from "./data";
const Profile = () => {
  const { username, status } = useParams();

  const [user, setUser] = useState<any>({});
  const [list, setList] = useState<any>([]);
  const [menu, setMenu] = useState({
    show: false,
    images: [],
    "series.title": "",
    "series.status": "",
    status: "",
    seriesId: 0,
  });
  if (menu.show) {
    document.body.classList.add("overflow-hidden");
    window.scrollTo(0, 0);
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      //fetch accounts
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/get-account/${username}`,
        {
          signal: controller.signal,
        }
      );

      //fetch list
      if (response.data.status === "succeed") {
        setUser(response.data.account);
        const responseList = await axios.get(
          `${import.meta.env.VITE_USER_URL}/series/get/${
            response.data.account.id
          }/${status}`,
          {
            signal: controller.signal,
          }
        );

        setList(responseList.data.data);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [username, status]);

  return (
    <>
      {menu.show && (
        <UserSetting
          images={menu.images}
          title={menu["series.title"]}
          status={menu.status}
          id={menu.seriesId}
          filmStatus={menu["series.status"]}
          setMenu={setMenu}
          userId={user.id}
        />
      )}
      {user.id ? (
        <main className="h-screen  py-2 text-white lg:mb-[20rem] mb-[40rem]">
          <section aria-label="banner" className="lg:h-[18rem] h-[10rem]">
            <div
              style={{
                backgroundImage: `url(${Banner})`,
              }}
              className="h-full bg-bottom bg-no-repeat"
            ></div>
          </section>
          <section aria-label="content" className="h-3/4 lg:px-9 px-4">
            <aside
              aria-label="information"
              className="flex lg:flex-row lg:justify-start lg:items-start flex-col justify-center items-center gap-x-4"
            >
              <div aria-label="actions">
                <img
                  src={Avatar}
                  alt="avatar"
                  className="rounded-full w-40 h-40 -mt-[4.5rem] shadow-md border-2 border-secondColor"
                />
              </div>
              <div aria-label="detail-account" className="w-full">
                <h1 className="lg:text-left text-center pt-5 text-4xl font-bold">
                  {user.username}
                </h1>
                <aside className=" w-full mt-8">
                  <nav className="flex md:gap-x-5 gap-x-2 lg:w-fit w-full bg-mainColor font-bold rounded-sm">
                    {navData.map((item: any, index: number) => (
                      <NavLink
                        to={`/profile/${username}/${item.url}`}
                        className={`lg:p-2.5 sm:p-2 p-1 w-full flex justify-center items-center text-center ${
                          item.type === status && "bg-secondColor"
                        }`}
                        key={index}
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </nav>
                </aside>

                {list.length > 0 ? (
                  <section className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 text-white mt-5">
                    {list.map((item: any) => (
                      <div key={item["series.id"]}>
                        <Card
                          key={item["series.id"]}
                          title={item["series.title"]}
                          images={item.images}
                          type={item["series.type"]}
                          total_episodes={item["series.total_episodes"]}
                          status={item["status"]}
                        />
                        {account.get("idUser") === user.id && (
                          <button
                            onClick={() => setMenu({ show: true, ...item })}
                            className="w-full mt-2 font-bold rounded-md text-white bg-secondColor hover:bg-secondColorBrighter py-1.5 px-2.5"
                          >
                            Setting
                          </button>
                        )}
                      </div>
                    ))}
                  </section>
                ) : (
                  <aside className="text-white flex flex-col justify-center items-center h-[20rem] font-bold text-2xl gap-y-7">
                    <MdOutlineAddToQueue size={100} />
                    {status !== undefined
                      ? "This section doesn't have any show"
                      : "Wanna make a list? Go add some films now"}
                  </aside>
                )}
              </div>
            </aside>
          </section>
        </main>
      ) : (
        <main className="flex justify-center items-center">
          <h1 className="font-bold text-white text-2xl">
            This account doesn't exist
          </h1>
        </main>
      )}
    </>
  );
};

export default Profile;
