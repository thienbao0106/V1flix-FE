import { useRef } from "react";

const SettingBoxLayout = ({ children, menu }: any) => {
  const asideRef: any = useRef();
  const handleMenu = (e: any) => {
    const aside = asideRef.current.getBoundingClientRect();
    if (
      e.clientX < aside.left ||
      e.clientX > aside.right ||
      e.clientY < aside.top ||
      e.clientY > aside.bottom
    ) {
      console.log("first");
      menu(false);
    } else console.log("second");
  };
  return (
    <section
      onClick={(e) => handleMenu(e)}
      className="absolute bg-black bg-opacity-75 inset-0 z-30 flex justify-center sm:items-center items-start"
    >
      <aside
        ref={asideRef}
        className="bg-mainColor opacity-100 text-left lg:w-3/5 sm:w-11/12 w-full gap-4 rounded-md z-50 sm:h-auto h-full"
      >
        {children}
      </aside>
    </section>
  );
};

export default SettingBoxLayout;
