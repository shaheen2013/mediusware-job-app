import React from 'react';
import {Text, Colors, View} from "react-native-ui-lib";
import AnimateLoadingButton from 'react-native-animate-loading-button';

const AnimatedFilledBtn = ({title}) => {
    // onPressHandler() {
    //     loadingButton.showLoading(true);
    //
    //     // mock
    //     setTimeout(() => {
    //         loadingButton.showLoading(false);
    //     }, 2000);
    // }
    return (
        <View style={{
            backgroundColor: Colors.blue,
            height: 50,
            width: '100%',
            borderRadius: 10
        }}>
            <AnimateLoadingButton
                ref={c => (loadingButton = c)}
                width={300}
                height={50}
                title={title}
                titleFontSize={16}
                titleColor={Colors.white}
                backgroundColor={Colors.blue}
                borderRadius={4}
               // onPress={this._onPressHandler.bind(this)}
            />
        </View>);
};

export default AnimatedFilledBtn;
