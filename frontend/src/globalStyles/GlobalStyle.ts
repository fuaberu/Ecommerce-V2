import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    position: relative;
    margin: 10vh 0 10vh 0;
    min-height: 80vh;
    
    font-family: Open-Sans, Helvetica, Sans-Serif;

    scroll-behavior: smooth;

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
    	background-image: -webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)));
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

  
`;

export default GlobalStyle;
