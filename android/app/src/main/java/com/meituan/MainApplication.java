package com.meituan;

import android.app.Application;
import com.theweflex.react.WeChatPackage;
import cl.json.ShareApplication;
import com.facebook.react.ReactApplication;
import cl.json.RNSharePackage;
import cn.jiguang.share.android.api.JShareInterface;
import cn.jiguang.share.reactnative.JSharePackage;
import cn.qiuxiang.react.amap3d.AMap3DPackage;
import ui.popovermenu.RNPopoverMenuPackage;
import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.mehcode.reactnative.splashscreen.SplashScreenPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import cn.jpush.reactnativejpush.JPushPackage;
public class MainApplication extends Application implements ReactApplication,ShareApplication {
   // 设置为true将不弹出toast
    private boolean SHUTDOWN_TOAST = false;
    // 设置为true将不打印log
    private boolean SHUTDOWN_LOG = false;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSharePackage(),
            new JSharePackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new AMap3DPackage(),
            new RNPopoverMenuPackage(),
            new AMapGeolocationPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new SplashScreenPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new WeChatPackage()  // Add this line
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    JShareInterface.init(this);
  }
  @Override
  public String getFileProviderAuthority() {
    return "com.meituan.fileprovider";
  }

}
