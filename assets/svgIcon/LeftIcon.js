import React from 'react';
import {SvgXml} from 'react-native-svg';

const LeftIcon = () => {
    const leftIcon = ` 
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="10" fill="#E6EFF7" fill-opacity="0.5"/>
                        <rect x="10" y="12" width="12.7273" height="2.28571" rx="1.14286" fill="#4D4D4D"/>
                        <rect x="10" y="18.8572" width="4.54547" height="2.28571" rx="1.14286" fill="#4D4D4D"/>
                        <rect x="17.2725" y="18.8572" width="12.7273" height="2.28571" rx="1.14286" fill="#4D4D4D"/>
                        <rect x="10" y="25.7142" width="12.7273" height="2.28571" rx="1.14286" fill="#4D4D4D"/>
                        </svg>
                     `
                        const LeftIconSvg = () => <SvgXml xml={leftIcon}/>;

                        return<LeftIconSvg/>
};

export default LeftIcon;
