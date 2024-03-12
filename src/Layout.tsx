import { useState } from "react";
import InvoiceForm from "./ui/InvoiceForm";
import MainContent from "./ui/MainContent";
import MainNav from "./ui/MainNav";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <main className="max-w-[850px] w-[80%] mx-auto pt-10">
        <MainNav setIsOpen={setIsOpen} isOpen={isOpen} />
        <MainContent />
      </main>

      <section
        className={`absolute transition-all bg-[var(--bg-color-sec)] h-[100vh] overflow-x-hidden overview z-50 inset-0 ${
          isOpen
            ? "md:translate-x-[4rem] translate-x-0"
            : "translate-x-[-30rem] shadow-2xl"
        } w-[400px] rounded-r-[2rem] px-4 pl-10 py-4`}
      >
        <InvoiceForm openForm={setIsOpen} />
      </section>
    </>
  );
}

export default Layout;
