import React from 'react';
import {SvgXml} from 'react-native-svg';

const ApplicationIcon = () => {
    const applicationIcon = ` 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.6 7.99955V16.0005C3.60031 16.2395 3.66682 16.4763 3.79557 16.6874L3.79561 16.6874C3.9244 16.8986 4.11189 17.0779 4.34253 17.2043C4.34288 17.2045 4.34323 17.2047 4.34357 17.2049L11.7301 21.2044L11.7324 21.2057C11.9638 21.3322 12.2286 21.4 12.5 21.4C12.7714 21.4 13.0362 21.3322 13.2676 21.2057L13.2699 21.2044L20.6564 17.2049C20.6568 17.2047 20.6572 17.2045 20.6575 17.2043C20.8881 17.0778 21.0756 16.8985 21.2043 16.6875L21.2045 16.6873C21.3332 16.4763 21.3997 16.2394 21.4 16.0001V7.99991C21.3997 7.76063 21.3332 7.52376 21.2044 7.31271L21.2044 7.31259C21.0756 7.10149 20.8881 6.92219 20.6576 6.79582C20.6572 6.79561 20.6568 6.79541 20.6565 6.7952L13.2699 2.79563L13.2676 2.79438C13.0362 2.66778 12.7713 2.6 12.5 2.6C12.2287 2.6 11.9638 2.66778 11.7324 2.79437L11.7301 2.79563L4.34352 6.79522C4.34317 6.79541 4.34282 6.7956 4.34247 6.79579C4.11191 6.92215 3.92441 7.10145 3.79559 7.31261L3.6 7.99955ZM3.6 7.99955C3.60031 7.7605 3.66682 7.52372 3.79559 7.31262L3.6 7.99955Z" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4 8L12.5 12L21 8" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13 21V12" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     `
    const ApplicationIconSvg = () => <SvgXml xml={applicationIcon}/>;

    return<ApplicationIconSvg/>
};

export default ApplicationIcon;