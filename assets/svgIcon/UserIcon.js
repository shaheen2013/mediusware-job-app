import React from 'react';
import {SvgXml} from 'react-native-svg';

const UserIcon = () => {
    const userTabBar = ` 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.1107 21.2584C3.63025 19.4164 4.7774 17.7805 6.38364 16.6096C7.99051 15.4383 9.96466 14.8 12 14.8C14.0353 14.8 16.0095 15.4383 17.6164 16.6096C19.2226 17.7805 20.3698 19.4164 20.8893 21.2584" stroke="#4D4D4D" stroke-width="1.6" stroke-linecap="round"/>
                         <circle cx="12" cy="7" r="4.2" stroke="#4D4D4D" stroke-width="1.6" stroke-linecap="round"/></svg>
                     `
    const UserTabBarSvg = () => <SvgXml xml={userTabBar}/>;

    return<UserTabBarSvg/>
};

export default UserIcon;