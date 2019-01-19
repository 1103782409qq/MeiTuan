/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TouchableHighlight,ScrollView, RefreshControl} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {screen, system} from '../../common'
import {color, DetailCell, NavigationItem, SpacingView} from '../../widget'

import ImagePicker from 'react-native-image-picker';

type Props = {

}

type State = {
    isRefreshing: boolean,
    avatarSource:string
}

export default class SettingScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        title: '设置',
        headerStyle: {backgroundColor: 'white'},
    })
    state: {
        isRefreshing: boolean,
        avatarSource:string
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false,
            avatarSource: null,
        }
    }

    onHeaderRefresh() {
        this.setState({isRefreshing: true})

        setTimeout(() => {
            this.setState({isRefreshing: false})
        }, 2000)
    }
    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title}
                                       onPress={() => {
                                           if(data.path=='LoginScene'){
                                               this.props.navigation.goBack()
                                           }else{
                                               this.props.navigation.navigate(data.path)
                                           }
                                       }}/>
                cells.push(cell)
            }
            cells.push(<SpacingView key={i} />)
        }

        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: color.paper}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    <SpacingView />
                    {this.renderCells()}
                </ScrollView>
            </View>
        )
    }

    getDataList() {
        return (
            [
                [
                    {title: '我的钱包', subtitle: '办信用卡', image: require('../../img/mine/icon_mine_wallet.png')},
                    {title: '余额', subtitle: '￥95872385', image: require('../../img/mine/icon_mine_balance.png')},
                    {title: '抵用券', subtitle: '63', image: require('../../img/mine/icon_mine_voucher.png')},
                    {title: '会员卡', subtitle: '2', image: require('../../img/mine/icon_mine_membercard.png')}
                ],
                [
                    {title: '退出账户', image: require('../../img/mine/icon_mine_aboutmeituan.png'),path:'LoginScene'},
                ]
            ]
        )
    }

}

