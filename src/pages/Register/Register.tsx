import { useState, useContext } from "react";
//libs
import { Link } from "react-router-dom";
import axios from "axios";
//context
import { ThemeContext } from "../../context/ThemeContext";
//components
import { Form, Input } from "../../components/Form/Form";
import { CiDark, CiLight } from "react-icons/ci";
import { AiOutlineArrowRight } from "react-icons/ai";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const Register = () => {
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const onSubmit = async (data: any) => {
    console.log(data.confirmed_password === data.password);
    if (data.confirmed_password !== data.password) {
      alert("Password and confirmed password don't watch");
    } else {
      setLoading(true);
      await sleep(400);
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_USER_URL}/register`,
        data,
        {
          headers: {
            "Content-Type": " application/json",
          },
        }
      );
      if (response.data.status === "failed") {
        alert("Account isn't right");
      } else {
        alert("Account is right");
        window.location.href = "/login";
      }

      setLoading(false);
    }
  };
  return (
    <main className="text-white flex justify-center items-center lg:px-[35rem] lg:py-[8rem] w-full h-screen px-11">
      <section className="space-y-4 w-full">
        <aside aria-label="title-navigation" className="text-center space-y-5">
          <h1>Website Logo</h1>
          <div className=" flex items-center justify-between">
            <span
              className="hover:cursor-pointer hover:text-secondColor"
              onClick={() => toggleTheme()}
            >
              {theme === "dark" ? <CiDark size={40} /> : <CiLight size={40} />}
            </span>
            <h1 className="font-bold text-4xl">Register</h1>
            <span className="hover:cursor-pointer hover:text-secondColor">
              <Link to="/login">
                <AiOutlineArrowRight size={40} />
              </Link>
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
              type="email"
              name="email"
              rules={{ required: "This is required." }}
            />
            <Input
              type="password"
              name="password"
              rules={{ required: "This is required." }}
            />
            <Input
              type="password"
              name="confirmed_password"
              rules={{ required: "This is required." }}
            />
            <button
              className="bg-secondColor hover:bg-secondColorBrighter py-2 text-2xl rounded-md font-bold cursor-pointer w-full text-center"
              type="submit"
            >
              {`${loading ? "Loading" : "Register"}`}
            </button>
          </Form>
          <div className="flex justify-center mt-4">
            <p>
              Already have an account? Login{" "}
              <span className="font-bold text-secondColor hover:text-secondColorBrighter hover:cursor-pointer">
                here
              </span>
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Register;
