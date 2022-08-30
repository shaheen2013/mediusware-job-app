import React from 'react';
import { SvgXml } from 'react-native-svg';

const CheckIcon = () => {
    const checkIcon = ` <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12C2 6.47656 6.47656 2 12 2C17.5234 2 22 6.47656 22 12C22 17.5234 17.5234 22 12 22C6.47656 22 2 17.5234 2 12ZM16.5234 10.2734C16.9492 9.84766 16.9492 9.15234 16.5234 8.72656C16.0977 8.30078 15.4023 8.30078 14.9766 8.72656L10.75 12.9531L9.02344 11.2266C8.59766 10.8008 7.90234 10.8008 7.47656 11.2266C7.05078 11.6523 7.05078 12.3477 7.47656 12.7734L9.97656 15.2734C10.4023 15.6992 11.0977 15.6992 11.5234 15.2734L16.5234 10.2734Z" fill="#0060AF"/>
                        </svg> 
                     `
    const CheckIconSvg = () => <SvgXml xml={checkIcon}/>;

    return<CheckIconSvg/>
};

export default CheckIcon;