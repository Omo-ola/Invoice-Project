import styled from "styled-components";
import { ButtonProps } from "../types/Interface";

export const Button = styled.p<ButtonProps>`
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  background-color: ${(props) => {
    switch (props.type) {
      case "edit":
        return "#1d2238";
      case "delete":
        return "#da3f3f";
      case "mark":
        return "#7c5df9";
      default:
        return "white";
    }
  }};
  cursor: pointer;
  margin-right: 5px;
`;
