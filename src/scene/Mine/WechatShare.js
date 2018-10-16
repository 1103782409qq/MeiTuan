import React from 'react';
import ReactNative from 'react-native';
import JShareModule from 'jshare-react-native';

const {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
} = ReactNative;



export default class WechatShare extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        JShareModule.setDebug({ enable: true })
    }

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
        }, (map) => {
            alert(map)
            console.log( map);
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
        }, (map) => {
            alert(map)
            console.log( map);
        });
    }
    onSharePress3 = () => {
        var shareParam = {
            platform: "wechat_favourite",
            // type: "image",
            // imagePath: "/storage/emulated/0/DCIM/Camera/IMG20170707202330.jpg"
            type: "link",
            url: "https://jiguang.cn",
            text: "JShare test text2",
        };
        JShareModule.share(shareParam, (map) => {
            alert(map)
            console.log("share result: " + JSON.stringify(map));
        }, (map) => {
            alert(map)
            console.log( map);
        });
    }
    onSharePress4 = () => {
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
        }, (map) => {
            alert(map)
            console.log( map);
        });
    }
    onSharePress5 = () => {
        var shareParam = {
            title:'qzone share',
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
        }, (map) => {
            alert(map)
            console.log( map);
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text
                    style={styles.welcome}>
                    Welcome !
                </Text>
                <TouchableHighlight
                    underlayColor="#e4083f"
                    activeOpacity={0.5}
                    style={styles.btnStyle}
                    onPress={this.onSharePress1}>
                    <Text style={styles.btnTextStyle}>
                        Share wechat_session
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="#e4083f"
                    activeOpacity={0.5}
                    style={styles.btnStyle}
                    onPress={this.onSharePress2}>
                    <Text style={styles.btnTextStyle}>
                        Share wechat_timeLine
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="#e4083f"
                    activeOpacity={0.5}
                    style={styles.btnStyle}
                    onPress={this.onSharePress3}>
                    <Text style={styles.btnTextStyle}>
                        Share wechat_favourite
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="#e4083f"
                    activeOpacity={0.5}
                    style={styles.btnStyle}
                    onPress={this.onSharePress4}>
                    <Text style={styles.btnTextStyle}>
                        Share qq
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="#e4083f"
                    activeOpacity={0.5}
                    style={styles.btnStyle}
                    onPress={this.onSharePress5}>
                    <Text style={styles.btnTextStyle}>
                        Share qzone
                    </Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    welcome: {
        textAlign: 'center',
        margin: 10,
    },
    btnStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnTextStyle: {
        textAlign: 'center',
        fontSize: 25,
        color: '#ffffff'
    },
});