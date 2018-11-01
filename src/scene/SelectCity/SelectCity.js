/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { MapView } from 'react-native-amap3d'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

export default class SelectCity extends Component<{}> {
    _points = Array(1000).fill(0).map(() => ({
        latitude: 39.5 + Math.random(),
        longitude: 116 + Math.random(),
    }))

    _onItemPress = point => Alert.alert(this._points.indexOf(point).toString())

    render() {
        return (
            <MapView zoomLevel={12} style={StyleSheet.absoluteFill}>
                <MapView.MultiPoint
                    image="point"
                    points={this._points}
                    onItemPress={this._onItemPress}
                />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
