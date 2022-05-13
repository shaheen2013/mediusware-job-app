

import React from 'react';
import {SvgXml} from 'react-native-svg';

const ExaminationIcon = () => {
    const examinationIcon = ` 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.4002 12.0001C21.4002 17.1914 17.1917 21.3999 12.0003 21.3999C6.80894 21.3999 2.60049 17.1914 2.60049 12.0001C2.60049 6.80869 6.80894 2.60024 12.0003 2.60024C17.1917 2.60024 21.4002 6.80869 21.4002 12.0001Z" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.4003 12.0001C17.4003 14.9824 14.9827 17.4 12.0004 17.4C9.01811 17.4 6.60049 14.9824 6.60049 12.0001C6.60049 9.01786 9.01811 6.60024 12.0004 6.60024C14.9827 6.60024 17.4003 9.01786 17.4003 12.0001Z" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.3999 12.0002C13.3999 12.7734 12.7732 13.4002 12 13.4002C11.2268 13.4002 10.6 12.7734 10.6 12.0002C10.6 11.227 11.2268 10.6002 12 10.6002C12.7732 10.6002 13.3999 11.227 13.3999 12.0002Z" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     `
    const ExaminationIconSvg = () => <SvgXml xml={examinationIcon}/>;

    return<ExaminationIconSvg/>
};

export default ExaminationIcon;