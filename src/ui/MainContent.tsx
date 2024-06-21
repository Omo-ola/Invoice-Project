import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getInvoice } from "../services/getInvoice";
import Spinner from "./Spinner";
import { InvoiceData } from "../types/Interface";
import { useFilter } from "../context/FilterContext";

function MainContent() {
  const { isLoading, data } = useQuery({
    queryKey: ["invoice"],
    queryFn: getInvoice,
  });

  const { filter } = useFilter();

  if (isLoading) return <Spinner />;
  const invoices = data?.data?.invoices ?? [];
  const filteredData = invoices.filter((item: InvoiceData) => {
    if (filter === "All") return true;
    console.log(item.status);
    console.log(filter);
    return item.status === filter;
  });
  console.log(filter);

  return (
    <div className="mt-10">
      {filteredData.length < 1 ? (
        <p className="text-4xl font-bold text-[var(--color-text-white)] pt-10">
          No invoice yet, Click the button above to create an invoice
        </p>
      ) : (
        filteredData.map((invoice: InvoiceData) => (
          <Card
            // @ts-ignore
            types={`${invoice.status}`}
            key={invoice.invoiceId}
            invoice={invoice}
          ></Card>
        ))
      )}
    </div>
  );
}

export default MainContent;
