/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan 
 * @flow
 */


import React, {Component,PureComponent} from 'react'
import {View, Button, StyleSheet, ScrollView, TouchableOpacity, ListView, Image,Text, StatusBar, FlatList} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {color, NavigationItem, SpacingView} from '../../widget'

import {screen, system} from '../../common'
import api from '../../api'

import { NoticeBar, Popover,SearchBar, SegmentedControl } from 'antd-mobile';

import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import SplashScreen from "rn-splash-screen";
import RNPopoverMenu from 'react-native-popover-menu';

import Icon from 'react-native-vector-icons'
const Item = Popover.Item;


type Props = {
    navigation: any,
}

type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    refreshing: boolean,
    adress:string
}

{/*<NavigationItem*/}
    {/*icon={require('../../img/mine/icon_navigation_item_message_white.png')}*/}
    {/*onPress={() => {*/}
        {/*alert(2)*/}
    {/*}}*/}
{/*/>*/}
{/*<View style={styles.container}>*/}
    {/*<Button ref="btn"*/}
    {/*onPress={this.onShowPopover}*/}
    {/*title="Learn More"*/}
    {/*color="#841584"*/}
    {/*accessibilityLabel="Learn more about this purple button"*/}
    {/*/>*/}
    {/*<FlatList*/}
        {/*data={this.state.dataList}*/}
        {/*renderItem={this.renderCell}*/}

        {/*keyExtractor={this.keyExtractor}*/}
        {/*onRefresh={this.requestData}*/}
        {/*refreshing={this.state.refreshing}*/}

        {/*ListHeaderComponent={this.renderHeader}*/}
    {/*/>*/}
{/*</View>*/}
{/*<Popover.Item*/}
    {/*key="6"*/}
    {/*value="button ct"*/}
    {/*icon='https://gw.alipayobjects.com/zos/rmsportal/tOtXhkIWzwotgGSeptou.svg'*/}
    {/*style={{ backgroundColor: "#efeff4" ,marginLeft:100}}*/}
{/*>*/}
    {/*<Text>关闭</Text>*/}
{/*</Popover.Item>*/}
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;


class HomeScene extends PureComponent<Props, State> {
    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../img/home/search_icon.png')} style={styles.searchIcon} />
                <Paragraph>一点点
                </Paragraph>
            </TouchableOpacity>
        ),

        headerRight: (
            <Button ref="btn"
                    onPress={()=>navigation.state.params._onShowPopover()}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
            />

),
        headerLeft: (
            <NavigationItem
                title={navigation.state.params?navigation.state.params.name:'福州'}
                titleStyle={{color: 'white'}}
                onPress={() => {
                    navigation.navigate('SelectCity')
                }}
            />
        ),
        headerStyle: {backgroundColor: color.primary},
        // header:null
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            discounts: [],
            dataList: [],
            refreshing: false,
            adress:'福州'
        }

    }

    componentDidMount() {
        this.props.navigation.setParams({ _onShowPopover:this.onShowPopover })
        this.requestData()
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);//延时2秒消失
    }

    requestData = () => {
        this.setState({refreshing: true})
        // 折扣内容，没值
        this.requestDiscount()
        // 列表的数据
        this.requestRecommend()
    }

    requestRecommend = async () => {
        try {
            let response = await fetch(api.recommend)
            let json = await response.json()

            let dataList = json.data.map(
                (info) => {
                    return {
                        id: info.id,
                        imageUrl: info.squareimgurl,
                        title: info.mname,
                        subtitle: `[${info.range}]${info.title}`,
                        price: info.price
                    }
                }
            )

            this.setState({
                dataList: dataList,
                refreshing: false,
            })
        } catch (error) {
            this.setState({refreshing: false})
        }
    }

    requestDiscount = async () => {
        try {
            let response = await fetch(api.discount)
            let json = await response.json()
            this.setState({discounts: json.data})
        } catch (error) {
            alert(error)
        }
    }

    renderCell = (info: Object) => {
        return (
            <GroupPurchaseCell
                info={info.item}
                onPress={this.onCellSelected}
            />
        )
    }

    onCellSelected = (info: Object) => {
        StatusBar.setBarStyle('default', false)
        this.props.navigation.navigate('GroupPurchase', {info: info})
    }

    keyExtractor = (item: Object, index: number) => {
        return item.id
    }

    renderHeader = () => {
        return (
            <View>
                <HomeMenuView menuInfos={api.menuInfo} onMenuSelected={this.onMenuSelected} />
                <SpacingView />
                <HomeGridView infos={this.state.discounts} onGridSelected={(this.onGridSelected)} />
                <SpacingView />
                <View style={styles.recommendHeader}>
                    <TouchableOpacity onPress={this.onGridSelected}>
                        <Heading3>猜你喜欢</Heading3>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onGridSelected = (index: number) => {
        // let discount = this.state.discounts[index]
        //
        // if (discount.type == 1) {
        //     StatusBar.setBarStyle('default', false)
        //
        //     let location = discount.tplurl.indexOf('http')
        //     let url = discount.tplurl.slice(location)
            this.props.navigation.navigate('Web', {url: 'http://www.baidu.com'})
        // }
    }

    onMenuSelected = (index: number) => {
        alert(index)
    }
    onShowPopover = ()=>{
//         let copy = <Icon family={'FontAwesome'} name={'copy'} color={'#000000'} size={30} />
//         let paste = <Icon family={'FontAwesome'} name={'paste'} color={'#000000'} size={30} />
//         let share = <Icon family={'FontAwesome'} name={'share'} color={'#000000'} size={30} />
//
//         let menus = [
//             {
//                 label: "Editing",
//                 menus: [
//                     { label: "Copy", icon: copy },
//                     { label: "Paste", icon: paste }
//                 ]
//             },
//             {
//                 label: "Other",
//                 menus: [
//                     { label: "Share", icon: share }
//                 ]
//             },
//             {
//                 label: "",
//                 menus: [
//                     { label: "Share me please" }
//                 ]
//             }
//         ]
//         // debugger
// console.log(this.refs.btn)
//         RNPopoverMenu.Show(this.refs.btn, {
//             title: "",
//             menus: menus,
//             onDone: selection => { },
//             onCancel: () => { }
//         });
        this.refs["Popover"].menuContextRef.openMenu(
            "m"
        );
    }
    state = {
        value: '',
    }

    onScrollChange = (value) => {
        console.log(value)
    }

    handleClick = () => {
        this.manualFocusInst.focus()
    }

    clear = () => {
        this.setState({ value: '' })
    }

    render() {
        return (
            <View                     style={{ backgroundColor: "#eee" ,position:'absolute',top:0,right:0}}
            >
                <Popover
                    name={"m"}
                    ref={"Popover"}
                    mask
                    overlayClassName="fortest"
                    overlayStyle={{ color: 'currentColor' }}
                    overlay={[
                        (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId"><Text>Scan</Text></Item>),
                        (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} ><Text>My Qrcode</Text></Item>),
                        (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                            <Text>Help</Text>
                        </Item>),
                    ]}
                    align={{
                        overflow: { adjustY: 0, adjustX: 0 },
                        offset: [-10, 0],
                    }}
                >
                </Popover>
            </View>

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
    // container: {
    //     flex: 1,
    //     backgroundColor: color.paper
    // },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
    navHeader:{
        backgroundColor: color.primary,
        flex:1,
        flexDirection: 'row',
    },
    rtIcon:{
        width: screen.width / 15,
        height: screen.width / 10,
    }
})


export default HomeScene
