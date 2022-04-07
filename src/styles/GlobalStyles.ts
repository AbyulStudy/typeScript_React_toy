import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
    }
    body{
        margin: 50px auto;
        width: 500px;
        height: 600px;
        border: 1px solid black;
    }
`;

export default GlobalStyles;
