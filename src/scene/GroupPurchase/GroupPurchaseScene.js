/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager,
    Platform,
    CameraRoll,
    Clipboard} from 'react-native'
import FS from 'react-native-fs'

import {Dimensions} from 'react-native'

import Modal from "react-native-modal";
import JShareModule from 'jshare-react-native';
import Share from 'react-native-share';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {color, Button, NavigationItem, Separator, SpacingView} from '../../widget'
import {Heading2, Heading3, Paragraph, Heading1} from '../../widget/Text'
import {screen, system} from '../../common'
import api, {recommendUrlWithId, groupPurchaseDetailWithId} from '../../api'
import GroupPurchaseCell from './GroupPurchaseCell'
const imgURL = 'https://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png';

type Props = {
    navigation: any,
}

type State = {
    data: Array<Object>,
    refreshState: number,
}


class GroupPurchaseScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: '团购详情',
        headerStyle: {backgroundColor: 'white'},
        headerRight: (
            <NavigationItem
                icon={require('../../img/public/icon_navigation_item_share.png')}
                onPress={() => {
                    navigation.setParams({visibleModal: true})
                }}
            />
        ),
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            data: [],
            refreshState: RefreshState.Idle,
            imgggg:'',
            newDownloadDest:'',
            visibleModal: false,
            text:'我是文本'
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.requestData()
        })
        JShareModule.setDebug({enable: true})
        this.downloadFile(this.props.navigation.state.params.info.imageUrl.replace('w.h', '480.0'));
        this.props.navigation.setParams({visibleModal: false})
    }
    handleOnScroll = event => {
        this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y
        });
    };

    handleScrollTo = p => {
        if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
        }
    };
    onSharePress1 = () => {
        var shareParam = {
            platform: "wechat_session",
            imagePath: this.newDownloadDest,//有值会显示该值，图片，没值就显示微信开放平台申请的那张图片
            type: "link",
            url: "https://jiguang.cn",
            title:'JShare title',
            text: "JShare test text2",
        };
        JShareModule.share(shareParam, (map) => {
            console.log("share result: " + JSON.stringify(map));
            this.props.navigation.setParams({visibleModal: false})
        }, (map) => {
            console.log(map);
        });
    }
    onSharePress2 = () => {
        var shareParam = {
            platform: "wechat_timeLine",
            imagePath: this.newDownloadDest,
            type: "link",
            url: "https://jiguang.cn",
            title:'JShare title',
            text: "JShare test text2",//朋友圈这个没用

        };
        JShareModule.share(shareParam, (map) => {
            console.log("share result: " + JSON.stringify(map));
            this.props.navigation.setParams({visibleModal: false})
        }, (map) => {
            console.log(map);
        });
    }
    onSharePress3 = () => {
        var shareParam = {
            platform: "qq",
            imagePath: this.newDownloadDest,//有值会显示该值，图片，没值就显示微信开放平台申请的那张图片
            type: "link",
            url: "https://jiguang.cn",
            title:'JShare title',
            text: "JShare test text2",//不显示，分享到后只显示链接
        };
        JShareModule.share(shareParam, (map) => {
            console.log("share result: " + JSON.stringify(map));
            this.props.navigation.setParams({visibleModal: false})
        }, (map) => {
            console.log(map);
        });
    }
    onSharePress4 = () => {
        var shareParam = {
            platform: "qzone",
            imagePath: this.newDownloadDest,
            type: "link",
            url: "https://jiguang.cn",
            title:'JShare title',
            text: "JShare test text2",//文字小一号
        };
        JShareModule.share(shareParam, (map) => {
            console.log("share result: " + JSON.stringify(map));
            this.props.navigation.setParams({visibleModal: false})
        }, (map) => {
            console.log(map);
        });
    }
    onSharePress5 = () => {
        const shareOptions = {
            title: "React Native",
            message: "Hola mundo",
            url: "http://facebook.github.io/react-native/",
            subject: "Share Link"
        };
        return Share.open(shareOptions);
    }

    async onSharePress6() {
        Clipboard.setString(this.state.text);
        let str = await Clipboard.getString()
        console.log(str)//我是文本
    }
    //下载文件
    downloadFile(imgURL) {

        let dirs = Platform.OS === 'ios' ? FS.LibraryDirectoryPath : FS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径
        const downloadDest = `${dirs}/${((Math.random() * 1000) | 0)}.jpg`;
        this.newDownloadDest=downloadDest;
        const formUrl = imgURL;

        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },

        };
        try {
            const ret = FS.downloadFile(options);
            ret.promise.then(res => {
                console.log('success', res);
                console.log('file://' + downloadDest)

                this.setState({
                    imgggg:'file://' + downloadDest,
                })

                //ios plist 文件添加 Privacy - Photo Library Usage Description 和 Privacy - Photo Library Additions Usage Description
                var promise = CameraRoll.saveToCameraRoll(downloadDest);//downloadDest可以替换成imgURL(网络图片地址)
                promise.then(result =>{
                    console.log('保存成功！地址如下：\n' + 'file://' + downloadDest);

                }).catch(function(error) {
                    console.log('保存失败！\n' + error);
                });

                resolve(res)
            }).catch(err => {
                console.log('err', err);
            })
        }
        catch (e) {
        }
    }
    requestData = () => {
        this.requestRecommend()
    }

    requestRecommend = async () => {
        try {
            this.setState({refreshState: RefreshState.HeaderRefreshing})

            let info = this.props.navigation.state.params.info
            let response = await fetch(recommendUrlWithId(info.id))
            let json = await response.json()

            console.log(JSON.stringify(json))

            let dataList = json.data.deals.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.imgurl,
                    title: info.brandname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            })

            this.setState({
                data: dataList,
                refreshState: RefreshState.NoMoreData,
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure,
            })
        }
    }

    keyExtractor = (item: Object, index: number) => {
        return item.id
    }

    renderHeader = () => {
        let info = this.props.navigation.state.params.info
        return (
            <View>
                <View>
                    <Image style={styles.banner} source={{uri: info.imageUrl.replace('w.h', '480.0')}} />

                    <View style={styles.topContainer}>
                        <Heading2 style={{color: color.primary}}>￥</Heading2>
                        <Heading1 style={{marginBottom: -8}}>{info.price}</Heading1>
                        <Paragraph style={{marginLeft: 10}}>门市价：￥{(info.price * 1.1).toFixed(0)}</Paragraph>
                        <View style={{flex: 1}} />
                        <Button
                            title='立即抢购'
                            titleStyle={{color: 'white', fontSize: 18}}
                            style={styles.buyButton}
                        />
                    </View>
                </View>

                <Separator />

                <View>
                    <View style={styles.tagContainer}>
                        <Image style={{width: 20, height: 20}} source={require('../../img/home/icon_deal_anytime_refund.png')} />
                        <Paragraph style={{color: '#89B24F'}}>  随时退</Paragraph>
                        <View style={{flex: 1}} />
                        <Paragraph>已售{1234}</Paragraph>
                    </View>

                </View>

                <SpacingView />

                <View style={styles.tipHeader}>
                    <Heading3>看了本团购的用户还看了</Heading3>
                </View>
            </View>
        )
    }

    renderCell = (rowData: any) => {
        return (
            <GroupPurchaseCell
                info={rowData.item}
                onPress={() => this.props.navigation.navigate('GroupPurchase', {info: rowData.item})}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.data}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.requestData}
                />
                <Modal
                    isVisible={this.props.navigation.state.params.visibleModal}
                    onBackdropPress={() =>this.props.navigation.setParams({visibleModal: false})}
                    scrollTo={this.handleScrollTo}
                    style={styles.bottomModal}
                >
                    <View style={styles.scrollableModal}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                    ref={ref => (this.scrollViewRef = ref)}
                                    onScroll={this.handleOnScroll}
                        >
                            <View style={styles.scrollableModalContent1}>
                                <TouchableOpacity onPress={this.onSharePress1}>
                                    <Text style={styles.fontCss}>&#xe600;</Text>
                                    <Text>微信好友</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.scrollableModalContent1}>
                                <TouchableOpacity onPress={this.onSharePress2}>
                                    <Text style={styles.fontCss}>&#xe601;</Text>
                                    <Text>微信朋友圈</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.scrollableModalContent1}>
                                <TouchableOpacity onPress={this.onSharePress3}>
                                    <Text style={styles.fontCss}>&#xe641;</Text>
                                    <Text>QQ好友</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.scrollableModalContent1}>
                                <TouchableOpacity onPress={this.onSharePress4}>
                                    <Text style={styles.fontCss}>&#xe674;</Text>
                                    <Text>QQ空间</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.scrollableModalContent1}>
                                <TouchableOpacity onPress={this.onSharePress5}>
                                    <Text style={styles.fontCss}>&#xe61f;</Text>
                                    <Text>系统分享</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.scrollableModalContent1}>
                                <TouchableOpacity onPress={this.onSharePress6.bind(this)}>
                                    <Text style={styles.fontCss}>&#xe744;</Text>
                                    <Text>复制链接</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={styles.cancelToucha}
                                          onPress={() =>this.props.navigation.setParams({visibleModal: false})}>
                            <Text style={styles.cancelText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.5
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    scrollableModal: {
        height: 200
    },
    scrollableModalContent1: {
        height: 150,
        width: Dimensions.get('window').width / 4,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center"
    },
    fontCss: {
        fontFamily: 'iconfont',
        fontSize: 50
    },
    cancelToucha: {
        backgroundColor: '#f8f8f8',
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    cancelText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})


export default GroupPurchaseScene
