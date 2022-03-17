import React from 'react';
import {SvgXml} from 'react-native-svg';

const MediuswareIcon = () => {
    const mediuswareIcon = ` 
                        <svg width="90" height="28" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 25.606L26.8436 5.18704C30.5406 2.43554 36.9585 -1.069 33.0545 6.92484C31.8714 11.2693 31.28 18.2205 38.3781 11.2693C42.6666 5.76634 50.2676 -1.93786 46.3635 11.2693C43.5539 18.5101 40.2415 30.5587 49.469 20.8272C61.0035 8.66266 57.8982 14.3105 57.0108 20.8272C56.1235 27.3438 58.7854 26.9094 62.778 23.8683C65.9722 21.4355 80.6713 8.95229 87.6217 3.01484" stroke="url(#paint0_linear_225_4709)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <defs>
                        <linearGradient id="paint0_linear_225_4709" x1="88" y1="1.99999" x2="0.999999" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#00A88E"/>
                        <stop offset="1" stop-color="#0060AF"/>
                        </linearGradient>
                        </defs>
                        </svg>
                     `
    const MediuswareLogo = () => <SvgXml xml={mediuswareIcon}/>;

    return<MediuswareLogo/>
};

export default MediuswareIcon;

