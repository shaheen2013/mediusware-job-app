import React from 'react';
import {SvgXml} from 'react-native-svg';

const ProfileFilledIcon = () => {
    const profileFilledIcon = ` 
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66547 20.8971L2.52613 21.35H3L21 21.35H21.4739L21.3345 20.8971C20.7815 19.0995 19.5644 17.5157 17.877 16.388C16.1896 15.2603 14.1239 14.65 12 14.65C9.87613 14.65 7.81038 15.2603 6.12299 16.388C4.43558 17.5156 3.21849 19.0995 2.66547 20.8971Z" fill="#0060AF" stroke="#0060AF" stroke-width="0.7" stroke-linecap="round"/>
                        <circle cx="12" cy="7" r="5" fill="#0060AF"/>
                        </svg>
                     `
    const ProfileFilledIconSvg = () => <SvgXml xml={profileFilledIcon}/>;

    return<ProfileFilledIconSvg/>
};

export default ProfileFilledIcon;