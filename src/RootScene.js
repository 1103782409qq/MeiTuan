/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */


import React, {PureComponent} from 'react'
import {StatusBar} from 'react-native'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

import color from './widget/color'
import {screen, system} from './common'
import TabBarItem from './widget/TabBarItem'

import HomeScene from './scene/Home/HomeScene'
import OrderScene from './scene/Order/OrderScene'
import NearbyScene from './scene/Nearby/NearbyScene'
import MineScene from './scene/Mine/MineScene'

import WebScene from './widget/WebScene'
import GroupPurchaseScene from './scene/GroupPurchase/GroupPurchaseScene'
import SelectCity from './scene/SelectCity/SelectCity'
import PayCode from "./scene/Home/PayCode";
import TakePicture from "./scene/Home/TakePicture";
import QrCodeScanner from "./scene/Home/QrCodeScanner";
import PopoverMenu from "./scene/Home/PopoverMenu/PopoverMenu";
import Map3D from "./scene/Nearby/Map3D";
import CustomKeyPage from "./scene/Mine/CustomKeyPage";
import LoginScene from "./scene/Mine/LoginScene";
import RegisterScene from "./scene/Mine/RegisterScene";
import FindPass from "./scene/Mine/FindPass";
import SettingScene from "./scene/Mine/SettingScene";
import WechatShare from "./scene/Mine/WechatShare";

const lightContentScenes = ['Home', 'Mine']
function getCurrentRouteName(navigationState: any) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route)
    }
    return route.routeName
}


class RootScene extends PureComponent<{}> {
    constructor() {
        super()

        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState)
                        const previousScene = getCurrentRouteName(prevState)
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content')
                            } else {
                                StatusBar.setBarStyle('dark-content')
                            }
                        }
                    }
                }
            />
        )
    }
}

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_homepage.png')}
                        selectedImage={require('./img/tabbar/tabbar_homepage_selected.png')}
                    />
                )
            }),
        },
        Nearby: {
            screen: NearbyScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '附近',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_merchant.png')}
                        selectedImage={require('./img/tabbar/tabbar_merchant_selected.png')}
                    />
                )
            }),
        },

        Order: {
            screen: OrderScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '订单',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_order.png')}
                        selectedImage={require('./img/tabbar/tabbar_order_selected.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_mine.png')}
                        selectedImage={require('./img/tabbar/tabbar_mine_selected.png')}
                    />
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: color.primary,
            inactiveTintColor: color.gray,
            style: {backgroundColor: '#ffffff'},
        },
    }

)

const Navigator = StackNavigator(
    {
        Tab: {screen: Tab},
        Web: {screen: WebScene},
        GroupPurchase: {screen: GroupPurchaseScene},
        SelectCity: {screen: SelectCity},
        PayCode: {screen: PayCode},
        TakePicture: {screen: TakePicture},
        QrCodeScanner: {screen: QrCodeScanner},
        PopoverMenu: {screen: PopoverMenu},
        Map3D: {screen: Map3D},
        CustomKeyPage: {screen: CustomKeyPage},
        LoginScene: {screen: LoginScene},
        RegisterScene: {screen:RegisterScene},
        FindPass: {screen: FindPass},
        SettingScene: {screen: SettingScene},
        WechatShare: {screen: WechatShare},
    },
    {
        navigationOptions: {
            // headerStyle: { backgroundColor: color.primary }
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        },
        initialRouteName:'Tab',//默认首页,若没有initialRouteName声明，则前面的页面排在第一个的就是首页
        onTransitionStart:()=>{
            console.log("导航栏切换开始");
        },
        onTransitionEnd:()=>{
            console.log("导航栏结束");
        },
        mode:"card",//car:左右 modal:上下
    }
)

export default RootScene
