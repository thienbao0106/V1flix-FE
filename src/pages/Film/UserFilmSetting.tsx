import React, { useEffect, useState } from "react";
import { IImages } from "../../interface";
import { Form, Select } from "../../components/Form/Form";
import axios from "axios";
import { account } from "../../utils/Storage";
import SettingBoxLayout from "../../layout/SettingBoxLayout";
import { CloudinaryImage } from "@cloudinary/url-gen";
import useCheckImage from "../../hook/useCheckImage";
import PlaceHolder from "../../assets/placeholder_image.jpg";
const UserFilmSetting = ({ setMenu, title, images, status, id }: any) => {
  const [userStatus, setUserStatus] = useState("");

  const bannerName = images.filter(
    (image: IImages) => image.type === "banner"
  )[0]?.name;
  const myBanner = new CloudinaryImage(`/anime/banner/${bannerName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });
  const checkBanner = useCheckImage(myBanner.createCloudinaryURL());
  //find thumb
  const thumbName = images.filter(
    (image: IImages) => image.type === "thumbnail"
  )[0]?.name;
  const myThumb = new CloudinaryImage(`/anime/thumb/${thumbName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });
  const checkThumb = useCheckImage(myThumb.createCloudinaryURL());

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/series/get-list/${account.get(
          "idUser"
        )}/${id}`,
        {
          signal: controller.signal,
        }
      );

      if (response.data.status === "succeed") {
        setUserStatus(response.data.userStatus);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_URL}/series/add`,
        {
          id_series: parseInt(id),
          id_user: account.get("idUser"),
          status: data.listStatus,
        }
      );

      if (response.data.status === "succeed") {
        alert("Add to list successfully");
        setMenu(false);
      } else {
        alert("Fail to add");
      }
    } catch (error: any) {
      alert("Error while adding to list");
      throw new Error(error);
    }
  };

  const updateStatus = async (data: any) => {
    const response = await axios.put(
      `${import.meta.env.VITE_USER_URL}/series/update/${account.get(
        "idUser"
      )}/${id}"`,
      {
        status: data.listStatus,
      }
    );
    if (response.data.status === "succeed") {
      alert("Updated successfully");

      setMenu(false);
    } else {
      alert("Updated failed");
    }
  };

  return (
    <SettingBoxLayout menu={setMenu}>
      <div
        className="bg-center bg-no-repeat h-40 rounded-md flex justify-end"
        style={{
          backgroundImage: `url(${
            checkBanner ? myBanner.createCloudinaryURL() : PlaceHolder
          })`,
        }}
      >
        <span
          onClick={() => setMenu(false)}
          className="cursor-pointer text-secondColor font-bold mx-5 text-4xl w-fit text-right"
        >
          X
        </span>
      </div>
      <article className="px-5 -mt-16 mb-5">
        <div className="flex sm:flex-row sm:justify-start sm:items-start flex-col justify-center items-center gap-x-3.5">
          <div aria-label="image" className="basis-1/6">
            <img
              className="rounded-md sm:h-full h-[15rem]"
              src={`${
                checkThumb ? myThumb.createCloudinaryURL() : PlaceHolder
              }`}
              alt="thumb"
            />
          </div>
          <header className="flex flex-col justify-between sm:mt-20 mt-5 gap-y-2 basis-5/6 sm:text-left text-center">
            <h1 className="font-bold text-2xl">{title}</h1>
            {userStatus && (
              <div>
                <span>User Status: </span>
                <span className="font-bold text-secondColor">{`${userStatus}`}</span>
              </div>
            )}
            <div>
              <span>Film Status: </span>
              <span className="font-bold text-secondColor">{`${status}`}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Form onSubmit={userStatus === "" ? handleSubmit : updateStatus}>
                <Select
                  name="listStatus"
                  options={["Completed", "Plan to watch", "Dropped"]}
                  className="p-2 mr-1.5 rounded-md text-black"
                  optionsClass="text-black"
                />
                <button
                  type="submit"
                  className="bg-secondColor hover:bg-secondColorBrighter p-2 rounded-md"
                >
                  {userStatus === "" ? "Add to library" : "Update status"}
                </button>
              </Form>
            </div>
          </header>
        </div>
      </article>
    </SettingBoxLayout>
  );
};

export default UserFilmSetting;
