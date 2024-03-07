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
  total: number;
}
export interface ModalProps {
  closeModal: () => void;
  handleGetRecord: (record: Record) => void;
}

export interface Ilogin {
  email: string;
  password: string;
}

export interface IsignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ButtonProps {
  type: "edit" | "delete" | "mark" | undefined;
}

export interface ParagraphProps {
  type?: "paid" | "pending" | "draft";
}
export interface CardProps {
  types: "paid" | "pending" | "draft" | undefined;
}


export interface ChildrenProps {
  children: React.ReactNode; // Assuming you are working with React
}