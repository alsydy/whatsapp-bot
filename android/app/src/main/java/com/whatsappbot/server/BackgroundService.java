package com.whatsappbot.server;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

public class BackgroundService extends Service {
    private static final String TAG = "BackgroundService";
    private static final String CHANNEL_ID = "whatsapp_bot_service";
    private static final int NOTIFICATION_ID = 1;
    private Process serverProcess;
    private NodeJsService nodeJsService;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "BackgroundService created");
        createNotificationChannel();
        startForeground(NOTIFICATION_ID, createNotification());
        
        // استخدام NodeJsService لتشغيل Node.js المضمن
        nodeJsService = new NodeJsService(this);
        if (!nodeJsService.startNodeJs()) {
            Log.e(TAG, "Failed to start embedded Node.js, trying fallback methods...");
            startServer(); // Fallback للطرق الأخرى
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "Service started");
        return START_STICKY; // إعادة التشغيل التلقائي
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "Service destroyed");
        if (nodeJsService != null) {
            nodeJsService.stopNodeJs();
        }
        stopServer();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "WhatsApp Bot Service",
                NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("خدمة خادم واتساب بوت");
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private Notification createNotification() {
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent, 
            PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT
        );

        Notification.Builder builder = new Notification.Builder(this, CHANNEL_ID)
            .setContentTitle("واتساب بوت خادم")
            .setContentText("الخادم يعمل في الخلفية")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentIntent(pendingIntent)
            .setOngoing(true);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder.setChannelId(CHANNEL_ID);
        }

        return builder.build();
    }

    private void startServer() {
        try {
            Log.d(TAG, "Attempting to start Node.js server...");
            
            // محاولة 1: استخدام Node.js من Termux (إذا كان مثبتاً)
            String termuxNodePath = "/data/data/com.termux/files/usr/bin/node";
            String serverPath = getApplicationInfo().dataDir + "/files/server.js";
            
            // التحقق من وجود Termux Node.js
            java.io.File termuxNode = new java.io.File(termuxNodePath);
            if (termuxNode.exists()) {
                Log.d(TAG, "Found Termux Node.js, using it...");
                startServerWithNode(termuxNodePath, serverPath);
                return;
            }
            
            // محاولة 2: استخدام Node.js من nodejs-mobile (إذا كان مضمن)
            String nodejsMobilePath = getApplicationInfo().nativeLibraryDir + "/libnode.so";
            java.io.File nodejsMobile = new java.io.File(nodejsMobilePath);
            if (nodejsMobile.exists()) {
                Log.d(TAG, "Found nodejs-mobile, using it...");
                startServerWithNode(nodejsMobilePath, serverPath);
                return;
            }
            
            // محاولة 3: البحث عن node في PATH
            try {
                ProcessBuilder pb = new ProcessBuilder("which", "node");
                Process proc = pb.start();
                java.io.BufferedReader reader = new java.io.BufferedReader(
                    new java.io.InputStreamReader(proc.getInputStream())
                );
                String nodePath = reader.readLine();
                if (nodePath != null && !nodePath.isEmpty()) {
                    Log.d(TAG, "Found Node.js in PATH: " + nodePath);
                    startServerWithNode(nodePath, serverPath);
                    return;
                }
            } catch (Exception e) {
                Log.d(TAG, "Could not find node in PATH");
            }
            
            // إذا لم يتم العثور على Node.js
            Log.e(TAG, "Node.js not found! Please install Termux and Node.js");
            showNodeJsNotFoundNotification();
            
        } catch (Exception e) {
            Log.e(TAG, "Error starting server", e);
        }
    }
    
    private void startServerWithNode(String nodePath, String serverPath) {
        try {
            java.io.File serverFile = new java.io.File(serverPath);
            if (!serverFile.exists()) {
                Log.e(TAG, "Server file not found: " + serverPath);
                copyServerFiles();
            }
            
            String workingDir = getApplicationInfo().dataDir + "/files";
            ProcessBuilder pb = new ProcessBuilder(nodePath, serverPath);
            pb.directory(new java.io.File(workingDir));
            pb.environment().put("PORT", "3000");
            pb.environment().put("NODE_ENV", "production");
            
            serverProcess = pb.start();
            // Process.pid() requires API 26+, use toString() for compatibility
            Log.d(TAG, "Server started successfully");
            
        } catch (Exception e) {
            Log.e(TAG, "Error starting server with Node.js", e);
        }
    }
    
    private void copyServerFiles() {
        try {
            java.io.File filesDir = new java.io.File(getApplicationInfo().dataDir + "/files");
            if (!filesDir.exists()) {
                filesDir.mkdirs();
            }
            
            // نسخ server.js من assets
            android.content.res.AssetManager assetManager = getAssets();
            java.io.InputStream is = assetManager.open("server.js");
            java.io.FileOutputStream fos = new java.io.FileOutputStream(
                new java.io.File(filesDir, "server.js")
            );
            
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) > 0) {
                fos.write(buffer, 0, length);
            }
            
            is.close();
            fos.close();
            Log.d(TAG, "Server files copied successfully");
            
        } catch (Exception e) {
            Log.e(TAG, "Error copying server files", e);
        }
    }
    
    private void showNodeJsNotFoundNotification() {
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID + "_error",
                "Error Channel",
                NotificationManager.IMPORTANCE_HIGH
            );
            manager.createNotificationChannel(channel);
            
            Notification notification = new Notification.Builder(this, CHANNEL_ID + "_error")
                .setContentTitle("Node.js غير موجود")
                .setContentText("يرجى تثبيت Termux و Node.js")
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .setAutoCancel(true)
                .build();
            
            manager.notify(999, notification);
        }
    }

    private void stopServer() {
        if (serverProcess != null) {
            serverProcess.destroy();
            serverProcess = null;
            Log.d(TAG, "Server process stopped");
        }
    }
}

