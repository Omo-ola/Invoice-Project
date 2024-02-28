import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";

import { Labels } from "./Labels";
import { LabelContainer } from "./LabelContainer";
import { Button } from "./Button";

import Spinner from "./Spinner";

import { FaArrowLeftLong } from "react-icons/fa6";
import {
  deleteOneInvoice,
  getOneInvoice,
  markPaid,
} from "../services/getInvoice";
import Invoice from "./Invoice";

function InvoiceItem() {
  const componentRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["oneInvoice"],
    });
  }, []);

  const isAdmin = localStorage.getItem("adminToken");

  const { isLoading, data } = useQuery({
    queryKey: ["oneInvoice"],
    queryFn: () => getOneInvoice(id),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (value) => deleteOneInvoice(value),
    onSuccess: () => {
      toast.success("Invoice deleted");
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: ["invoice"],
      });
    },
  });
  const { mutate: updateInvoiceStatus } = useMutation({
    mutationFn: (invoiceId) => markPaid(invoiceId),
    onSuccess: () => {
      toast.success("Invoice status updated");
      queryClient.invalidateQueries({
        queryKey: ["oneInvoice"],
      });
      queryClient.invalidateQueries({
        queryKey: ["invoice"],
      });
    },
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // function handle() {
  //   console.log(componentRef);
  // }

  if (isLoading) return <Spinner />;
  const { invoice } = data?.data;

  function editInvoice() {
    navigate(`/invoice/edit/${id}`);
    console.log("Edit invoice");
  }
  function deleteInvoice() {
    deleteMutate(id);
  }

  function markAsRead() {
    updateInvoiceStatus(id);
    console.log("Mark as read");
  }

  return (
    <section className=" bg-[#1d2238] w-full h-[100vh] pt-10  text-white pb-4 overflow-scroll flow">
      <div className="max-w-[35rem] w-[90%] m-auto">
        <p
          className="flex items-center gap-1 mb-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong />
          Back
        </p>
        <div ref={componentRef} className="bg-[#1d2238] p-2">
          <article className="bg-[#131426] rounded-md p-4 mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-4 text-sm">
                <span className="text-lg">Status</span>
                <LabelContainer type={`${invoice.status}`}>
                  <Labels type={`${invoice.status}`}>{invoice.status}</Labels>
                </LabelContainer>
              </div>

              {isAdmin && (
                <div className="flex">
                  {invoice.status === "paid" ? (
                    ""
                  ) : (
                    <Button type="edit" onClick={editInvoice}>
                      Edit
                    </Button>
                  )}
                  <Button type="delete" onClick={deleteInvoice}>
                    Delete
                  </Button>
                  {invoice.status === "paid" ? (
                    ""
                  ) : (
                    <Button type="mark" onClick={markAsRead}>
                      Mark as Paid
                    </Button>
                  )}
                </div>
              )}
            </div>
          </article>
          <Invoice invoice={invoice} />
        </div>
        <div className="flex justify-center">
          <button
            className="p-2 bg-[#7c5df9] my-4"
            // onClick={() => printResult()}
            onClick={handlePrint}
            // onClick={handle}
          >
            Print
          </button>
        </div>
      </div>
    </section>
  );
}

export default InvoiceItem;
