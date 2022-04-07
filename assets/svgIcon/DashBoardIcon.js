import React from 'react';
import {SvgXml} from 'react-native-svg';

const DashBoardIcon = () => {
    const dashBoardBar = ` 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.7778 2H4.22222C2.99492 2 2 2.99492 2 4.22222V19.7778C2 21.0051 2.99492 22 4.22222 22H19.7778C21.0051 22 22 21.0051 22 19.7778V4.22222C22 2.99492 21.0051 2 19.7778 2Z" fill="#0060AF"/>
                        <path d="M2.5 8.2H1.7V9.8H2.5V8.2ZM21.5 9.8H22.3V8.2H21.5V9.8ZM2.5 9.8H21.5V8.2H2.5V9.8Z" fill="white"/>
                        <path d="M8.7 21.5V22.3H10.3V21.5H8.7ZM10.3 9.5V8.7H8.7V9.5H10.3ZM10.3 21.5V9.5H8.7V21.5H10.3Z" fill="white"/>
                        </svg>
                     `
    const DashBoardBarSvg = () => <SvgXml xml={dashBoardBar}/>;

    return<DashBoardBarSvg/>
};

export default DashBoardIcon;