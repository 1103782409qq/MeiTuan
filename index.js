/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, { PureComponent } from 'react'
import { AppRegistry, StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import RootScene from './src/RootScene';
const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 320,
    }
});

const slides = [
    {
        key: 'somethun',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('./src/img/intro/1.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('./src/img/intro/2.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('./src/img/intro/3.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    }
];

export default class MeiTuan extends PureComponent<{}> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showRealApp: false
        }

    }

    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }
    render() {
        // if (this.state.showRealApp) {
            return (
                <RootScene />
            );
        // } else {
        //     return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
        // }
    }
}

AppRegistry.registerComponent('MeiTuan', () => MeiTuan);
