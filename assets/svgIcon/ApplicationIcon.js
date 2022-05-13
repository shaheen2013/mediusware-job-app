import React from 'react';
import {SvgXml} from 'react-native-svg';

const ApplicationIcon = () => {
    const applicationIcon = ` 
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.6 5.99955V14.0005C0.600314 14.2395 0.666824 14.4763 0.795569 14.6874L0.795615 14.6874C0.924399 14.8986 1.11189 15.0779 1.34253 15.2043C1.34288 15.2045 1.34323 15.2047 1.34357 15.2049L8.73013 19.2044L8.7324 19.2057C8.96378 19.3322 9.22864 19.4 9.5 19.4C9.77136 19.4 10.0362 19.3322 10.2676 19.2057L10.2699 19.2044L17.6564 15.2049C17.6568 15.2047 17.6572 15.2045 17.6575 15.2043C17.8881 15.0778 18.0756 14.8985 18.2043 14.6875L18.2045 14.6873C18.3332 14.4763 18.3997 14.2394 18.4 14.0001V5.99991C18.3997 5.76063 18.3332 5.52376 18.2044 5.31271L18.2044 5.31259C18.0756 5.10149 17.8881 4.92219 17.6576 4.79582C17.6572 4.79561 17.6568 4.79541 17.6565 4.7952L10.2699 0.795625L10.2676 0.794378C10.0362 0.667777 9.77133 0.6 9.5 0.6C9.22867 0.6 8.96382 0.667777 8.73243 0.794373L8.73013 0.79563L1.34352 4.79522C1.34317 4.79541 1.34282 4.7956 1.34247 4.79579C1.11191 4.92215 0.924408 5.10145 0.795592 5.31261L0.6 5.99955ZM0.6 5.99955C0.600314 5.7605 0.666816 5.52372 0.795588 5.31262L0.6 5.99955Z" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1 6L9.49999 10L18 6" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 19V10" stroke="#4D4D4D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     `
    const ApplicationIconSvg = () => <SvgXml xml={applicationIcon}/>;

    return<ApplicationIconSvg/>
};

export default ApplicationIcon;