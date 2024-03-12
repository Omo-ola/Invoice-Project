import styled from "styled-components";
import { TdProps } from "../types/Interface";

export const Td = styled.td<TdProps>`
  padding: 2px 8px;
  width: ${(props) => (props.first === "true" ? "35%" : "auto")};
  @media only screen and (max-width: 500px) {
    font-size: 10px;
  }
`;
