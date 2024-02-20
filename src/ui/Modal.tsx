import toast from "react-hot-toast";
import { StyledInput } from "./StyledInput";
import { FormEvent, useState } from "react";
import { ModalProps } from "../types/Interface";

function Modal({ closeModal, handleGetRecord }: ModalProps) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();

    const id = Math.random().toString(36).substring(7);
    if (itemName === "") {
      toast.error("Fill the required fields");
      return;
    }
    if (quantity === "" && Number(quantity) <= 0) {
      toast.error("Quantity should be greater than 0");
      return;
    }
    if (price === "" && Number(price) <= 0) {
      toast.error("Price should be greater than 0");
      return;
    }
    handleGetRecord({ itemName, quantity, price, id });
    toast.success("Item created Successfully");
    setItemName("");
    setQuantity("");
    setPrice("");
    closeModal();
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Item Name</label>
        <StyledInput
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div>
        <label>Quantity</label>
        <StyledInput
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>Price</label>
        <StyledInput
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <input
          type="button"
          className="text-center text-sm font-bold w-full p-1 bg-[#f15146] text-[#d9daec] cursor-pointer rounded-2xl mt-4"
          onClick={closeModal}
          value={"Cancel"}
        />
        <input
          type="submit"
          className="text-center text-sm font-bold w-full p-1 bg-[#1b6835] text-[#d9daec] cursor-pointer rounded-2xl mt-4"
          value={"Add Item"}
        />
      </div>
    </form>
  );
}

export default Modal;
