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
import Load from "react-native-loading-gif";

type Props = {

}

type State = {
    isRefreshing: boolean,
    avatarSource:string
}

class MineScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerRight: (
            <View style={{flexDirection: 'row'}}>
                <NavigationItem
                    icon={require('../../img/mine/icon_navigation_item_set_white.png')}
                    onPress={() => {

                    }}
                />
                <NavigationItem
                    icon={require('../../img/mine/icon_navigation_item_message_white.png')}
                    onPress={() => {

                    }}
                />
            </View>
        ),
        headerStyle: {
            backgroundColor: color.primary,
            elevation: 0,
            borderBottomWidth: 0,
        },
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
                let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
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
    selectPhotoTapped() {
        // this.refs.Load.OpenLoad();
        const options = {
            title:null,
            takePhotoButtonTitle:"拍照",
            cancelButtonTitle:'取消',
            chooseFromLibraryButtonTitle:'从手机相册选择',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            quality: 1.0,
            allowsEditing: false
        }

        ImagePicker.showImagePicker(options, (response) => {
            // this.refs.Load.CloseLoad();
            console.log('Response = ', response, 'ww', this.state);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };


                this.setState({
                    avatarSource: source
                });

            }
        });
    }
    _onPress(){
        this.refs.Load.OpenLoad();
    }
    renderHeader() {
        return (
            <View style={styles.header}>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <Image style={styles.avatar} source={this.state.avatarSource?this.state.avatarSource:require('../../img/mine/avatar.png')} />
                        </TouchableOpacity>
                        <Heading2 style={{color: 'white'}}>素敌</Heading2>
                    </View>
                    <Paragraph style={{color: 'white', marginTop: 4}}>个人信息 ></Paragraph>
                </View>
            </View>
        )
    }

    render() {
        console.log(this.state.avatarSource)
        return (
            <View style={{flex: 1, backgroundColor: color.paper}}>
                <View style={{position: 'absolute', width: screen.width, height: screen.height / 2, backgroundColor: color.primary}} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.renderHeader()}
                    <SpacingView />
                    {this.renderCells()}
                </ScrollView>
                <Load Image={4} ref="Load"></Load>
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
                    {title: '好友去哪', image: require('../../img/mine/icon_mine_friends.png')},
                    {title: '我的评价', image: require('../../img/mine/icon_mine_comment.png')},
                    {title: '我的收藏', image: require('../../img/mine/icon_mine_collection.png')},
                    {title: '会员中心', subtitle: 'v15', image: require('../../img/mine/icon_mine_membercenter.png')},
                    {title: '积分商城', subtitle: '好礼已上线', image: require('../../img/mine/icon_mine_member.png')}
                ],
                [
                    {title: '客服中心', image: require('../../img/mine/icon_mine_customerService.png')},
                    {title: '关于美团', subtitle: '我要合作', image: require('../../img/mine/icon_mine_aboutmeituan.png')}
                ]
            ]
        )
    }

}


const styles = StyleSheet.create({
    icon: {
        width: 27,
        height: 27,
    },
    header: {
        backgroundColor: color.primary,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default MineScene
