package com.whatsappbot.server;

import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "WhatsAppBot";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "MainActivity created");
        
        // بدء خدمة الخلفية
        startBackgroundService();
    }

    @Override
    public void onResume() {
        super.onResume();
        Log.d(TAG, "App resumed");
    }

    @Override
    public void onPause() {
        super.onPause();
        Log.d(TAG, "App paused");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "App destroyed");
    }

    private void startBackgroundService() {
        // يمكن إضافة منطق لبدء خدمة الخلفية هنا
        Log.d(TAG, "Background service should be started");
    }
}

