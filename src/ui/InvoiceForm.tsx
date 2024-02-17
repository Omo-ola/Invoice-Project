import styled from "styled-components";

import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyledInput } from "./StyledInput";
import { Label } from "./Label";
import { Th } from "./Th";
import { Td } from "./Td";
import { Table } from "./Table";
import TableRow from "./TableRow";

export interface TdProps {
  first?: string;
}

const SmallP = styled.p`
  font-size: 0.675rem;
  font-weight: 700;
  color: #7369c0;
  margin: 0.275rem 0;
`;

function InvoiceForm() {
  const { register, handleSubmit } = useForm();
  const [count, setCount] = useState(1);
  const arrayOfItems = Array.from({ length: count }, (_, index) => index + 1);
  const entryList = [];

  function handleAddItem() {
    setCount(count + 1);
  }

  function handleGetRecord(record: any) {
    if (record.itemName !== "" && record.price !== "") {
      entryList.push(record);
      console.log(record);
      console.log(entryList);
    }
  }

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold text-white mb-2">New Invoice</p>
      <SmallP>Bill From</SmallP>
      <div>
        <Label>Street Address</Label>
        <StyledInput {...register("streetAddress")} />
      </div>
      <div className="flex gap-2">
        <div>
          <Label>City</Label>
          <StyledInput {...register("billerCity")} />
        </div>
        <div>
          <Label>Post Code</Label>
          <StyledInput {...register("postCode")} />
        </div>
        <div>
          <Label>Country</Label>
          <StyledInput {...register("billerCountry")} />
        </div>
      </div>
      <SmallP>Bill To</SmallP>
      <div>
        <Label>Client's Name</Label>
        <StyledInput {...register("clientName")} />
      </div>
      <div>
        <Label>Client's Email</Label>
        <StyledInput type="email" {...register("clientEmail")} />
      </div>
      <div>
        <Label>Client Address</Label>
        <StyledInput {...register("clientAddress")} />
      </div>
      <div className="flex gap-2">
        <div>
          <Label>City</Label>
          <StyledInput {...register("clientCity")} />
        </div>
        <div>
          <Label>Post Code</Label>
          <StyledInput {...register("clientPostCode")} />
        </div>
        <div>
          <Label>Country</Label>
          <StyledInput {...register("clientCountry")} />
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <Label>Invoice Date</Label>
          <StyledInput type="date" {...register("invoiceDate")} />
        </div>
        <div>
          <Label>Payment Term</Label>
          <StyledInput {...register("paymentTerm")} />
        </div>
      </div>
      <div>
        <Label>Project Description</Label>
        <StyledInput {...register("projectDescription")} />
      </div>

      <p className="text-[#d9daec] text-sm font-bold">Item List</p>
      <Table>
        <thead>
          <tr className="text-[#d9daec]">
            <Th>Item Name</Th>
            <Th>Qty</Th>
            <Th>Price</Th>
            <Th>Click</Th>
            <Th>Total</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {arrayOfItems.map((item) => (
            <tr key={item} id={`${item}`}>
              <Td first="true">
                <StyledInput {...register(`itemName${item}`)} />
              </Td>
              <Td first="">
                <StyledInput {...register(`quantity${item}`)} />
              </Td>
              <Td first="">
                <StyledInput {...register(`price${item}`)} />
              </Td>
              <Td first="">
                <p className="text-[#d9daec]">$40</p>
              </Td>
              <Td first="">
                <div
                  className="text-[#d9daec]"
                  //   onClick={() => handleDelete(arrayOfItems)}
                >
                  <MdDelete />
                </div>
              </Td>
            </tr>
            // <TableRow key={item} handleClick={handleGetRecord} />
          ))}
        </tbody>
      </Table>
      <input
        type="button"
        className="text-center text-sm font-bold w-full p-1 bg-[#282948] text-[#d9daec] rounded-2xl mt-4"
        onClick={handleAddItem}
        value={" + Add New Item"}
      />

      <div>
        <button type="submit">Create Invoice</button>
      </div>
    </form>
  );
}

export default InvoiceForm;
