import { MdDelete } from "react-icons/md";
import { StyledInput } from "./StyledInput";
import { Td } from "./Td";
import { formatCurrency } from "../utils/helper";
import toast from "react-hot-toast";
import { Item } from "../types/Interface";

function TableRow({ item, setArrOfItem }:any) {
  const { itemName, quantity, price, id } = item;

  function handleDelete() {
    setArrOfItem((items: Item[]) => items.filter((data) => data.id !== id));
    toast.success("Item deleted Successfully");
  }

  return (
    <>
      <tr>
        <Td first="true">
          <StyledInput value={itemName} readOnly />
        </Td>
        <Td>
          <StyledInput value={quantity} readOnly />
        </Td>
        <Td>
          <StyledInput value={price} readOnly />
        </Td>
        <Td>
          <p className="text-[var(--color-text-sec)]">
            {formatCurrency(Number(quantity) * Number(price))}
          </p>
        </Td>
        <Td first="">
          <div
            className="text-[var(--color-text-sec)] cursor-pointer"
            onClick={() => handleDelete()}
          >
            <MdDelete />
          </div>
        </Td>
      </tr>
    </>
  );
}

export default TableRow;
