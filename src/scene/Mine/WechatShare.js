import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
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
                        <ScrollView horizontal={true}
                            ref={ref => (this.scrollViewRef = ref)}
                            onScroll={this.handleOnScroll}
                        >
                            <View style={styles.scrollableModalContent1}>
                                <Text>Scroll me up</Text>
                            </View>
                            <View style={styles.scrollableModalContent2}>
                                <Text>Scroll me up2</Text>
                            </View>
                        </ScrollView>
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
        height: 200,
        width:300,
        backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "center"
    },
    scrollableModalContent2: {
        height: 200,
        width:300,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center"
    }
});