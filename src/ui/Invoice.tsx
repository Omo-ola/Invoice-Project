import React from "react";
import { formatCurrency } from "../utils/helper";
import { Table } from "./Table";
import { Td } from "./Td";
import { Th } from "./Th";

const Invoice = ({ invoice, ref }) => {
  return (
    <>
      <article ref={ref} className="bg-[#131426] rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-semibold">
            <h3>#{invoice.invoiceId}</h3>
            <p>Graphic Design</p>
          </div>
          <div className="text-sm text-right">
            <p>{invoice.streetAddress}</p>
            <p>{invoice.billerCity}</p>
            <p>{invoice.postCode}</p>
            <p>{invoice.billerCountry}</p>
          </div>
        </div>

        <main className="flex justify-between gap-2 mb-8">
          <div className="">
            <article className="mb-6">
              <p className="text-sm font-bold py-1 text-[#c9c5c5]">
                Invoice Date
              </p>
              <h3 className="text-sm font-bold">{invoice.invoiceDate}</h3>
            </article>
            <article>
              <p className="text-sm font-bold py-1 text-[#c9c5c5]">
                Payment Date
              </p>
              <h3 className="text-sm font-bold">{invoice.invoiceDate}</h3>
            </article>
          </div>
          <div className="">
            <p className="text-sm font-bold py-1 text-[#c9c5c5]">Bill To</p>
            <h3 className="text-sm font-bold">{invoice.clientName}</h3>
            <div className="text-sm text-[#c9c5c5]">
              <p>{invoice.clientAddress}</p>
              <p>{invoice.clientCity}</p>
              <p>{invoice.clientPostCode}</p>
              <p>{invoice.clientCountry}</p>
            </div>
          </div>
          <div className="">
            <p className="text-sm font-bold py-1 text-[#c9c5c5]">Sent To</p>
            <h3 className="text-sm font-bold">{invoice.clientEmail}</h3>
          </div>
        </main>
        <div className="w-[98%] m-auto bg-[#1d2238] rounded-md">
          <Table>
            <thead className="p-2">
              <tr className="text-[#d9daec]">
                <Th>Item Name</Th>
                <Th>Qty</Th>
                <Th>Price</Th>
                <Th>Total</Th>
              </tr>
            </thead>
            <tbody>
              {invoice.itemPrice.map((item) => {
                return (
                  <tr className="text-[#d9daec]" key={item.id}>
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
