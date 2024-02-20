export interface TdProps {
  first?: string;
}
export interface Toggle {
  openForm: (isOpen: boolean) => void;
}

export interface Errors {
  [key: string]: any;
}
export interface Item {
  price: string;
  quantity: string;
  itemName: string;
  id: string;
}

 export interface InvoiceData {
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


export interface Record {
  itemName: string;
  quantity: string;
  price: string;
  id: string;
}
export interface ModalProps {
  closeModal: () => void;
  handleGetRecord: (record: Record) => void;
}