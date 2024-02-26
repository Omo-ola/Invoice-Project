import axios from "axios";
import { InvoiceData } from "../types/Interface";

export async function getInvoice() {
  try {
    const response = axios.get("http://localhost:7000/api/invoices");
    return response;
  } catch (error) {
    throw new Error("Error getting data");
  }
}

export async function createInvoice(invoice: InvoiceData) {
  try {
    const response = await axios.post(
      "http://localhost:7000/api/invoices",
      invoice,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.message === "Request failed with status code 403") {
      throw new Error("Please Login");
    }
    throw new Error(error.message);
  }
}

export async function getOneInvoice(id: string) {
  try {
    const response = axios.get(`http://localhost:7000/api/invoices/${id}`);
    return response;
  } catch (error) {
    throw new Error("Error getting data");
  }
}

export async function deleteOneInvoice(id: string) {
  try {
    const response = await axios.delete(
      `http://localhost:7000/api/invoices/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error deleting data");
  }
}

export async function markPaid(id: string) {
  try {
    const response = await axios.put(
      `http://localhost:7000/api/invoices/${id}`,
      {
        status: "paid", // Set the new status here
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error deleting data");
  }
}

export const editInvoice = async (id: string, data: InvoiceData) => {
  try {
    const response = await axios.put(
      `http://localhost:7000/api/invoices/${id}`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error editing invoice");
  }
};
