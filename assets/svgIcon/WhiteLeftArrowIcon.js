import React from 'react';
import {SvgXml} from 'react-native-svg';

const WhiteLeftArrowIcon = () => {
    const whiteLeftArrowIcon = `
                        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7L0.452847 6.41637C0.291527 6.56761 0.2 6.77887 0.2 7C0.2 7.22113 0.291527 7.43239 0.452847 7.58363L1 7ZM7.94715 1.58363C8.26948 1.28145 8.28581 0.775177 7.98363 0.452847C7.68145 0.130517 7.17518 0.114186 6.85285 0.41637L7.94715 1.58363ZM6.85285 13.5836C7.17518 13.8858 7.68145 13.8695 7.98363 13.5472C8.28581 13.2248 8.26948 12.7186 7.94715 12.4164L6.85285 13.5836ZM21 7.8C21.4418 7.8 21.8 7.44183 21.8 7C21.8 6.55817 21.4418 6.2 21 6.2V7.8ZM1.54715 7.58363L7.94715 1.58363L6.85285 0.41637L0.452847 6.41637L1.54715 7.58363ZM0.452847 7.58363L6.85285 13.5836L7.94715 12.4164L1.54715 6.41637L0.452847 7.58363ZM1 7.8H21V6.2H1V7.8Z" fill="white"/>
                        </svg>
                     `
    const WhiteLeftArrow = () => <SvgXml xml={whiteLeftArrowIcon}/>;
    return <WhiteLeftArrow/>
};

export default WhiteLeftArrowIcon;
