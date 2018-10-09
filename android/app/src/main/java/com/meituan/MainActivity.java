package com.meituan;

import android.graphics.Color;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;          //**********需要添加的************
import com.facebook.react.bridge.ReactContext;           //**********需要添加的************
import com.mehcode.reactnative.splashscreen.SplashScreen;//**********需要添加的************
import cn.jpush.android.api.JPushInterface;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
public class MainActivity extends ReactActivity implements DefaultHardwareBackBtnHandler {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
     protected void onCreate(Bundle savedInstanceState) {
          // Show the js-controlled splash screen
          SplashScreen.show(this, getReactInstanceManager());  //**********需要添加的************

          super.onCreate(savedInstanceState);
            JPushInterface.init(this);
          // [...]
      }
        @Override
          protected void onPause() {
              super.onPause();
              JPushInterface.onPause(this);
          }

          @Override
          protected void onResume() {
              super.onResume();
              JPushInterface.onResume(this);
          }

          @Override
          protected void onDestroy() {
              super.onDestroy();
          }
    protected String getMainComponentName() {
        return "MeiTuan";
    }
}
