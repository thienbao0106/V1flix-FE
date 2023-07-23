import React from "react";
import { BiErrorCircle } from "react-icons/bi";
const Error: React.FC = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-white gap-y-8">
      <BiErrorCircle size={149} className="text-red-500" />
      <h1 className="text-4xl font-bold tracking-wide">
        404! Can't find this page.
      </h1>
    </section>
  );
};

export default Error;
