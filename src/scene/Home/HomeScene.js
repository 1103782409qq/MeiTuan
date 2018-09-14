/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan 
 * @flow
 */


import React, {Component,PureComponent} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {color, NavigationItem, SpacingView} from '../../widget'

import {screen, system} from '../../common'
import api from '../../api'


import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import { Button, NoticeBar, Popover,Icon,SearchBar, SegmentedControl } from 'antd-mobile';
import SplashScreen from "rn-splash-screen";

type Props = {
    navigation: any,
}

type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    refreshing: boolean,
    adress:string
}


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
            <NavigationItem
                icon={require('../../img/mine/icon_navigation_item_message_white.png')}
                onPress={() => {
                    alert(2)
                }}
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
            <View style={styles.container}>
                <SearchBar
                    value={this.state.value}
                    placeholder="Search"
                    onSubmit={value => console.log(value, 'onSubmit')}
                    onClear={value => this.clear(value, 'onClear')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={() => this.clear('onCancel')}
                    showCancelButton
                    onChange={this.onChange}
                />
                <SegmentedControl
                    values={['Segment1', 'Segment2', 'Segment3']}
                    tintColor={'#ff0000'}
                    style={{ height: 40, width: 250 }}
                />
                <NoticeBar
                    marqueeProps={{ loop: true, style: { padding: 10 } }}>
                    Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
                </NoticeBar>
                <Button>Start</Button>
                <Popover mask
                         overlayClassName="fortest"
                         overlayStyle={{ color: 'currentColor' }}
                         visible={this.state.visible}
                         overlay={[
                             (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
                             (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
                             (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                                 <span style={{ marginRight: 5 }}>Help</span>
                             </Item>),
                         ]}
                         align={{
                             overflow: { adjustY: 0, adjustX: 0 },
                             offset: [-10, 0],
                         }}
                         onVisibleChange={this.handleVisibleChange}
                         onSelect={this.onSelect}
                >
                    <div style={{
                        height: '100%',
                        padding: '0 15px',
                        marginRight: '-15px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    >
                        <Icon type="ellipsis" />
                    </div>
                </Popover>
            </View>
        )

        // return <Button>Start</Button>;

        // return (
        //     <View style={styles.container}>
        //         <FlatList
        //             data={this.state.dataList}
        //             renderItem={this.renderCell}
        //
        //             keyExtractor={this.keyExtractor}
        //             onRefresh={this.requestData}
        //             refreshing={this.state.refreshing}
        //
        //             ListHeaderComponent={this.renderHeader}
        //         />
        //     </View>
        // )
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
    }
})


export default HomeScene
