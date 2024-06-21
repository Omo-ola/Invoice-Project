import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "../services/getInvoice";
import { useEffect, useState } from "react";
import { InvoiceData } from "../types/Interface";
import { useFilter } from "../context/FilterContext";
type FilterType = "All" | "Paid" | "Pending";
interface Iflex {
  wrap?: string;
}

const Flex = styled.div<Iflex>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text);
  gap: ${(props) => {
    switch (props.wrap) {
      case "true":
        return "2rem 0";
      default:
        return "0";
    }
  }};
  flex-wrap: ${(props) => {
    switch (props.wrap) {
      case "true":
        return "wrap";
      default:
        return "nowrap";
    }
  }};
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

interface Iprops {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

function MainNav({ setIsOpen, isOpen }: Iprops) {
  // const [filter, setFilter] = useState<FilterType>("All");
  const { isLoading, data } = useQuery({
    queryKey: ["invoice"],
    queryFn: getInvoice,
  });

  const { filter, setFilter } = useFilter();
  if (isLoading) return <></>;
  const invoices = data?.data?.invoices ?? [];

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as FilterType);
  };

  const filteredData = invoices.filter((item: InvoiceData) => {
    if (filter === "All") return true;
    return item.status === filter;
  });

  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <Flex wrap="true">
      <div className="text-center">
        <h3 className="font-bold text-4xl capitalize mb-2">invoices</h3>
        <p className="text-sm font-light">
          There are {filteredData.length} total invoices
        </p>
      </div>

      <Flex>
        <div className="bg-transparent">
          <select
            id="status-filter"
            value={filter}
            onChange={handleFilterChange}
            className="bg-transparent outline-none cursor-pointer"
          >
            <option value="All" className="bg-white text-black">
              Filter
            </option>
            <option value="paid" className="bg-white text-black">
              Paid
            </option>
            <option value="pending" className="bg-white text-black">
              Pending
            </option>
          </select>
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
