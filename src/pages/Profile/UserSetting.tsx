//libs
import axios from "axios";

//components
import SettingBoxLayout from "../../layout/SettingBoxLayout";
import { IImages } from "../../interface";
import { Select, Form } from "../../components/Form/Form";
import { account } from "../../utils/Storage";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import useWindowDimensions from "../../hook/useWindowDimensions";

const UserSetting = ({
  setMenu,
  title,
  images,
  status,
  id,
  filmStatus,
}: any) => {
  const { width } = useWindowDimensions();
  const bannerName = images.filter(
    (image: IImages) => image.type === "banner"
  )[0]?.name;
  console.log(bannerName);
  const bannerUrl = `https://res.cloudinary.com/dgcvss8u6/image/upload/anime/banner/${bannerName}`;
  console.log(bannerUrl);

  const thumbName = images.filter((image: IImages) => image.type === "card")[0]
    ?.name;
  const myThumb = new CloudinaryImage(`/anime/card/${thumbName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });

  const handleSubmit = async (data: any) => {
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
      window.location.replace(`/profile/${account.get("username")}`);
    } else {
      alert("Updated failed");
    }
  };

  const handleDelete = async () => {
    const decision = window.confirm(
      "Do you want to delete this series out of your list?"
    );
    if (decision) {
      const response = await axios.delete(
        `${import.meta.env.VITE_USER_URL}/series/delete/${account.get(
          "idUser"
        )}/${id}"`
      );
      if (response.data.status === "succeed") {
        alert("Delete successfully");
        window.location.replace(`/profile/${account.get("username")}`);
      } else {
        alert("Delete failed");
      }
    }
  };

  return (
    <SettingBoxLayout menu={setMenu}>
      <div
        className="sm:bg-center bg-cover bg-no-repeat sm:h-40 h-60 rounded-md flex justify-end "
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <span
          onClick={() => setMenu({ show: false, title, images, status, id })}
          className="cursor-pointer text-secondColor font-bold mx-5 text-4xl w-fit text-right"
        >
          X
        </span>
      </div>
      <article className="px-5 sm:-mt-16 -mt-32 mb-5">
        <div className="flex sm:flex-row flex-col gap-x-3.5">
          <div
            aria-label="image"
            className="sm:w-[11.2rem] w-full flex sm:justify-start justify-center "
          >
            <AdvancedImage
              alt="my-thumb"
              className="rounded-md sm:h-full h-[15rem]"
              cldImg={myThumb}
            />
          </div>
          <header className="flex flex-col justify-between sm:mt-20 mt-5 gap-y-2 basis-5/6 text-white sm:text-left text-center">
            <div className="flex sm:flex-row flex-col sm:justify-between justify-center items-center">
              <h1 className="font-bold text-2xl ">{title}</h1>
              {width >= 640 && (
                <button
                  onClick={handleDelete}
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 px-3.5 py-2 rounded-md font-bold w-fit"
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <span>User Status: </span>
              <span className="font-bold text-secondColor">{`${status}`}</span>
            </div>
            <div>
              <span>Film Status: </span>
              <span className="font-bold text-secondColor">
                {`${filmStatus.charAt(0).toUpperCase()}${filmStatus.substr(1)}`}
              </span>
            </div>

            <div className="flex sm:flex-row flex-col gap-2 sm:justify-start justify-center sm:items-start items-center">
              <Form onSubmit={handleSubmit}>
                <Select
                  name="listStatus"
                  options={["Completed", "Plan to watch", "Dropped"]}
                  className="p-2 mr-1.5 rounded-md text-black sm:basis-0 basis-1/2"
                  optionsClass="text-black"
                  defaultValue={status}
                />
                <button
                  type="submit"
                  className="bg-secondColor hover:bg-secondColorBrighter p-2 rounded-md "
                >
                  Edit this item
                </button>
              </Form>
              {width < 640 && (
                <button
                  onClick={handleDelete}
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 px-8 py-2 rounded-md font-bold w-fit"
                >
                  Delete
                </button>
              )}
            </div>
          </header>
        </div>
      </article>
    </SettingBoxLayout>
  );
};

export default UserSetting;
