import axios from "axios";
import { InvoiceData } from "../types/Interface";

const address = "https://invoice-api-1.onrender.com/";

export async function getInvoice() {
  try {
    const response = axios.get(`${address}api/invoices`);
    return response;
  } catch (error:any) {
    throw new Error("Error getting data");
  }
}

export async function createInvoice(invoice: InvoiceData) {
  try {
    const response = await axios.post(`${address}api/invoices`, invoice, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error:any) {
    if (error.message === "Request failed with status code 403") {
      throw new Error("Please Login");
    }
    throw new Error(error.message);
  }
}

export async function getOneInvoice(id: string) {
  try {
    const response = axios.get(`${address}api/invoices/${id}`);
    return response;
  } catch (error:any) {
    throw new Error("Error getting data");
  }
}

export async function deleteOneInvoice(id: string) {
  try {
    const response = await axios.delete(`${address}api/invoices/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (error:any) {
    throw new Error("Error deleting data");
  }
}

export async function markPaid(id: string) {
  try {
    const response = await axios.put(
      `${address}api/invoices/${id}`,
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
    const response = await axios.put(`${address}api/invoices/${id}`, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error editing invoice");
  }
};

export const getUserInvoice = async () => {
  try {
    const response = await axios.get(`${address}api/user/invoices/id`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};
