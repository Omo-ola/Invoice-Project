import styled from "styled-components";
import { ParagraphProps } from "../types/Interface";

export const Labels = styled.p<ParagraphProps>`
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
