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
      invoice
    );
    return response.data;
  } catch (error) {
    throw new Error("Error posting data");
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
      `http://localhost:7000/api/invoices/${id}`
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
      data
    );
    return response;
  } catch (error) {
    throw new Error("Error editing invoice");
  }
};
