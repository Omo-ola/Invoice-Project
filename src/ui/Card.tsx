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
  align-items: center;
  padding: 1.5rem;
  background-color: #1d2238;
  color: white;
  border-radius: 6px;
  margin-bottom: 1rem;

  @media (max-width: 730px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
  }
`;

function Card({ types }: CardProps) {
  return (
    <Container>
      <h3 className="row-start-1 row-end-1 font-semibold">
        <span className="text-[#3b3d66]">#</span>ff453E1
      </h3>
      <p className="row-start-2">Due 19 Aug 2021</p>
      <p className="">Jahnsen Huang</p>
      <p className="text-xl font-semibold">{formatCurrency(6500.9)}</p>
      <div className="col-start-2 row-start-2 row-span-2 flex gap-4 items-center">
        <LabelContainer type={types}>
          <Labels type={types}>{types}</Labels>
        </LabelContainer>
        <Link
          to="/invoice/id"
          className="text-[#7761e7] font-bold cursor-pointer"
        >
          <IoIosArrowForward />
        </Link>
      </div>
    </Container>
  );
}

export default Card;
