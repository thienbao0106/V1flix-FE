import React, { useReducer, useState, useContext, useEffect } from "react";
//Component
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { CiDark, CiLight } from "react-icons/ci";
import { TbMinusVertical } from "react-icons/tb";
import { Hover, NavItem, NavMenu } from "./interface";
import { NavLink, Link } from "react-router-dom";
//Reducer
import { IReducer } from "../../interface";
import { reducer } from "./reducer";
//Data
import { ISeries } from "../../interface";
import useSearchSeries from "./hook";
//Context
import { slugifyString } from "../../utils/HandleString";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchGeners } from "../../redux/slices/genersSlice";
import { changeTheme } from "../../redux/slices/themeSlice";
import { handleLogout } from "../../redux/slices/accountSlice";
import { useDebounce } from "../../hook/useDebounce";

const initState: Hover = {
  isLoading: false,
  id: "",
};

const DesktopHeader: React.FC = () => {
  //For Redux
  const geners = useAppSelector((state) => state.geners.listGeners);
  const theme = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.account);

  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    reduxDispatch(fetchGeners(new AbortController()));
  }, []);

  const listNavMenu: NavMenu[] = [
    {
      id: "Nav02",
      title: "Genre",
      url: "/home",
      subMenu: geners.map((gener: any) => {
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

  //For hover
  const [loading, dispatch] = useReducer<
    (state: Hover, action: IReducer) => any
  >(reducer, initState);
  const [searchInput, setSearchInput] = useState<string>("");
  const [userMenu, setUserMenu] = useState(false);
  const debounceValue = useDebounce(searchInput, 500);
  console.log(debounceValue);
  const { series, isLoading } = useSearchSeries(debounceValue);
  console.log(series);
  return (
    <>
      <div className="px-10 flex text-white">
        <section aria-label="Logo" className="py-10 basis-1/6">
          <a href="/">Your Logo</a>
        </section>
        <section
          aria-label="functions"
          className="py-10 px-24 flex flex-row justify-start items-center basis-3/6 font-semibold gap-x-32"
        >
          {listNavMenu.map((item: NavMenu) => (
            <aside key={item.id}>
              <div
                aria-label="main-menu"
                onMouseEnter={() =>
                  dispatch({ type: "loading", payload: item.id })
                }
                onMouseLeave={() =>
                  dispatch({ type: "unloading", payload: "" })
                }
              >
                <a
                  href={item.url}
                  className="hover:text-secondColor cursor-pointer block"
                >
                  {item.title}
                </a>
                {loading.isLoading === true && loading.id === item.id && (
                  <div
                    aria-label="sub-menu"
                    className="pt-5 absolute text-white"
                  >
                    <ul className="bg-mainColor w-32 -ml-4 rounded-md">
                      {item.subMenu?.map((sub: NavItem) => {
                        console.log(sub);
                        return (
                          <li
                            className="cursor-pointer pl-4 pr-1.5 py-2 hover:bg-secondColor hover:rounded-md"
                            key={sub.id}
                          >
                            <NavLink to={sub.url}>{sub.title}</NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          ))}
        </section>

        <section
          aria-label="others"
          className="py-8 basis-3/6 flex flex-row text-right h-fit gap-5"
        >
          <aside aria-label="search" className="flex flex-col w-2/3 h-12">
            <aside aria-label="input" className="flex flex-row">
              <a
                href="/search"
                className={`${
                  searchInput !== "" && "rounded-l-none"
                }  flex justify-center items-center bg-opacity-40 bg-gray-500 px-2 py-4 rounded-l-md `}
              >
                <AiOutlineSearch className="hover:text-secondColorBrighter" />
              </a>
              <input
                type="text"
                className={`${
                  searchInput !== "" && "rounded-r-none"
                } bg-opacity-40 bg-gray-500 px-2 rounded-r-md w-full focus:outline-none`}
                placeholder="Search"
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    window.location.href = `/search/${searchInput}`;
                  }
                }}
                onChange={(e) => {
                  setSearchInput(() => e.target.value);
                }}
              />
            </aside>
            <aside aria-label="result">
              {searchInput !== "" ? (
                isLoading ? (
                  <div>Loading....</div>
                ) : series !== null ? (
                  series.length > 0 ? (
                    <ul className="rounded-b-md list">
                      {series.map((item: ISeries, index: number) => {
                        return (
                          <li
                            key={index}
                            className="bg-mainColor text-left py-2 px-2 even:bg-black-500"
                          >
                            <a
                              className="hover:text-secondColor"
                              href={`/watch?title=${slugifyString(
                                item.title
                              )}&ep=1`}
                            >
                              {item.title}
                            </a>
                          </li>
                        );
                      })}
                      <a href={`/search/${searchInput}`}>
                        <li className="bg-secondColor rounded-b-md text-center font-bold py-2 px-2">
                          See more
                        </li>
                      </a>
                    </ul>
                  ) : (
                    <div className="bg-yellow-500 bg-opacity-50  text-center py-2 px-2 rounded-b-md">
                      Can't find the data
                    </div>
                  )
                ) : null
              ) : null}
            </aside>
          </aside>
          <aside
            aria-label="sign-in"
            className={`w-1/3 flex-row flex gap-3 ${
              user.username === "" ? "justify-center" : "justify-between"
            } `}
          >
            <div
              className={` flex items-center bg-opacity-40 px-2 py-2 rounded-l-md`}
            >
              <TbMinusVertical size={20} />
            </div>
            <div
              className="flex justify-center items-center bg-opacity-40 px-2 py-2 rounded-l-md cursor-pointer"
              onClick={() => reduxDispatch(changeTheme(""))}
            >
              {theme === "dark" ? <CiDark size={20} /> : <CiLight size={20} />}
            </div>
            {user.username === "" ? (
              <Link
                to="/login"
                className="flex justify-center items-center bg-transparent outline outline-offset-2 outline-outColor py-2 rounded-lg px-2 w-full"
              >
                Sign-in
              </Link>
            ) : (
              <div
                onClick={() => setUserMenu(!userMenu)}
                className="text-right flex justify-center items-center bg-opacity-40 px-2 py-2 rounded-l-md cursor-pointer"
              >
                <AiOutlineUser
                  size={20}
                  className={`${
                    userMenu ? "text-secondColor " : "text-white "
                  }hover:text-secondColor `}
                />
                {userMenu && (
                  <div
                    aria-label="sub-menu"
                    className="pt-5 absolute text-white mt-28"
                  >
                    <ul className="bg-mainColor -ml-4 rounded-md p-2 ">
                      <li className="cursor-pointer p-2 hover:bg-secondColor hover:rounded-md">
                        <Link
                          to={`/profile/${user.username}`}
                          className="text-center"
                        >
                          {user.username}
                        </Link>
                      </li>
                      <li
                        onClick={() => {
                          reduxDispatch(handleLogout());
                        }}
                        className="cursor-pointer p-2 hover:bg-secondColor hover:rounded-md"
                      >
                        Log-out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </aside>
        </section>
      </div>
    </>
  );
};

export default DesktopHeader;
