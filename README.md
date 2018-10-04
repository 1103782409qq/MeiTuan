# MeiTuan App Write In latest React-Native(0.50.1)

## 视频教程aaa
**现已推出全套视频教程，从创建工程讲起，一行一行编写代码，直至完成整个项目。**

[腾讯课堂](https://ke.qq.com/course/275239?flowToken=1000390)

[网易课堂](http://study.163.com/course/courseMain.htm?courseId=1004961020&utm_campaign=commission&utm_source=cp-400000000380005&utm_medium=share)


简书：http://www.jianshu.com/p/9211f42d5c25

##  screen shot for iOS

<img src="https://github.com/huanxsd/MeiTuan/blob/master/screenshot/iOS_0.png">

<img src="https://github.com/huanxsd/MeiTuan/blob/master/screenshot/iOS_1.png">

<img src="https://github.com/huanxsd/MeiTuan/blob/master/screenshot/iOS_2.png">

## screen shot for Android

<img src="https://github.com/huanxsd/MeiTuan/blob/master/screenshot/Android_0.png">

<img src="https://github.com/huanxsd/MeiTuan/blob/master/screenshot/Android_1.png">

<img src="https://github.com/huanxsd/MeiTuan/blob/master/screenshot/Android_2.png">

## Setup

1. **Clone the repo**

```
$ git clone https://github.com/huanxsd/MeiTuan.git
$ cd MeiTuan
```

2. **Install dependencies** (npm v3+):

```
$ npm install
```


3. **Running on iOS:**

```
$ react-native run-ios
```

## Troubleshooting

> Could not connect to development server

In a separate terminal window run:

```
$ react-native start
```

## Dependency

* [react-navigation](https://github.com/react-community/react-navigation)
* [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)

## Contact

If you have any suggestions, leave a message here
[简书](http://www.jianshu.com/p/9211f42d5c25)

## At last

If you like this project, please give me a star  :)


# 高仿美团客户端 React-Native版(0.50.1)

## 简介

这是一个用React-Native写的美团客户端。

使用了React-Native 0.44.0版本。遵循ES6语法。

主要实现了美团的四个一级页面（团购、附近、订单、我的），以及部分二级页面（团购详情、Web页面）。

所有功能都是用JavaScript写的，iOS和Android的代码复用率达到了97%（别问我这个数字怎么来的，我瞎掰的）。

这个Demo的静态类型检查工具使用了Facebook的Flow。它让我写JavaScript的时候，更有安全感。个人觉得可以用两个字形容这个工具，那就是：灰常牛逼！

我试着让这个Demo的结构尽量接近实际项目，同时使用比较简单方式去实现功能。这样可以让刚接触ReactNative的人（比如我自己...）更够容易理解代码。

该项目没有使用Redux。因为个人觉得目前大部分的中小型App并不需要Redux。如果盲目的将Redux添加到项目中，并不能带来太多的益处。

鲁迅曾说过：
> "如果你不知道是否需要 Redux，那就是不需要它。"

Redux的作者 Dan Abramov 说过：
> "只有遇到 React 实在解决不了的问题，你才需要 Redux 。"

哦，另外一个没有用Redux的原因，是我还不太会用。

App的页面跳转、TabBar、Navigation，全部通过[react-navigation](https://github.com/react-community/react-navigation)实现。这是一个非常牛逼的库，可以实现很多自定义的跳转功能。最早是通过[react-native-router-flux](https://github.com/aksonov/react-native-router-flux)实现跳转。在遇见react-navigation后，我果断放弃了react-native-router-flux。

App中很多页面都使用了同一个网络接口，这不是为了让代码更加简洁，仅仅是我偷懒 >.<

## 第三方依赖

* [react-navigation](https://github.com/react-community/react-navigation)
* [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)

## 安装

1. **Clone the repo**

```
$ git clone https://github.com/huanxsd/MeiTuan.git
$ cd MeiTuan
```

2. **Install dependencies** (npm v3+)

```
$ npm install
```

3. **Running on iOS**

```
$ react-native run-ios
```

## 常见问题

> Could not connect to development server

打开新的terminal窗口，并执行:

```
$ react-native start
```

## 瞎扯蛋

我之前一直在写Objective-C，但不久前看了ES6的语法和Flex布局方式后，我便马上爱上了这种开发方式。

这个Demo花了大概5天时间，是我的第一个ReactNative项目。

如果对这个Demo有任何的意见或建议，或者喜欢ReactNative的朋友，欢迎在下方留言。我会在第一时间回复 :)

另外，不要问我为什么英文说明那么点，中文说明这么多。怪英语老师咯

## 最后

如果你喜欢这个Demo，请给我一个star   :)

Github：https://github.com/huanxsd/MeiTuan

我将持续更新这个Demo

如果对这个Demo有任何疑问，欢迎加入我们的大家庭

![ReactNative开发者群二维码.png](http://upload-images.jianshu.io/upload_images/5685774-957c90b45c8f8912.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
——————————————————————————————————————————————我的代码分析-----——————————————————————

1.StackNavigator是配置所有导航的，TabNavigator是配置tab的
2.路由导航方法 <Button title="Go to Details" onPress={() => this.props.navigation.navigate('Details')} />
3.每次调用 ` push ` 时, 我们会向导航堆栈中添加新路由。 当你调用 ` navigate ` 时, 它首先尝试查找具有该名称的现有路由, 并且只有在堆栈上没有一个新路由时才会推送该路由。<br>
  如果当前页面可以执行返回操作，则 stack navigator 会自动提供一个包含返回按钮的标题栏（如果导航堆栈中只有一个页面，则没有任何可返回的内容，因此也不存在返回键）。
  有时候你希望能够以编程的方式触发此行为，可以使用` this.props.navigation.goBack() `。<br>
  每次调用 ` push ` 时, 我们会向导航堆栈中添加新路由。 当你调用 ` navigate ` 时, 它首先尝试查找具有该名称的现有路由, 并且只有在堆栈上没有一个新路由时才会推送该路由。<br>

  另一个常见需求是能够跨越*多个*页面返回 - 例如，如果你处在堆栈深处，上面有多个页面，此时你想要将上面所有的页面都销毁，并返回第一个页面。 在这种情况下，我们知道我们要回到` Home `，
  所以我们可以使用` navigate('Home') `（而不是` push `！ 尝试一下，看看有什么不同）。 另一个选择是` navigation.popToTop() `，它可以返回到堆栈中的第一个页面。<br>
4.传递参数给路由  <Button title="Go to Details" => { this.props.navigation.navigate('Details', {itemId: 86,otherParam: 'anything you want here',});}}/>  <br>
5.navigationOptions配置包括配置tab的底部，和header头部，可以设置
  Home: {
            screen: HomeScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '团购',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_homepage.png')}
                        selectedImage={require('./img/tabbar/tabbar_homepage_selected.png')}
                    />
                )
            }),
        } <br>
          static navigationOptions = ({navigation}: any) => ({
                headerTitle: (
                    <TouchableOpacity style={styles.searchBar}>
                        <Image source={require('../../img/home/search_icon.png')} style={styles.searchIcon} />
                        <Paragraph>一点点
                        </Paragraph>
                    </TouchableOpacity>
                ),
                headerRight: (
                    <NavigationItem
                        icon={require('../../img/mine/icon_navigation_item_message_white.png')}
                        onPress={() => {

                        }}
                    />
                ),
                headerLeft: (
                    <NavigationItem
                        title='福州'
                        titleStyle={{color: 'white'}}
                        onPress={() => {

                        }}
                    />
                ),
                headerStyle: {backgroundColor: color.primary},
            }) <br>
