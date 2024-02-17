import styled from "styled-components";
import { formatCurrency } from "../utils/helper";

interface ParagraphProps {
  type?: "paid" | "pending" | "draft";
}
interface CardProps {
  types: "paid" | "pending" | "draft" | undefined;
}

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

const LabelContainer = styled.div<ParagraphProps>`
  padding: 0.25rem 2rem;
  border-radius: 0.125rem;
  background-color: ${(props) => {
    switch (props.type) {
      case "paid":
        return "rgba(46, 195, 153, 0.2)";
      case "pending":
        return "rgba(221, 141, 26, 0.2)";
      case "draft":
        return "rgba(237, 239, 255, 0.2)";
      default:
        return "white";
    }
  }};
`;

const Labels = styled.p<ParagraphProps>`
  position: relative;
  font-weight: 700;
  text-transform: capitalize;
  color: ${(props) => {
    switch (props.type) {
      case "paid":
        return "#2ec399";
      case "pending":
        return "#f0880d";
      case "draft":
        return "#edefff";
      default:
        return "white";
    }
  }};

  &::before {
    content: "";
    position: absolute;
    border-radius: 999px;
    width: 8px;
    height: 8px;
    background-color: ${(props) => {
      switch (props.type) {
        case "paid":
          return "#2ec399";
        case "pending":
          return "#f0880d";
        case "draft":
          return "#edefff";
        default:
          return "white";
      }
    }};
    left: -14px;
    top: 8px;
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
      <div className="col-start-2 row-start-2 row-span-2">
        <LabelContainer type={types}>
          <Labels type={types}>{types}</Labels>
        </LabelContainer>
      </div>
    </Container>
  );
}

export default Card;
