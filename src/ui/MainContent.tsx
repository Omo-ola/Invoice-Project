import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getInvoice } from "../services/getInvoice";
import Spinner from "./Spinner";
import { InvoiceData } from "../types/Interface";

function MainContent() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["invoice"],
    queryFn: getInvoice,
  });

  if (isLoading) return <Spinner />;
  const { invoices } = data?.data;

  return (
    <div className="mt-10">
      {invoices.length < 1 ? (
        <p className="text-4xl font-bold text-[var(--color-text-white)] pt-10">
          No invoice yet, Click the button above to create an invoice
        </p>
      ) : (
        invoices.map((invoice: InvoiceData) => (
          <Card
            types={invoice.status}
            key={invoice.invoiceId}
            invoice={invoice}
          ></Card>
        ))
      )}
    </div>
  );
}

export default MainContent;
