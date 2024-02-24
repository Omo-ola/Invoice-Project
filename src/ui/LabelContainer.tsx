import styled from "styled-components";
import { ParagraphProps } from "../types/Interface";

export const LabelContainer = styled.div<ParagraphProps>`
  padding: 0.25rem 0.2rem 0.25rem 1.2rem;
  width: 5.5rem;
  text-align: center;
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
