import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { customReset } from "./customReset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    ${customReset}
`;

export default GlobalStyle;
