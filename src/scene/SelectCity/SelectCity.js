'use strict';
import React, {Component,Navigator} from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    NativeAppEventEmitter,
    ActivityIndicator,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
} from 'react-native';

import Header from './Header';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

import CityList from './IndexListView';

// 下面是数据部分
import DATA_JSON from './city-list.json';
import HomeScene from "../Home/HomeScene";
const NOW_CITY_LIST = [
    {
        "name": "阿里",
        "spellName": "alidi",
        "id": 6134,
        "fullname": "西藏/阿里",
        "sortLetters": "a"
    }
];
const ALL_CITY_LIST = DATA_JSON.allCityList;
const HOT_CITY_LIST = DATA_JSON.hotCityList;
const LAST_VISIT_CITY_LIST = DATA_JSON.lastVisitCityList;

import AMapLocation from 'react-native-smart-amap-location'
import Button from 'react-native-smart-button'
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance'
class SimpleSelectCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchResult: false,
            keyword: '',
            searchResultList: [],
            allCityList: ALL_CITY_LIST,
            hotCityList: HOT_CITY_LIST,
            lastVisitCityList: LAST_VISIT_CITY_LIST,
            nowCityList: NOW_CITY_LIST
        };
    }
    componentDidMount() {
        let viewAppearCallBack = (event) => {
            AMapLocation.init(null) //使用默认定位配置
        }
        this.addAppEventListener(
            this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack),
            NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult)
        )
    }

    componentWillUnmount () {
        //停止并销毁定位服务
        AMapLocation.cleanUp()
    }

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: '选择城市',
        headerStyle: {backgroundColor: 'white'},
    })

    onChanegeTextKeyword(newVal) {
        // alert(newVal);
        if (newVal === '') {
            this.setState({showSearchResult: false});
        } else {
            // 在这里过滤数据结果
            let dataList = this.filterCityData(newVal);

            this.setState({keyword:newVal, showSearchResult: true, searchResultList: dataList});
        }
    }

    filterCityData(text) {
        console.log('search for list', text);

        let rst = [];
        for (let idx = 0; idx < ALL_CITY_LIST.length; idx++) {
            let item = ALL_CITY_LIST[idx];
            if (item.name.indexOf(text) === 0 || item.spellName.indexOf(text) === 0) {
                rst.push(item);
            }
        }
        return rst;
    }

    onSelectCity(cityJson) {
        if (this.state.showSearchResult) {
            this.setState({showSearchResult: false, keyword:''});
        }

        // alert('你选择了城市====》' + cityJson.id + '#####' + cityJson.name);
        this.props.navigation.navigate('Home', {name: cityJson.name})

    }
    _onLocationResult = (result) => {
        if(result.error) {
            Alert.alert(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`)
        }
        else {
            if(result.formattedAddress) {
                Alert.alert(`格式化地址 = ${result.formattedAddress}`)
            }
            else {
                Alert.alert(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`)
            }
        }
        if(this._button_1.state.loading) {
            this._button_1.setState({
                loading: false,
            })
        }
        if(this._button_2.state.loading) {
            this._button_2.setState({
                loading: false,
            })
        }
    }

    //单次定位并返回逆地理编码信息
    _showReGeocode = () => {
        this._button_1.setState({
            loading: true,
        })
        AMapLocation.getReGeocode()
    }

    //单次定位并返回地理编码信息
    _showLocation = () => {
        this._button_2.setState({
            loading: true,
        })
        AMapLocation.getLocation()
    }

    _renderActivityIndicator() {
        return ActivityIndicator ? (
            <ActivityIndicator
                style={{margin: 10,}}
                animating={true}
                color={'#fff'}
                size={'small'}/>
        ) : Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{margin: 10,}}
                    color={'#fff'}
                    styleAttr={'Small'}/>

            ) :  (
                <ActivityIndicatorIOS
                    style={{margin: 10,}}
                    animating={true}
                    color={'#fff'}
                    size={'small'}/>
            )
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Button
                    ref={ component => this._button_1 = component }
                    touchableType={Button.constants.touchableTypes.fade}
                    style={{margin: 10, width: 300, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                    loadingComponent={
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {this._renderActivityIndicator()}
                            <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold', fontFamily: '.HelveticaNeueInterface-MediumP4',}}>努力定位中</Text>
                        </View>
                    }
                    onPress={this._showReGeocode}>
                    定位逆地理编码信息
                </Button>
                <Button
                    ref={ component => this._button_2 = component }
                    touchableType={Button.constants.touchableTypes.fade}
                    style={{margin: 10, width: 300, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                    loadingComponent={
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {this._renderActivityIndicator()}
                            <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold', fontFamily: '.HelveticaNeueInterface-MediumP4',}}>努力定位中</Text>
                        </View>
                    }
                    onPress={this._showLocation}>
                    定位地理编码信息
                </Button>
            </View>

        )
    }
}
{/*<View style={styles.container}>*/}
    {/*<SearchBox*/}
        {/*keyword={this.state.keyword}*/}
        {/*onChanegeTextKeyword={(vv) => {*/}
            {/*this.onChanegeTextKeyword(vv)*/}
        {/*}}/>{this.state.showSearchResult*/}
    {/*? (<SearchResult*/}
        {/*keyword={this.state.keyword}*/}
        {/*onSelectCity={this.onSelectCity.bind(this)}*/}
        {/*searchResultList={this.state.searchResultList}/>)*/}
    {/*: (*/}
        {/*<View style={{flex:1}}>*/}
            {/*<CityList*/}
                {/*onSelectCity={this.onSelectCity.bind(this)}*/}
                {/*allCityList={this.state.allCityList}*/}
                {/*hotCityList={this.state.hotCityList}*/}
                {/*lastVisitCityList={this.state.lastVisitCityList}*/}
                {/*nowCityList={this.state.nowCityList}/>*/}
        {/*</View>*/}
    {/*)}*/}

{/*</View>*/}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    },
    currentCity: {
        backgroundColor: '#ffffff',
        height: 20,
        margin: 5
    },
    currentCityText: {
        fontSize: 16
    }
});
export default AppEventListenerEnhance(SimpleSelectCity)