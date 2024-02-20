import { MdDelete } from "react-icons/md";
import { StyledInput } from "./StyledInput";
import { Td } from "./Td";
import { formatCurrency } from "../utils/helper";

function TableRow({ item }) {
  const { itemName, quantity, price,id } = item;
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
          <p className="text-[#d9daec]">
            {formatCurrency(Number(quantity) * Number(price))}
          </p>
        </Td>
        <Td first="">
          <div
            className="text-[#d9daec] cursor-pointer"
            //   onClick={() => handleDelete(arrayOfItems)}
          >
            <MdDelete />
          </div>
        </Td>
      </tr>
    </>
  );
}

export default TableRow;
