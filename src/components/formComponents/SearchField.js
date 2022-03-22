import React from 'react';
import {Feather} from '@expo/vector-icons';
import {TextInput, StyleSheet} from 'react-native';
import {Text, View, TouchableOpacity, TextField} from 'react-native-ui-lib';

const SearchField = () => {
    return (
        <View style={styles.textInputStyle} row>
            <TouchableOpacity
                style={{
                    alignSelf: 'center'
                }}>
                <Feather name="search" size={24} color="gray" style={{marginRight: 15}}/>
            </TouchableOpacity>
            <TextInput
                autoCapitalize={"none"}
                autoCorrect={false}
                style={{
                    flex: 1,
                    fontFamily: 'Montserrat_400Regular'
                }}
                placeholder={'Search'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInputStyle: {
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 16,
        marginBottom: 10,
    }
})

export default SearchField;
