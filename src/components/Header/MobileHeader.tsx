import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
//Components
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { CiDark, CiLight } from "react-icons/ci";
import { TbMinusVertical } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
//Interface
import { Hover, NavMenu, NavItem } from "./interface";

//Data
import useSearchSeries from "./hook";
import { ISeries } from "../../interface";
//storage
import { account } from "../../utils/Storage";
//Context

import { slugifyString } from "../../utils/HandleString";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchGeners } from "../../redux/slices/genersSlice";
import { changeTheme } from "../../redux/slices/themeSlice";
import { handleLogout } from "../../redux/slices/accountSlice";
import { useDebounce } from "../../hook/useDebounce";

const MobileHeader: React.FC = () => {
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

  const [subMenu, setSubMenu] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>(() => {
    return "";
  });
  const [searchbar, setSearchbar] = useState<boolean>(false);
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const loading = { id: "", isLoading: false };

  const debounceValue = useDebounce(searchInput, 500);
  console.log(debounceValue);
  const { series, isLoading } = useSearchSeries(debounceValue);

  return (
    <>
      <section
        aria-label="main-menu"
        className="flex flex-row py-6 px-5  text-white"
      >
        <aside className="basis-1/3 flex items-center justify-start gap-3">
          <div>
            <GiHamburgerMenu
              className={`${subMenu && "text-secondColor"}`}
              onClick={() => {
                setSubMenu(!subMenu);
                setSearchbar(false);
              }}
            />
          </div>
          <span>Your logo</span>
        </aside>
        <aside className="basis-2/3 flex justify-end items-center gap-4">
          <AiOutlineSearch
            className={`${searchbar && "text-secondColor"} cursor-pointer`}
            onClick={() => {
              setSearchbar(!searchbar);
              setSubMenu(false);
            }}
            size={15}
          />
          <TbMinusVertical size={15} />
          <div
            className="cursor-pointer"
            onClick={() => reduxDispatch(changeTheme(""))}
          >
            {theme === "dark" ? <CiDark size={15} /> : <CiLight size={15} />}
          </div>
          {user.username === "" ? (
            <Link
              to="/login"
              className="text-sm bg-transparent outline outline-offset-2 outline-outColor py-0.5 rounded-md px-2"
            >
              Sign-in
            </Link>
          ) : (
            <div
              onClick={() => setUserMenu(!userMenu)}
              className="text-left flex justify-center items-center bg-opacity-40 rounded-l-md cursor-pointer"
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
                  className=" pt-5 mr-16 absolute text-white mt-28"
                >
                  <ul className="bg-mainColor rounded-md">
                    <li className="cursor-pointer p-2 hover:bg-secondColor hover:rounded-md truncate ">
                      <a
                        href={`/profile/${user.username}`}
                        className="max-w-full text-center line-clamp-1"
                      >
                        {user.username}
                      </a>
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
      {searchbar && (
        <section
          className="-mb-[15rem] overflow-auto text-white "
          aria-label="search-bar"
        >
          <aside aria-label="input" className=" flex flex-row h-1/4">
            <div
              className={`${
                searchInput !== "" && "rounded-b-none"
              }  flex justify-center items-center  bg-mainColor px-2 py-4`}
            >
              <AiOutlineSearch />
            </div>
            <input
              type="text"
              className={`${
                searchInput !== "" && "rounded-b-none"
              }  bg-mainColor px-2 w-full focus:outline-none`}
              placeholder="Search"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  window.location.href = `/search/${searchInput}`;
                }
              }}
            />
          </aside>
          <aside aria-label="result" className="h-3/4">
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
        </section>
      )}
      {subMenu && (
        <section aria-label="sub-menu">
          <div
            className={`h-40 -mb-[10rem] overflow-auto px-5 pt-5 text-white text-sm bg-mainColor`}
          >
            {listNavMenu.map((item: NavMenu) => (
              <aside key={item.id}>
                <div
                  aria-label="main-menu"
                  className={`${
                    loading.isLoading === true &&
                    loading.id === item.id &&
                    item.subMenu &&
                    "mb-3"
                  } h-auto mb-10`}
                >
                  <span
                    className={`${
                      loading.id === item.id && "text-secondColor"
                    } cursor-pointer  hover:font-bold`}
                  >
                    <a
                      href={item.url}
                      className="hover:text-secondColor cursor-pointer block"
                    >
                      {item.title}
                    </a>
                  </span>

                  <div aria-label="sub-menu" className="h-auto mt-3">
                    {loading.id === item.id && (
                      <>
                        <ul>
                          {item.subMenu?.map((sub: NavItem) => (
                            <li
                              className="cursor-pointer hover:text-secondColor list-disc ml-8 hover:font-bold"
                              key={sub.id}
                            >
                              {sub.title}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </aside>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default MobileHeader;
