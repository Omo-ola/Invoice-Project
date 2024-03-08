import styled from "styled-components";
import { formatCurrency } from "../utils/helper";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { CardProps } from "../types/Interface";
import { LabelContainer } from "./LabelContainer";
import { Labels } from "./Labels";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--bg-color-ter);
  color: var(--color-text);
  border-radius: 6px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 730px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
  }
`;

function Card({ types, invoice }: CardProps) {
  const date = new Date(invoice.invoiceDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  // const total = invoice.itemPrice.map(item=> )
  const total = invoice.itemPrice.reduce(
    (acc: string, currentItem:any) => Number(acc) + Number(currentItem.total),
    0
  );

  return (
    <Container>
      <h3 className="row-start-1 row-end-1 font-semibold">
        <span className="text-[#3b3d66]">#</span>
        {invoice.invoiceId}
      </h3>
      {/* <p className="row-start-2">Due {invoice.invoiceDate}</p> */}
      <p className="row-start-2">
        Due {new Intl.DateTimeFormat("en-GB", options).format(date)}
      </p>
      <p className="">{invoice.clientName}</p>
      <p className="text-xl font-semibold">{formatCurrency(total)}</p>
      <div className="col-start-2 row-start-2 row-span-2 flex gap-4 items-center">
        <LabelContainer type={types}>
          <Labels type={types}>{types}</Labels>
        </LabelContainer>
        <Link
          to={`/invoice/${invoice._id}`}
          className="text-[#7761e7] font-bold cursor-pointer"
        >
          <IoIosArrowForward />
        </Link>
      </div>
    </Container>
  );
}

export default Card;
