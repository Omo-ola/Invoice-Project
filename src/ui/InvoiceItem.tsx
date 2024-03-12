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
import { getLoginUser } from "../services/getUser";
import { useDarkMode } from "../context/DarkModeContext";

function InvoiceItem() {
  const componentRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // @ts-ignore
  const { isDark } = useDarkMode();

  const { isLoading, data } = useQuery({
    queryKey: ["oneInvoice"],
    // @ts-ignore
    queryFn: () => getOneInvoice(id),
  });

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["loginUser"],
    queryFn: getLoginUser,
  });
  // @ts-ignore
  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    // @ts-ignore
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
    // @ts-ignore
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

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["oneInvoice"],
    });
  }, [queryClient]);



  const pageStyle = `@page {
    size: A4 landscape;
    // background : var(--bg-color-ter);
    // backgroundColor : #1d2238;
  }`;




  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
    pageStyle() {
      return pageStyle;
    },
  });

  if (isLoading && userLoading)
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );

  //@ts-ignore
  const { invoice } = data?.data;
  const currentUser = userData?.data?.data;

  function editInvoice() {
    navigate(`/invoice/edit/${id}`);
  }
  function deleteInvoice() {
    if (confirm("Do you want to delete this Invoice")) {
      //@ts-ignore
      deleteMutate(id);
    }
  }

  function markAsRead() {
    //@ts-ignore
    updateInvoiceStatus(id);
  }

  return (
    // I changed height here
    <section className=" bg-[var(--bg-color-ter)] w-full h-[100%] pt-10  text-white pb-4 overflow-scroll flow">
      <div className="max-w-[55rem] w-[95%] m-auto">
        <p
          className="flex items-center gap-1 mb-4 cursor-pointer text-[var(--color-text-white)]"
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong />
          Back
        </p>
          <div
            ref={componentRef}
            className={`bg-[var(--bg-color-ter)] p-2`}
          >
            <article
              className={`bg-[var(--bg-color-primary)] ${
                isDark && "shadow-xl"
              } rounded-md p-4 mb-8`}
            >
              <div className="flex sm:justify-between justify-center items-center flex-wrap gap-4">
                <div className="flex items-center gap-x-4 text-sm">
                  <span
                    className="md:text-lg text-base text-[var(--color-text-white)]"
                  >
                    Status
                  </span>
                  {/* @ts-ignore */}
                  <LabelContainer type={`${invoice.status}`}>
                    {/* @ts-ignore */}
                    <Labels type={`${invoice.status}`}>{invoice.status}</Labels>
                  </LabelContainer>
                </div>
                {currentUser?.isAdmin ? (
                  <div className="flex justify-around md:justify-normal">
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
                ) : currentUser?._id === invoice.posterId ? (
                  <>
                    {invoice.status === "paid" ? (
                      ""
                    ) : (
                      <Button type="edit" onClick={editInvoice}>
                        Edit
                      </Button>
                    )}
                    <Button
                      type="delete"
                      disabled={isDeleting}
                      onClick={deleteInvoice}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </article>
            <Invoice invoice={invoice} />
          </div>

        <div className="flex justify-center">
          <button className="p-2 bg-[#7c5df9] my-4" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
    </section>
  );
}

export default InvoiceItem;
