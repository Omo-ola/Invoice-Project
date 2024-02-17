import { IoIosSunny } from "react-icons/io";

function Aside() {
  return (
    <aside className="bg-[#1d2238] rounded-r-2xl flex justify-between md:flex-col items-center z-[999]">
      <div className="p-10 bg-[#7c5df9] rounded-r-2xl"></div>
      <div className="flex md:flex-col items-center gap-4 px-2">
        <article className="text-3xl text-[#8987b8] cursor-pointer">
          <IoIosSunny />
        </article>
        <article className="my-4 px-4 md:px-0">
          <div className="h-10 w-10 rounded-full bg-slate-500"></div>
        </article>
      </div>
    </aside>
  );
}

export default Aside;
