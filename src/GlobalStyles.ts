import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /*Reset básico*/
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Fonte padrão*/
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
        color: #333;
        line-height: 1.5;
    }

    /*Links*/
    a {
        text-decoration: none;
        color: inherit;
    }

    /*Botões*/
    button {
        cursor: pointer;
        font-family: inherit;
    }

    /*Inputs*/
    input, textarea {
        font-family: inherit;
    }

`;
