import React, { useState, useContext } from "react";
//lib
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
//components
import { Form, Input } from "../../components/Form/Form";
import { CiDark, CiLight } from "react-icons/ci";
//context
import { ThemeContext } from "../../context/ThemeContext";
import { account } from "../../utils/Storage";

let render = 0;
const Login: React.FC = () => {
  document.title = "Login";
  const [loading, setLoading] = useState<boolean>(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
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
      console.log(response.data);
      const { username } = data;

      alert("Account is right");
      account.set("username", username);
      account.set("idUser", response.data.id);

      window.location.href = "/";
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
              onClick={() => toggleTheme()}
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
