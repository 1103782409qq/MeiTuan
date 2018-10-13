
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import CheckBox from 'react-native-check-box'


export default class CustomKeyPage extends Component {
    constructor(props){
        super(props);
        this.state={
            checked:false
        }
    }
    onClick(){
        this.setState({
            checked:!this.state.checked
        })
    }
 render(){
        return <View style={styles.container}>
            <CheckBox
                style={styles.checkBoxStyle}
                onClick={()=>this.onClick()}
                leftText='aa'
                isChecked={this.state.checked}
                unCheckedImage={<Image
                    source={require('../../img/mine/ic_check_box_outline_blank.png')}/>}
                checkedImage={<Image
                    source={require('../../img/mine/ic_check_box.png')}/>}
            />

        </View>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    tips:{
        fontSize:29
    },

    title:{
        fontSize:20,
        color:'white'
    },
    line:{
        height:0.3,
        backgroundColor:'darkgray'
    },
    item:{
        flexDirection:'row',
        alignItems:'center'
    },

    checkBoxStyle:{
        flex:1,
        padding:10,

    },
});