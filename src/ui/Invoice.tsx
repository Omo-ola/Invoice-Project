import { useDarkMode } from "../context/DarkModeContext";
import { formatCurrency } from "../utils/helper";
import { Table } from "./Table";
import { Td } from "./Td";
import { Th } from "./Th";

const Invoice = ({ invoice }: any) => {
  // @ts-ignore
  const { isDark } = useDarkMode();
  return (
    <>
      <article
        className={`bg-[var(--bg-color-primary)] ${
          isDark && "shadow-xl"
        } rounded-md p-4 h-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-semibold text-[--color-text]">
            <h3>#{invoice.invoiceId}</h3>
            <p>Graphic Design</p>
          </div>
          <div className="text-sm text-right text-[--color-text]">
            <p>{invoice.streetAddress}</p>
            <p>{invoice.billerCity}</p>
            <p>{invoice.postCode}</p>
            <p>{invoice.billerCountry}</p>
          </div>
        </div>

        <main className="flex justify-between gap-2 mb-8">
          <div className="">
            <article className="mb-6">
              <p className="text-sm font-bold py-1 text-[var(--color-text-ter)]">
                Invoice Date
              </p>
              <h3 className="text-sm font-bold text-[var(--color-text-white)]">
                {invoice.invoiceDate}
              </h3>
            </article>
            <article>
              <p className="text-sm font-bold  py-1 text-[var(--color-text-ter)]">
                Payment Date
              </p>
              <h3 className="text-sm font-bold text-[var(--color-text-white)]">
                {invoice.invoiceDate}
              </h3>
            </article>
          </div>
          <div className="">
            <p className="text-sm font-bold  py-1 text-[var(--color-text-ter)]">
              Bill To
            </p>
            <h3 className="text-sm font-bold text-[var(--color-text-white)]">
              {invoice.clientName}
            </h3>
            <div className="text-sm text-[var(--color-text-ter)]">
              <p>{invoice.clientAddress}</p>
              <p>{invoice.clientCity}</p>
              <p>{invoice.clientPostCode}</p>
              <p>{invoice.clientCountry}</p>
            </div>
          </div>
          <div className="">
            <p className="text-sm font-bold  py-1 text-[var(--color-text-ter)]">
              Sent To
            </p>
            <h3 className="text-sm font-bold text-[var(--color-text-white)]">
              {invoice.clientEmail}
            </h3>
          </div>
        </main>
        <div
          className={`w-[98%] m-auto bg-[var(--bg-color-ter)] ${
            isDark && "shadow-2xl"
          } rounded-md`}
        >
          <Table>
            <thead className="p-2">
              <tr className="text-[var(--color-text-sec)]">
                <Th>Item Name</Th>
                <Th>Qty</Th>
                <Th>Price</Th>
                <Th>Total</Th>
              </tr>
            </thead>
            <tbody>
              {invoice.itemPrice.map((item: any) => {
                return (
                  <tr className="text-[var(--color-text-sec)]" key={item.id}>
                    <Td>{item.itemName}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{formatCurrency(Number(item.price))}</Td>
                    <Td>{formatCurrency(Number(item.total))}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="flex justify-between w-full px-2 py-3 bg-black text-white rounded-b-md mt-4">
            <p className="text-sm font-bold">Amount Due</p>
            <h2 className="text-xl font-semibold">
              {formatCurrency(
                Number(
                  invoice.itemPrice.reduce(
                  // @ts-ignore
                    (acc: number, currentItem: Record) =>
                      Number(acc) + Number(currentItem.total),
                    0
                  )
                )
              )}
            </h2>
          </div>
        </div>
      </article>
    </>
  );
};

export default Invoice;
