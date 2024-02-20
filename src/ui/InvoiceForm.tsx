import styled from "styled-components";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyledInput } from "./StyledInput";
import { Label } from "./Label";
import { Th } from "./Th";
import { Table } from "./Table";
import TableRow from "./TableRow";
import Modal from "./Modal";
import toast from "react-hot-toast";

export interface TdProps {
  first?: string;
}

const SmallP = styled.p`
  font-size: 0.675rem;
  font-weight: 700;
  color: #7369c0;
  margin: 0.275rem 0;
`;

interface Toggle {
  openForm: (isOpen: boolean) => void;
}

function InvoiceForm({ openForm }: Toggle) {
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [arrOfItem, setArrOfItem] = useState<any[]>([]);

  // Interfaces

  interface Errors {
    [key: string]: any;
  }
  interface Item {
    price: string;
    quantity: string;
    itemName: string;
    id: string;
  }

  interface InvoiceData {
    streetAddress: string;
    billerCity: string;
    postCode: string;
    billerCountry: string;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientCity: string;
    clientPostCode: string;
    clientCountry: string;
    invoiceDate: string;
    paymentTerm: string;
    projectDescription: string;
  }
  // Function***********************************************************************************

  function handleGetRecord(record: Item) {
    setArrOfItem((prev) => {
      const updatedArr = [...prev, record];
      return updatedArr;
    });
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function onSubmit(data) {
    const itemPrice: Item[] = arrOfItem;
    if (itemPrice.length < 1) {
      toast.error("Add item that contain price and quantity");
      return;
    }
    const invoice = { ...data, itemPrice };
    console.log(invoice);
    
    
    toast.success("Invoice created and submitted successfully");
    reset();
    setIsOpen(false);
    setArrOfItem([]);
    openForm(false);
  }
  function onError(errors: Errors) {
    if (Object.keys(errors).length > 0) {
      const firstElement = errors[Object.keys(errors)[0]];
      toast.error(firstElement.message);
    } else {
      toast.error(errors.message);
    }
  }
  //End of Function******************************************************************************

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <p className="text-lg font-semibold text-white mb-2">New Invoice</p>
        <SmallP>Bill From</SmallP>
        <div>
          <Label>Street Address</Label>
          <StyledInput
            {...register("streetAddress", {
              required: "Street Address is required",
            })}
          />
        </div>
        <div className="flex gap-2">
          <div>
            <Label>City</Label>
            <StyledInput
              {...register("billerCity", {
                required: "Bill from City is required",
              })}
            />
          </div>
          <div>
            <Label>Post Code</Label>
            <StyledInput
              {...register("postCode", {
                required: "Post Code is required",
              })}
            />
          </div>
          <div>
            <Label>Country</Label>
            <StyledInput
              {...register("billerCountry", {
                required: "TBill from Country is required",
              })}
            />
          </div>
        </div>
        <SmallP>Bill To</SmallP>
        <div>
          <Label>Client's Name</Label>
          <StyledInput
            {...register("clientName", {
              required: "Client Name is required",
            })}
          />
        </div>
        <div>
          <Label>Client's Email</Label>
          <StyledInput
            type="email"
            {...register("clientEmail", {
              required: "Client Email is required",
            })}
          />
        </div>
        <div>
          <Label>Client Address</Label>
          <StyledInput
            {...register("clientAddress", {
              required: "Client Address is required",
            })}
          />
        </div>
        <div className="flex gap-2">
          <div>
            <Label>City</Label>
            <StyledInput
              {...register("clientCity", {
                required: "Client City is required",
              })}
            />
          </div>
          <div>
            <Label>Post Code</Label>
            <StyledInput
              {...register("clientPostCode", {
                required: "Client PostCode is required",
              })}
            />
          </div>
          <div>
            <Label>Country</Label>
            <StyledInput
              {...register("clientCountry", {
                required: "Client Country is required",
              })}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <Label>Invoice Date</Label>
            <StyledInput
              type="date"
              {...register("invoiceDate", {
                required: "Invoice Date is required",
              })}
            />
          </div>
          <div>
            <Label>Payment Term</Label>
            <StyledInput
              {...register("paymentTerm", {
                required: "Payment term is required",
              })}
            />
          </div>
        </div>
        <div>
          <Label>Project Description</Label>
          <StyledInput
            {...register("projectDescription", {
              required: "Description is required",
            })}
          />
        </div>

        <p className="text-[#d9daec] text-sm font-bold">Item List</p>
        <Table>
          <thead>
            <tr className="text-[#d9daec]">
              <Th>Item Name</Th>
              <Th>Qty</Th>
              <Th>Price</Th>
              <Th>Total</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {arrOfItem.map((item) => (
              <TableRow key={item.id} item={item} />
            ))}
          </tbody>
        </Table>
        <input
          type="button"
          className="text-center text-sm font-bold w-full p-1 bg-[#282948] text-[#d9daec] rounded-2xl mt-4"
          onClick={openModal}
          value={" + Add New Item"}
        />

        <div>
          <button
            type="submit"
            className="p-2 mt-4 font-bold text-sm rounded-full text-white bg-[#7c5df9]"
          >
            Create Invoice
          </button>
        </div>
      </form>
      {/* Modal section */}
      <section
        className={`absolute bottom-0 left-[20%] ${
          isOpen ? "" : "translate-x-[-600px]"
        } bg-white px-8 py-4`}
      >
        <Modal closeModal={closeModal} handleGetRecord={handleGetRecord} />
      </section>
    </>
  );
}

export default InvoiceForm;
