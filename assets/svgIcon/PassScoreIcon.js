import React from 'react';
import {SvgXml} from 'react-native-svg';

const PassScoreIcon = () => {
    const passScoreIcon = ` 
                       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_225_5490" fill="white">
                        <rect x="2.51123" y="1.67383" width="15.0652" height="16.7391" rx="0.836957"/>
                        </mask>
                        <rect x="2.51123" y="1.67383" width="15.0652" height="16.7391" rx="0.836957" stroke="#2B2B2B" stroke-width="2.0087" mask="url(#path-1-inside-1_225_5490)"/>
                        <path d="M12.0345 5.90936C12.2508 6.01076 12.4359 6.09531 12.6189 6.18394C12.7862 6.26498 12.8467 6.39786 12.7805 6.52714C12.718 6.64921 12.5826 6.67895 12.4145 6.60236C12.1941 6.50189 11.9753 6.39799 11.7458 6.29091C11.7401 6.32927 11.736 6.35276 11.7331 6.37638C11.7098 6.56484 11.6298 6.65238 11.4846 6.64788C11.336 6.64327 11.2581 6.54194 11.2565 6.34514C11.2548 6.13338 11.2561 5.9216 11.2561 5.70982C11.2561 5.44387 11.2539 5.1779 11.257 4.91198C11.2594 4.70637 11.3402 4.62655 11.5478 4.62493C11.8719 4.62241 12.196 4.62242 12.5202 4.62497C12.7187 4.6265 12.801 4.70671 12.8131 4.89938C12.8134 4.90429 12.8133 4.90923 12.8132 4.91416C12.8071 5.60697 12.8897 5.4655 12.3095 5.76627C12.227 5.80906 12.1445 5.85209 12.0345 5.90936ZM11.7406 5.51589C11.9366 5.41698 12.1133 5.33088 12.286 5.23739C12.2999 5.22564 12.3111 5.21101 12.3188 5.19453C12.3264 5.17805 12.3303 5.16011 12.3302 5.14199C12.3303 5.12344 12.2873 5.08899 12.263 5.08832C12.0912 5.08361 11.9193 5.08582 11.7406 5.08582V5.51589Z" fill="#2B2B2B"/>
                        <path d="M9.89254 4.62355C10.1649 4.62269 10.4267 4.72774 10.6212 4.91598C10.8158 5.10423 10.9276 5.36054 10.9323 5.62951C10.9379 6.17945 10.4697 6.64216 9.90296 6.64673C9.76684 6.64873 9.63167 6.62397 9.50533 6.57391C9.37898 6.52384 9.26398 6.44946 9.167 6.35509C9.07003 6.26072 8.99302 6.14825 8.94046 6.02422C8.8879 5.90019 8.86084 5.76708 8.86084 5.63262C8.86133 5.49941 8.88842 5.36761 8.94057 5.24475C8.99271 5.1219 9.06888 5.01042 9.16472 4.91668C9.26056 4.82295 9.37417 4.74881 9.49906 4.69851C9.62396 4.64821 9.75767 4.62274 9.89254 4.62355ZM9.88544 6.17229C10.0314 6.17535 10.1727 6.12169 10.279 6.02287C10.3853 5.92405 10.4481 5.78797 10.4538 5.6439C10.4543 5.57119 10.4402 5.4991 10.4124 5.43179C10.3846 5.36447 10.3436 5.30325 10.2917 5.25163C10.2399 5.20002 10.1782 5.15903 10.1103 5.13102C10.0423 5.10302 9.96946 5.08855 9.89584 5.08844C9.74975 5.08737 9.60915 5.14337 9.50469 5.24423C9.40022 5.3451 9.34034 5.48265 9.33811 5.62693C9.3374 5.69834 9.35103 5.76918 9.37822 5.83535C9.40542 5.90152 9.44563 5.96171 9.49653 6.01243C9.54743 6.06315 9.60801 6.10339 9.67477 6.13083C9.74153 6.15827 9.81313 6.17236 9.88544 6.17229Z" fill="#2B2B2B"/>
                        <path d="M13.6188 5.09165V5.40094C13.7132 5.40094 13.8015 5.3966 13.8892 5.40193C14.032 5.41059 14.13 5.50918 14.1295 5.63572C14.1288 5.69574 14.1049 5.75322 14.0627 5.79641C14.0205 5.83961 13.9632 5.86526 13.9025 5.86813C13.814 5.8769 13.7238 5.86978 13.6231 5.86978V6.17625C13.8557 6.17625 14.0879 6.1747 14.3201 6.1772C14.3896 6.175 14.4591 6.18244 14.5265 6.19931C14.5782 6.2122 14.6231 6.24371 14.6524 6.28763C14.6817 6.33155 14.6934 6.38472 14.685 6.43668C14.6753 6.55372 14.6072 6.64036 14.4891 6.64281C14.1054 6.65079 13.7211 6.6536 13.3376 6.64154C13.1859 6.63677 13.1383 6.50966 13.136 6.37559C13.1323 6.16872 13.1347 5.96174 13.1346 5.75481C13.1346 5.4789 13.1323 5.20296 13.1354 4.92708C13.138 4.70361 13.2189 4.6235 13.4423 4.62184C13.7615 4.61947 14.0808 4.61955 14.4001 4.62208C14.5836 4.62367 14.6861 4.70928 14.6877 4.8519C14.6893 4.99528 14.5874 5.08725 14.4067 5.09047C14.1483 5.09508 13.8898 5.09165 13.6188 5.09165Z" fill="#2B2B2B"/>
                        <path d="M5.99962 6.17633C5.75073 5.81503 5.52144 5.48214 5.29207 5.14929C5.2612 5.1045 5.22848 5.06088 5.19914 5.01513C5.06845 4.81136 5.1644 4.6228 5.40998 4.61686C5.71427 4.6095 6.01888 4.61423 6.32335 4.61498C6.37814 4.61398 6.43291 4.61753 6.48709 4.62559C6.61912 4.64815 6.69047 4.7299 6.68533 4.86133C6.68655 4.89001 6.68179 4.91863 6.67134 4.94542C6.6609 4.9722 6.64498 4.99658 6.62459 5.01703C6.6042 5.03749 6.57977 5.05359 6.55282 5.06432C6.52587 5.07506 6.49696 5.0802 6.46791 5.07944C6.30866 5.08819 6.14868 5.08357 5.98902 5.08568C5.94569 5.08625 5.9024 5.09018 5.84046 5.0936C5.87515 5.14911 5.89868 5.19018 5.92544 5.22907C6.15537 5.5632 6.39213 5.89301 6.61138 6.23381C6.66112 6.32011 6.67716 6.4214 6.65648 6.51858C6.62929 6.62959 6.51217 6.65033 6.39877 6.64924C6.07436 6.64615 5.74989 6.64957 5.42546 6.64756C5.24484 6.64643 5.14163 6.55869 5.14219 6.41444C5.14274 6.2709 5.24579 6.18134 5.42643 6.17722C5.60568 6.17314 5.7851 6.17633 5.99962 6.17633Z" fill="#2B2B2B"/>
                        <path d="M8.08391 4.60449C8.18097 4.61938 8.27676 4.64149 8.37045 4.67064C8.4905 4.7143 8.55127 4.80961 8.51628 4.94093C8.48206 5.06932 8.39222 5.12698 8.2588 5.11221C8.18461 5.104 8.11075 5.07761 8.0374 5.07992C7.79301 5.08761 7.6255 5.22236 7.52284 5.42944C7.42749 5.62179 7.47137 5.8028 7.61282 5.96313C7.76514 6.13578 7.94455 6.2039 8.17355 6.1261C8.33883 6.06994 8.46092 6.11974 8.50934 6.24934C8.56054 6.38638 8.4963 6.49766 8.3262 6.56658C7.93811 6.72382 7.52969 6.60672 7.23238 6.25298C6.95322 5.92082 6.91904 5.47025 7.14527 5.12591C7.35479 4.80701 7.64341 4.62169 8.08391 4.60449Z" fill="#2B2B2B"/>
                        <path d="M5.1453 9.4458C5.03221 9.36555 4.87547 9.39218 4.79523 9.50527C4.71498 9.61837 4.74161 9.7751 4.8547 9.85535L5.1453 9.4458ZM5.49223 9.99984L5.34693 10.2046L5.49223 10.3077L5.63753 10.2046L5.49223 9.99984ZM6.81197 9.37128C6.92506 9.29103 6.95169 9.1343 6.87144 9.0212C6.79119 8.90811 6.63446 8.88148 6.52137 8.96173L6.81197 9.37128ZM4.8547 9.85535L5.34693 10.2046L5.63753 9.79506L5.1453 9.4458L4.8547 9.85535ZM5.63753 10.2046L6.81197 9.37128L6.52137 8.96173L5.34693 9.79506L5.63753 10.2046Z" fill="#2B2B2B"/>
                        <path d="M5.1453 11.9458C5.03221 11.8656 4.87547 11.8922 4.79523 12.0053C4.71498 12.1184 4.74161 12.2751 4.8547 12.3553L5.1453 11.9458ZM5.49223 12.4998L5.34693 12.7046L5.49223 12.8077L5.63753 12.7046L5.49223 12.4998ZM6.81197 11.8713C6.92506 11.791 6.95169 11.6343 6.87144 11.5212C6.79119 11.4081 6.63446 11.3815 6.52137 11.4617L6.81197 11.8713ZM4.8547 12.3553L5.34693 12.7046L5.63753 12.2951L5.1453 11.9458L4.8547 12.3553ZM5.63753 12.7046L6.81197 11.8713L6.52137 11.4617L5.34693 12.2951L5.63753 12.7046Z" fill="#2B2B2B"/>
                        <path d="M5.1453 14.4458C5.03221 14.3656 4.87547 14.3922 4.79523 14.5053C4.71498 14.6184 4.74161 14.7751 4.8547 14.8553L5.1453 14.4458ZM5.49223 14.9998L5.34693 15.2046L5.49223 15.3077L5.63753 15.2046L5.49223 14.9998ZM6.81197 14.3713C6.92506 14.291 6.95169 14.1343 6.87144 14.0212C6.79119 13.9081 6.63446 13.8815 6.52137 13.9617L6.81197 14.3713ZM4.8547 14.8553L5.34693 15.2046L5.63753 14.7951L5.1453 14.4458L4.8547 14.8553ZM5.63753 15.2046L6.81197 14.3713L6.52137 13.9617L5.34693 14.7951L5.63753 15.2046Z" fill="#2B2B2B"/>
                        <rect x="7.53271" y="9.20654" width="6.69565" height="0.502174" rx="0.251087" fill="#2B2B2B"/>
                        <rect x="7.53271" y="11.7173" width="6.69565" height="0.502174" rx="0.251087" fill="#2B2B2B"/>
                        <rect x="7.53271" y="14.228" width="6.69565" height="0.502174" rx="0.251087" fill="#2B2B2B"/>
                        </svg>
                     `
    const PassScoreIconSvg = () => <SvgXml xml={passScoreIcon}/>;

    return<PassScoreIconSvg/>
};

export default PassScoreIcon;