import { createContext, useContext, useState } from "react";
import { ChildrenProps } from "../types/Interface";

export type FilterContextType = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

type FilterType = "All" | "Paid" | "Pending";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

function FilterProvider({ children }: ChildrenProps) {
  const [filter, setFilter] = useState<FilterType>("All");
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined)
    throw new Error("Filter context was used outside of filter provider");
  return context;
}

export { FilterProvider, useFilter };
