import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { InvoiceData, Item } from "../types/Interface";
import toast from "react-hot-toast";
import { editInvoice, getOneInvoice } from "../services/getInvoice";
import Modal from "./Modal";
import TableRow from "./TableRow";
import { Th } from "./Th";
import { Table } from "./Table";
import { StyledInput } from "./StyledInput";
import { Label } from "./Label";
import { SmallP } from "./InvoiceForm";
import { useState } from "react";
import Spinner from "./Spinner";
import { FaArrowLeftLong } from "react-icons/fa6";

function EditInvoice() {
  const { id } = useParams();
  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: (invoice) => editInvoice(id, invoice),
    onSuccess: () => {
      toast.success("Invoice created and Edited successfully");
      reset();
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["oneInvoice"],
      });
      navigate(`/invoice/${id}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: ["oneInvoice"],
  });

  const { isLoading: isFetching, data } = useQuery({
    queryKey: ["oneInvoice"],
    queryFn: () => getOneInvoice(id),
  });

  const invoice = data?.data?.invoice;


  const { register, handleSubmit, reset } = useForm<InvoiceData>({
    defaultValues: invoice,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [arrOfItem, setArrOfItem] = useState<Item[]>(invoice?.itemPrice);
  const navigate = useNavigate();

  // Functions
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

  const onSubmit = (data: InvoiceData) => {
    const itemPrice: Item[] = arrOfItem;
    if (itemPrice.length < 1) {
      toast.error("Add item that contain price and quantity");
      return;
    }

    const invoice = { ...data, itemPrice};
    mutate(invoice);
  };

  function onError(errors: Errors) {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      const firstElement = errors[Object.keys(errors)[0]];
      toast.error(firstElement.message);
    } else {
      toast.error(errors.message);
    }
  }

  // fnctions

  return (
    <section className="    bg-[#1d2238] w-full pt-10 h-[100vh] overflow-x-hidden overview  text-white">
      {isFetching ? (
        <Spinner />
      ) : (
        <div className="max-w-[35rem] w-[90%] m-auto bg-[#10111f] p-4">
          <p
            className="flex items-center gap-1 mb-4 cursor-pointer"
            onClick={() => navigate(`/invoice/${id}`)}
          >
            <FaArrowLeftLong />
            Back
          </p>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <p className="text-lg font-semibold text-white mb-2">
              Edit Invoice
            </p>
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
              <div className="w-[50%]">
                <Label>Invoice Date</Label>
                <StyledInput
                  type="date"
                  {...register("invoiceDate", {
                    required: "Invoice Date is required",
                  })}
                />
              </div>
              <div className="w-[50%]">
                <Label>Payment Term</Label>
                <select
                  className="py-[0.275rem] px-[0.5rem] bg-[#1f2138] rounded-[3px] w-full mt-[0.15rem] mb-[0.25rem] outline-0 text-[#d9daec] text-[0.675rem]"
                  id="paymentTerm"
                  {...register("paymentTerm", {
                    required: "Payment term is required",
                  })}
                >
                  <option value="10">Next 10 days</option>
                  <option value="10">Next 30 days</option>
                </select>
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
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {arrOfItem?.map((item) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    setArrOfItem={setArrOfItem}
                  />
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
                disabled={isEditing}
              >
                Edit Invoice
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
        </div>
      )}
    </section>
  );
}

export default EditInvoice;
