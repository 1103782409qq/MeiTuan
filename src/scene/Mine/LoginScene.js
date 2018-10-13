/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TouchableHighlight,ScrollView, RefreshControl} from 'react-native'
import {Paragraph} from "../../widget/Text";
import SpacingView from "../../widget/SpacingView";
import NavigationItem from "../../widget/NavigationItem";



export default class LoginScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        title: '登录',
        headerStyle: {backgroundColor: 'white'},
    })

    render() {
        return (
            <View>
                <TouchableOpacity  onPress={() => {
                    this.props.navigation.navigate('Tab')
                }}>
                    <Paragraph>登录</Paragraph>
                </TouchableOpacity>
                <SpacingView />
                <SpacingView />
                <SpacingView />
                <TouchableOpacity  onPress={() => {
                    this.props.navigation.navigate('SettingScene')
                }}>
                    <Paragraph>注册</Paragraph>
                </TouchableOpacity>
            </View>
        )
    }


}


const styles = StyleSheet.create({

})


