
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { MapView } from 'react-native-amap3d'

export default class Map3D extends Component<{}> {
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

