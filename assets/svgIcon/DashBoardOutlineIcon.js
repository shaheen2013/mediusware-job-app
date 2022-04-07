import React from 'react';
import {SvgXml} from 'react-native-svg';

const DashBoardOutlineIcon = () => {
    const dashBoardOutlineBar = ` 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.22222 2.8H19.7778C20.5633 2.8 21.2 3.43674 21.2 4.22222V19.7778C21.2 20.5633 20.5633 21.2 19.7778 21.2H4.22222C3.43674 21.2 2.8 20.5633 2.8 19.7778V4.22222C2.8 3.43675 3.43675 2.8 4.22222 2.8Z" stroke="#4D4D4D" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 8.2H2.2V9.8H3V8.2ZM21 9.8H21.8V8.2H21V9.8ZM3 9.8H21V8.2H3V9.8Z" fill="#4D4D4D"/>
                        <path d="M8.7 21V21.8H10.3V21H8.7ZM10.3 9.5V8.7H8.7V9.5H10.3ZM10.3 21V9.5H8.7V21H10.3Z" fill="#4D4D4D"/>
                        </svg>

                     `
    const OutlineDashBoardBarSvg = () => <SvgXml xml={dashBoardOutlineBar}/>;

    return<OutlineDashBoardBarSvg/>
};

export default DashBoardOutlineIcon;