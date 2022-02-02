import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #444444;
    scroll-behavior: smooth;
  }
  body {
    position: relative;
    margin: 10vh 0 10vh 0;
    min-height: 80vh;
    /* scrollbar */
    ::-webkit-scrollbar {
      width: 10px;
      background-color: #F5F5F5;
    }
    ::-webkit-scrollbar-track {
      box-shadow: 0 0 6px rgba(0,0,0,0.9);
	    background-color: #CCCCCC;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
    	background-color: #444444;
    }
  }
  header{
    height: 10vh
  }
  footer{
    position: absolute;
    bottom: -10vh;
    left: 0;
    right: 0;
    height: 10vh;
  }
  button{
    background: none;
    cursor: pointer;
	  border: none;
	  outline: none;
  }

  input[type="number"] {
  -webkit-appearance: textfield;
     -moz-appearance: textfield;
          appearance: textfield;
  }
  input[type="file"] {
    display: none;
  }   
  input[type='number']::-webkit-inner-spin-button, 
  input[type='number']::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  }
  a{
  text-decoration: none;
  }
`;

export default GlobalStyle;
