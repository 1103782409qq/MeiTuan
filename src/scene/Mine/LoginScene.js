/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, TextInput, Text, StyleSheet,TouchableOpacity} from 'react-native'
import IoniconsIcon from "react-native-vector-icons/Ionicons";

export default class LoginScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        header: null,
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    onPressNumArea = () => {
        alert('切换区号')
    }
    getCode = () => {
        this.props.navigation.goBack()
    }
    onChangePhone = (text) => {
        this.setState({text: text})
    }

    render() {
        return (
            <View>
                <IoniconsIcon  style={styles.ionClose} name="ios-add" color="#8B8B90" size={50} onPress={() => {this.props.navigation.goBack()}}/>
                <Text style={styles.welcome}>欢迎登录Meituan</Text>
                <View style={styles.phoneLine}>
                    <Text style={styles.areaText} onPress={this.onPressNumArea}>+86 ></Text>
                    <TextInput underlineColorAndroid='transparent' placeholder={"请输入手机号"}
                               style={styles.numText} onChangeText={(text) => this.onChangePhone(text)}
                               value={this.state.text}/>
                </View>
                <Text style={styles.tip}>未注册的手机号验证后自动创建美团账户</Text>
                <TouchableOpacity style={styles.codeBtn} onPress={this.getCode}>
                    <Text style={styles.codeText}>获取短信验证码</Text>
                </TouchableOpacity>
                <Text style={styles.passLogin}>密码登录</Text>
                <View style={styles.thiredLogin}>
                    <Text style={styles.fontCss}>&#xe600;</Text>
                    <Text style={styles.fontCss}>&#xe641;</Text>
                </View>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    ionClose:{
      marginLeft:'5%'
    },
    welcome: {
        marginLeft: '10%',
        marginTop: 50,
        fontSize: 30,
        fontWeight: 'bold'
    },
    phoneLine: {
        marginTop: 50,
        marginLeft: '10%',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1
    },
    areaText: {
        width: '30%',
    },
    numText: {
        width: '70%',
    },
    tip:{
        marginTop:10,
        marginBottom:30,
        color:'#bbb',
        marginLeft: '10%',
    },
    codeBtn:{
        marginLeft: '10%',
        width:'80%',
        height:50,
        backgroundColor:'#9cf5f0',
        borderRadius:50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeText:{
        color:'#fff',
        fontSize: 20,
    },
    passLogin:{
        marginLeft: '10%',
        marginTop:30
    },
    thiredLogin:{
        marginTop:50,
        marginLeft:'20%',
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fontCss: {
        fontFamily: 'iconfont',
        fontSize: 50
    },
})


