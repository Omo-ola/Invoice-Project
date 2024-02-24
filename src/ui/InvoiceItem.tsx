import { useParams } from "react-router-dom";
import { Labels } from "./Labels";
import { LabelContainer } from "./LabelContainer";
import { Button } from "./Button";
import { Table } from "./Table";
import { Th } from "./Th";
import { formatCurrency } from "../utils/helper";

import { FaArrowLeftLong } from "react-icons/fa6";
import { Td } from "./Td";

function InvoiceItem() {
  const { id } = useParams();
  console.log(id);

  const isAdmin = true;

  function editInvoice() {
    console.log("Edit invoice");
  }
  function deleteInvoice() {
    console.log("delete invoice");
  }

  function markAsRead() {
    console.log("Mark as read");
  }

  return (
    <section className=" bg-[#1d2238] w-full h-[100vh] pt-10  text-white pb-4 overflow-scroll flow">
      <div className="max-w-[35rem] w-[90%] m-auto">
        <p className="flex items-center gap-1 mb-4">
          <FaArrowLeftLong />
          Back
        </p>
        <article className="bg-[#131426] rounded-md p-4 mb-8">
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-x-4 text-sm">
              <span className="text-lg">Status</span>
              <LabelContainer type="pending">
                <Labels type="pending">Pending</Labels>
              </LabelContainer>
            </p>

            {isAdmin && (
              <div className="flex">
                <Button type="edit" onClick={editInvoice}>
                  Edit
                </Button>
                <Button type="delete" onClick={deleteInvoice}>
                  Delete
                </Button>
                <Button type="mark" onClick={markAsRead}>
                  Mark as read
                </Button>
              </div>
            )}
          </div>
        </article>
        <article className="bg-[#131426] rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-semibold">
              <h3>#XDFTRE</h3>
              <p>Graphic Design</p>
            </div>
            <div className="text-sm text-right">
              <p>Address</p>
              <p>City</p>
              <p>Logj</p>
              <p>Country</p>
            </div>
          </div>

          <main className="flex justify-between gap-2 mb-8">
            <div className="basis-[36%]">
              <article className="mb-6">
                <p className="text-sm font-bold py-1 text-[#c9c5c5]">
                  Invoice Date
                </p>
                <h3 className="text-sm font-bold">23 August 2023</h3>
              </article>
              <article>
                <p className="text-sm font-bold py-1 text-[#c9c5c5]">
                  Payment Date
                </p>
                <h3 className="text-sm font-bold">23 September 2023</h3>
              </article>
            </div>
            <div className="basis-[25%]">
              <p className="text-sm font-bold py-1 text-[#c9c5c5]">Bill To</p>
              <h3 className="text-sm font-bold">Alex Grin</h3>
              <div className="text-sm text-[#c9c5c5]">
                <p>Address</p>
                <p>City</p>
                <p>Logj</p>
                <p>Country</p>
              </div>
            </div>
            <div className="basis-[27%]">
              <p className="text-sm font-bold py-1 text-[#c9c5c5]">Sent To</p>
              <h3 className="text-sm font-bold">
                olayiwolaabdulrahmon@gmail.com
              </h3>
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
                <tr className="text-[#d9daec]">
                  <Td>Banner Design</Td>
                  <Td>1</Td>
                  <Td>{formatCurrency(Number(200))}</Td>
                  <Td>{formatCurrency(Number(1) * Number(200))}</Td>
                </tr>
                <tr className="text-[#d9daec]">
                  <Td>Banner Design</Td>
                  <Td>1</Td>
                  <Td>{formatCurrency(Number(200))}</Td>
                  <Td>{formatCurrency(Number(1) * Number(200))}</Td>
                </tr>
              </tbody>
            </Table>
            <div className="flex justify-between w-full px-2 py-3 bg-black text-white rounded-b-md mt-4">
              <p className="text-sm font-bold">Amount Due</p>
              <h2 className="text-xl font-semibold">
                {formatCurrency(Number(400))}
              </h2>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default InvoiceItem;
