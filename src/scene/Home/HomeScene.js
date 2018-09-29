/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, {Component, PureComponent} from 'react'
import {
    View,
    Button,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
    Text,
    StatusBar,
    FlatList,TouchableHighlight
} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {color, NavigationItem, SpacingView} from '../../widget'

import {screen, system} from '../../common'
import api from '../../api'
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import SplashScreen from "rn-splash-screen";
import RNPopoverMenu from 'react-native-popover-menu';

import Icon from 'react-native-vector-icons'
import PayCode from "./PayCode";
import QrCodeScanner from "./QrCodeScanner";
import ImageSlider from 'react-native-image-slider';

type Props = {
    navigation: any,
}

type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    refreshing: boolean,
    adress: string
}

class HomeScene extends PureComponent<Props, State> {
    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../img/home/search_icon.png')} style={styles.searchIcon}/>
                <Paragraph>一点点
                </Paragraph>
            </TouchableOpacity>
        ),

        headerRight: (
            <IoniconsIcon style={styles.ionAdd} name="ios-add" color="#8B8B90" size={20}
                          onPress={() => navigation.state.params._onShowPopover()}/>
        ),
        headerLeft: (

            <NavigationItem
                title={navigation.state.params ? navigation.state.params.name : '福州'}
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
            adress: '福州'
        }

    }

    componentDidMount() {
        if (!this.props.navigation.state.params) {
            this.props.navigation.setParams({name: '福州', _onShowPopover: this.onShowPopover})
        } else {
            this.props.navigation.setParams({
                name: this.props.navigation.state.params.name,
                _onShowPopover: this.onShowPopover
            })
        }
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
                <HomeMenuView menuInfos={api.menuInfo} onMenuSelected={this.onMenuSelected}/>
                {/*<SpacingView/>*/}
                {/*<HomeGridView infos={this.state.discounts} onGridSelected={(this.onGridSelected)}/>*/}
                <SpacingView/>
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
    onShowPopover = () => {
        let copy = <Icon family={'Ionicons'} name={'ios-qr-scanner'} color={'#000000'} size={30}/>
        let paste = <Icon family={'FontAwesome'} name={'paypal'} color={'#000000'} size={30}/>
        let share = <Icon family={'FontAwesome'} name={'share'} color={'#000000'} size={30}/>

        let menus = [
            {
                label: "Editing",
                menus: [
                    {label: "扫一扫", icon: copy},
                    {label: "付款码", icon: paste}
                ]
            },
        ]
        RNPopoverMenu.Show(this.refs.btn, {
            title: "",
            menus: menus,
            onDone: selection => {
                if (selection == 0) {
                    this.props.navigation.navigate('QrCodeScanner')
                }
                if (selection == 1) {
                    this.props.navigation.navigate('PayCode')
                }

            },
            onCancel: () => {
            }
        });
    }


    render() {
        const images = [
            'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1538055769&di=2e4c7bd99d359f8ba1a4a1b68640d213&src=http://imgsrc.baidu.com/imgad/pic/item/32fa828ba61ea8d3d8d6c33f9c0a304e251f5810.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538065852689&di=bee719de6816348062082133f90c15b3&imgtype=0&src=http%3A%2F%2Fimg.ezfly.com%2Fwhtl%2FWHTL000222474%2F3222604.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538066017852&di=8c162e9e1d2c5fd0b2f57e483a6cf817&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D843574905%2C2376842750%26fm%3D214%26gp%3D0.jpg'
        ];
        return (
            <View style={styles.container}>
                <Text ref="btn" style={styles.popBtn}>aaaa</Text>
                <View style={styles.customSlideView}>
                    <ImageSlider
                        loop
                        autoPlayWithInterval={3000}
                        images={images}
                        customSlide={({ index, item, style, width }) => (
                            // It's important to put style here because it's got offset inside
                            <View
                                key={index}
                                style={[
                                    style,styles.customSlide
                                ]}
                            >
                                <Image source={{ uri: item }} style={styles.customImage} />
                            </View>
                        )}

                    />
                </View>

                <FlatList
                    data={this.state.dataList}
                    renderItem={this.renderCell}

                    keyExtractor={this.keyExtractor}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}

                    ListHeaderComponent={this.renderHeader}
                />
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
    navHeader: {
        backgroundColor: color.primary,
        flex: 1,
        flexDirection: 'row',
    },
    rtIcon: {
        width: screen.width / 15,
        height: screen.width / 10,
    },
    popBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 0,
        height: 0,
    },
    ionAdd: {
        color: 'white',
        fontSize: 40,
        margin: 8,
    },
    customSlideView: {
        height:100
    },
    customSlide:{

    },
    customImage: {
        width:'100%',
        height: '100%',
    },
})


export default HomeScene
