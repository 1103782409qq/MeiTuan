import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    CameraRoll,
    TouchableOpacity,
} from 'react-native';

import FS from 'react-native-fs'

const imgURL = 'https://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png';

type Props = {};

export default class WechatShare extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            progressNum: 0,
            imgggg:'',
        }
    }

    //下载文件
    downloadFile() {

        let dirs = Platform.OS === 'ios' ? FS.LibraryDirectoryPath : FS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径
        const downloadDest = `${dirs}/${((Math.random() * 1000) | 0)}.jpg`;
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
                <Image style={{backgroundColor: 'pink', width: 100, height: 100}}
                       source={{uri: imgURL}}
                />
                <Text style={{width: 100, height: 100, marginTop: 100, backgroundColor: 'cyan'}}
                      onPress={() => {
                          this.downloadFile();
                      }}
                >
                    text
                </Text>
                <Image
                    style={{height: 50, width: 50, marginTop: 10, backgroundColor: 'yellow'}}
                    source={{uri: this.state.imgggg}}
                />

            </View>
        );
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
});