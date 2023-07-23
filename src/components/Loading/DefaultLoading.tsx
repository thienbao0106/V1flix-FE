import React from "react";
import { RotatingLines } from "react-loader-spinner";

const DefaultLoading = ({ msg }: any) => {
  return (
    <>
      <div className="text-4xl font-bold text-green-400 h-screen flex flex-col gap-y-2 justify-center items-center">
        <RotatingLines
          strokeColor="green"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
        {msg}
      </div>
    </>
  );
};

export default DefaultLoading;
