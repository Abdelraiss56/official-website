// fonts.js

import { createGlobalStyle } from 'styled-components';
import OswaldVariableFont from './fonts/Oswald-VariableFont_wght.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Oswald'; // Use the desired font-family name
        src: url(${OswaldVariableFont}) format('truetype');
        font-weight: 1 1000; // Adjust the font-weight range for variable fonts
    }

    /* Add more @font-face declarations for different weights or styles if needed */
`;

export default GlobalStyle;

// export const Renomono = createGlobalStyle`
//     @font-face {
//         font-family: 'Renomono';
//         src: url(${RenoMono}) format('opentype');
//     }
// `;