import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "../services/getInvoice";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text);
`;

interface Iprops {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

function MainNav({ setIsOpen, isOpen }: Iprops) {
  const { isLoading, data } = useQuery({
    queryKey: ["invoice"],
    queryFn: getInvoice,
  });

  if (isLoading) return <></>;
  const { invoices } = data?.data;

  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <Flex>
      <div className="">
        <h3 className="font-bold text-4xl capitalize mb-2">invoices</h3>
        <p className="text-sm font-light">
          There are {invoices.length} total invoices
        </p>
      </div>

      <Flex>
        <div className="flex gap-2 items-center cursor-pointer">
          <p>Filter</p>
          <FaAngleDown />
        </div>

        <div
          className="flex items-center gap-2 ml-8 bg-[#7c5df9] p-2 rounded-[4rem] cursor-pointer transition-all hover:translate-y-[-0.5px]"
          onClick={handleClick}
        >
          <div className="p-2 rounded-full bg-white text-[#7c5df9]">
            <FaPlus />
          </div>
          <p className="text-sm font-bold pr-2 text-white">New Invoice</p>
        </div>
      </Flex>
    </Flex>
  );
}

export default MainNav;
