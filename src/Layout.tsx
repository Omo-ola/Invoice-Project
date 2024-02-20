import { useState } from "react";
import Aside from "./ui/Aside";
import InvoiceForm from "./ui/InvoiceForm";
import MainContent from "./ui/MainContent";
import MainNav from "./ui/MainNav";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative md:flex bg-[#131426] w-full h-[100vh]">
      <Aside />
      <main className="max-w-[850px] w-[80%] mx-auto pt-10">
        <MainNav setIsOpen={setIsOpen} isOpen={isOpen} />
        <MainContent />
      </main>

      <section
        className={`absolute transition-all bg-[#10111f] h-[100vh] overflow-x-hidden overview z-50 inset-0 ${
          isOpen ? "translate-x-[4rem]" : "translate-x-[-30rem]"
        } w-[400px] rounded-r-[2rem] px-4 pl-10 py-4`}
      >
        <InvoiceForm openForm={setIsOpen} />
      </section>
    </div>
  );
}

export default Layout;
