import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,View,
    TouchableOpacity,TouchableHighlight,
    Linking,Vibration
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class QrCodeScanner extends Component{

    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    onPress={() => Vibration.vibrate()}>
                    <View>
                        <Text>Vibrate</Text>
                    </View>
                </TouchableHighlight>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});

export default QrCodeScanner
