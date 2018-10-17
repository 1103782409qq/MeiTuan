import React, {Component} from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Clipboard
} from "react-native";
import {Dimensions} from 'react-native'

import Modal from "react-native-modal";
import JShareModule from 'jshare-react-native';
import Share from 'react-native-share';

export default class WechatShare extends Component {
    state = {
        visibleModal: null,
        text:'我是文本'
    };

    constructor(props) {
        super(props);
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
            // type: "image",
            // imagePath: "/storage/emulated/0/DCIM/Camera/IMG20170707202330.jpg"
            type: "link",
            url: "https://jiguang.cn",
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
            // type: "image",
            // imagePath: "/storage/emulated/0/DCIM/Camera/IMG20170707202330.jpg"
            type: "link",
            url: "https://jiguang.cn",
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
    onSharePress3 = () => {
        var shareParam = {
            platform: "qq",
            // type: "image",
            // imagePath: "/storage/emulated/0/DCIM/Camera/IMG20170707202330.jpg"
            type: "link",
            url: "https://jiguang.cn",
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
    onSharePress4 = () => {
        var shareParam = {
            title: 'qzone share',
            platform: "qzone",
            // type: "image",
            // imagePath: "/storage/emulated/0/DCIM/Camera/IMG20170707202330.jpg"
            type: "link",
            url: "https://jiguang.cn",
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

    render() {
        return (
            <View style={styles.container}>

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