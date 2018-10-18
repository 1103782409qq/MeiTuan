import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    CameraRoll,
    TouchableOpacity,
    ScrollView,
    Button,
    Clipboard
} from 'react-native';

import FS from 'react-native-fs'

import {Dimensions} from 'react-native'

import Modal from "react-native-modal";
import JShareModule from 'jshare-react-native';
import Share from 'react-native-share';
const imgURL = 'https://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png';

type Props = {};

export default class WechatShare extends Component<Props> {
    state = {
        visibleModal: null,
        text:'我是文本'
    };
    constructor(props) {
        super(props);
        this.state = {
            progressNum: 0,
            imgggg:'',
            newDownloadDest:''
        }
    }
    componentDidMount() {
        JShareModule.setDebug({enable: true})
    }

    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );


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
            alert(map)
            console.log("share result: " + JSON.stringify(map));
            this.setState({visibleModal: null})
        }, (map) => {
            alert(map)
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
            alert(map)
            console.log("share result: " + JSON.stringify(map));
            this.setState({visibleModal: null})
        }, (map) => {
            alert(map)
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
            alert(map)
            console.log("share result: " + JSON.stringify(map));
            this.setState({visibleModal: null})
        }, (map) => {
            alert(map)
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
            alert(map)
            console.log("share result: " + JSON.stringify(map));
            this.setState({visibleModal: null})
        }, (map) => {
            alert(map)
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
                    alert('保存成功！地址如下：\n' + 'file://' + downloadDest);

                }).catch(function(error) {
                    console.log('error', error);
                    alert('保存失败！\n' + error);
                });

                resolve(res)
            }).catch(err => {
                console.log('err', err);
            })
        }
        catch (e) {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{width: 100, height: 100, marginTop: 100, backgroundColor: 'cyan'}}
                      onPress={() => {
                          this.downloadFile(imgURL);
                      }}
                >
                    text
                </Text>
                <Image
                    style={{height: 50, width: 50, marginTop: 10, backgroundColor: 'yellow'}}
                    source={{uri: this.state.imgggg}}
                />
                {this.renderButton("Scrollable modal", () =>
                    this.setState({visibleModal: 8})
                )}

                <Modal
                    isVisible={this.state.visibleModal === 8}
                    onBackdropPress={() => this.setState({visibleModal: null})}
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
                                          onPress={() => this.setState({visibleModal: null})}>
                            <Text style={styles.cancelText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
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

});