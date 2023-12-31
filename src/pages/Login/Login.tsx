import React, { useState } from "react";
//lib
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
//components
import { Form, Input } from "../../components/Form/Form";
import { CiDark, CiLight } from "react-icons/ci";
//context

import { account } from "../../utils/Storage";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { changeTheme } from "../../redux/slices/themeSlice";
import { setUserLogin } from "../../redux/slices/accountSlice";

let render = 0;
const Login: React.FC = () => {
  document.title = "Login";
  //Redux stuff
  const theme: any = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  console.log("re-render: " + render++);

  //sleep function
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (data: any) => {
    setLoading(true);
    await sleep(400);
    const response = await axios.post(
      `${import.meta.env.VITE_USER_URL}/login`,
      data
    );
    if (response.data.status === "failed") {
      alert("Account isn't right");
    } else {
      alert("Account is right");
      dispatch(setUserLogin(response.data));
      navigation("/");
    }
    setLoading(false);
  };

  return (
    <main className="text-white flex justify-center items-center lg:px-[35rem] lg:py-[8rem] w-full h-screen px-11">
      <section className="space-y-4 w-full">
        <aside aria-label="title-navigation" className="text-center space-y-5">
          <h1>Logo section</h1>
          <div className=" flex items-center justify-between">
            <span
              className="hover:cursor-pointer hover:text-secondColor"
              onClick={() => {
                dispatch(changeTheme(""));
              }}
            >
              {theme === "dark" ? <CiDark size={40} /> : <CiLight size={40} />}
            </span>
            <h1 className="font-bold text-4xl">Login</h1>
            <span className="hover:cursor-pointer hover:text-secondColor">
              <a href="/home">
                <AiOutlineHome size={40} />
              </a>
            </span>
          </div>
        </aside>
        <aside aria-label="form">
          <Form onSubmit={onSubmit}>
            <Input
              type="text"
              name="username"
              rules={{ required: "This is required." }}
            />
            <Input
              type="password"
              name="password"
              rules={{ required: "This is required." }}
            />

            <button
              className="bg-secondColor hover:bg-secondColorBrighter py-2 text-2xl rounded-md font-bold cursor-pointer w-full text-center"
              type="submit"
            >
              {`${loading ? "Loading" : "Login"}`}
            </button>
          </Form>

          <div className="flex justify-center mt-4">
            <p>
              Don't have an account? Create{" "}
              <Link
                to="/register"
                className="text-secondColor font-bold hover:text-secondColorBrighter"
              >
                here
              </Link>
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Login;
