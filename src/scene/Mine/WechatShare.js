import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from "react-native";
import {Dimensions} from 'react-native'

import Modal from "react-native-modal";

export default class WechatShare extends Component {
    state = {
        visibleModal: null
    };

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

    render() {
        return (
            <View style={styles.container}>

                {this.renderButton("Scrollable modal", () =>
                    this.setState({ visibleModal: 8 })
                )}

                <Modal
                    isVisible={this.state.visibleModal === 8}
                    onBackdropPress={() => this.setState({ visibleModal: null })}
                    scrollTo={this.handleScrollTo}
                    style={styles.bottomModal}
                >
                    <View style={styles.scrollableModal}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={ false }
                            ref={ref => (this.scrollViewRef = ref)}
                            onScroll={this.handleOnScroll}
                        >
                            <View style={styles.scrollableModalContent1}>
                                <Text style={styles.fontCss}>&#xe600;</Text>
                                <Text>微信好友</Text>
                            </View>
                            <View style={styles.scrollableModalContent1}>
                                <Text style={styles.fontCss}>&#xe601;</Text>
                                <Text>微信朋友圈</Text>
                            </View>
                            <View style={styles.scrollableModalContent1}>
                                <Text style={styles.fontCss}>&#xe641;</Text>
                                <Text>QQ好友</Text>
                            </View>
                            <View style={styles.scrollableModalContent1}>
                                <Text style={styles.fontCss}>&#xe674;</Text>
                                <Text>QQ空间</Text>
                            </View>

                            <View style={styles.scrollableModalContent1}>
                                <Text style={styles.fontCss}>&#xe61f;</Text>
                                <Text>系统分享</Text>
                            </View>
                            <View style={styles.scrollableModalContent1}>
                                <Text style={styles.fontCss}>&#xe744;</Text>
                                <Text>复制链接</Text>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={styles.cancelToucha} onPress={() => this.setState({ visibleModal: null })}>
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
        width:Dimensions.get('window').width/4,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center"
    },
    fontCss:{
        fontFamily:'iconfont',
        fontSize:50
    },
    cancelToucha:{
        backgroundColor:'#f8f8f8',
        height:50,
        alignItems: "center",
        justifyContent: "center"
    },
    cancelText:{
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    }

});