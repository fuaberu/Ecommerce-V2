import { createGlobalStyle } from 'styled-components';

import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    margin-top: ${theme.navHeight};
    padding: 0;
    box-sizing: border-box;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  button{
    background: none;
	  border: none;
	  outline: none;
  }
`;

export default GlobalStyle;
