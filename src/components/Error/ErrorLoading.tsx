import React from "react";
import { BiError } from "react-icons/bi";
import { ThreeDots } from "react-loader-spinner";
const ErrorLoading = ({ msg }: any) => {
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <BiError size={80} className="text-secondColor font-bold" />
      <p className=" text-3xl font-bold text-red-500 flex flex-row justify-center items-center">
        <span>{msg}</span>
        <ThreeDots
          wrapperClass="my-2 pt-3 pl-1"
          height="40"
          width="40"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </p>
    </section>
  );
};

export default ErrorLoading;
