import styled from "styled-components";
import { TdProps } from "./InvoiceForm";

export const Td = styled.td<TdProps>`
  padding: 2px 8px;
  width: ${(props) => (props.first === "true" ? "35%" : "auto")};
`;