6.ScrollView内容少的时候选择，可以做横向的幻灯片，数据多时用FlatList还可以方便地渲染行间分隔线，支持多列布局，无限滚动加载等等。<br>
7.通过  this.setState({
                    dataList: dataList,
                    refreshing: false,
                })设置某个变量的值<br>
8.添加选择地区页面https://gitee.com/react9527/react-native-select-city，添加字体图标react-native-vector-icons和react-native-easy-toast。https://www.cnblogs.com/evai/p/5804751.html<br>
9.'猜你喜欢'页面是一个页面，嵌入的http链接<br>
10.ios添加自定义的图标和splash。生成图片教程：https://apetools.webprofusion.com/ 。修改教程https://www.cnblogs.com/lidongxu/p/5114355.html。<br>
11.选择地区后，返回到首页，改变地区名字，为了做下拉菜单，引入antd-mobile。https://blog.csdn.net/sinat_17775997/article/details/68936093
但是之后antd更新，造成上面运行不了，所以pakage.json中版本要改"antd-mobile": "2.0.0"
12.Could not determine java version from '10.0.1'.修改distributionUrl=https\://services.gradle.org/distributions/gradle-2.4-all.zip，用android studio安装gradle更新就可以了<br>
13.android修改图标在android\app\src\main\res\mipmap-xxx中直接覆盖图标；splash教程。https://blog.csdn.net/huxinguang_ios/article/details/79892440
14.真机调试，电脑再也不用运行模拟器了，速度快的很！这下和开发普通非原生app网页差不多了。https://reactnative.cn/docs/0.44/running-on-device-ios/<br>
15.扫条码https://www.jianshu.com/p/2cef1baf9a6f<br>
16.高德地图 android的key:3296a2d937e276afdbcc7478aba6caa6。网址。添加插件后，执行link。然后react-native run-android，才能生效。https://github.com/qiuxiang/react-native-amap-geolocation<br>
17."react-native-popover": "github:jeanregisser/react-native-popover#8a443d2699b404d55c324edc8536255150340789",popover中修改import PropTypes from 'prop-types';import createReactClass from 'create-react-class';直接拷贝github的readme中的代码即可<br>
18.在constructor中this.handleMenuPress = this.handleMenuPress.bind(this)可以解决React-Native Undefined is not an object (evaluating 'this.refs.['DRAWER'])<br>
19.react-native-popover-menu。link之后，run-android