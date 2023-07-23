import React from "react";
import { BsPlayBtn } from "react-icons/bs";
import { FaCircleNotch } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";

const Details: React.FC<any> = ({ newep, status, type }) => {
  return (
    <>
      <div className="flex flex-row justify-start gap-0.5">
        <div className="flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2">
          <BsPlayBtn size={15} />
          <span className="lg:text-base text-sm">{`${newep}`}</span>
        </div>
        <div className="flex justify-center items-center gap-2 bg-ongoing rounded-br-md rounded-tl-md rounded-tr-lg rounded-bl-lg px-2">
          {status === "ongoing" ? (
            <FaCircleNotch size={15} />
          ) : (
            <BsCheckCircle size={15} />
          )}
        </div>
      </div>
      <span className="xl:text-base lg:text-xl sm:text-2xl">{`${type}`}</span>
    </>
  );
};

export default Details;
