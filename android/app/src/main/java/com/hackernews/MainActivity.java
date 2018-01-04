package com.hackernews;

import android.graphics.Color;
import android.widget.LinearLayout;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    @Override public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);

        view.setBackgroundColor(Color.parseColor("#FB651E"));

        return view;
    }
}
