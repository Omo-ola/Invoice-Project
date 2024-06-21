import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import toast from "react-hot-toast";

function Aside() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <aside className="bg-[#1d2238] rounded-r-2xl flex justify-between md:flex-col items-center z-[999]">
      <div className="p-10 bg-[#7c5df9] rounded-r-2xl"></div>
      <div className="flex md:flex-col items-center gap-4 px-2">
        {token && (
          <div className="">
            <button
              className="p-1 bg-[#7c5df9] rounded-sm text-sm cursor-pointer text-white"
              onClick={() => {
                localStorage.setItem("token", "");
                toast.success("Logout Successfully");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        )}
        <article
          className="text-3xl text-[#8987b8] cursor-pointer"
          onClick={toggleDarkMode}
        >
          {isDark ? <IoIosSunny /> : <IoIosMoon />}
        </article>
        <article className="my-4 px-4 md:px-0">
          {token ? (
            <>
              <div className="h-10 w-10 rounded-full bg-slate-500">
                <img
                  src="logo.jpg"
                  className="w-full h-full rounded-full"
                  alt="Hello"
                />
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="text-[#8987b8] hover:text-white transition-all"
            >
              Login
            </Link>
          )}
        </article>
      </div>
    </aside>
  );
}

export default Aside;
