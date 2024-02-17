import { MdDelete } from "react-icons/md";
import { StyledInput } from "./StyledInput";
import { Td } from "./Td";
import { useId, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function TableRow({ handleClick }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const id = Math.random().toString(36).substring(7);

  return (
    <>
      <tr>
        <Td first="true">
          <StyledInput
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Td>
        <Td first="">
          <StyledInput
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Td>
        <Td first="">
          <StyledInput
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </Td>

        <Td first="">
          <div
            className="text-white cursor-pointer underline"
            onClick={() => handleClick({ itemName, quantity, price, id })}
          >
           Done
          </div>
        </Td>
        <Td first="">
          <p className="text-[#d9daec]">$40</p>
        </Td>
        <Td first="">
          <div
            className="text-[#d9daec]"
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
