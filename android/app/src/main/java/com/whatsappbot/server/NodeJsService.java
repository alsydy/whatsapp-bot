package com.whatsappbot.server;

import android.content.Context;
import android.os.Build;
import android.util.Log;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class NodeJsService {
    private static final String TAG = "NodeJsService";
    private Process nodeProcess;
    private Context context;

    public NodeJsService(Context context) {
        this.context = context;
    }

    public boolean startNodeJs() {
        try {
            // نسخ ملفات Node.js إذا لم تكن موجودة
            if (!copyNodeJsFiles()) {
                Log.e(TAG, "Failed to copy Node.js files");
                return false;
            }

            // نسخ ملفات الخادم
            if (!copyServerFiles()) {
                Log.e(TAG, "Failed to copy server files");
                return false;
            }

            // مسار Node.js binary
            // في nodejs-mobile v0.3.3، libnode.so يعمل كـ node binary
            String arch = Build.SUPPORTED_ABIS[0]; // الحصول على الأركيتكشر الحالي
            String nodePath = context.getFilesDir().getAbsolutePath() + "/nodejs/lib/" + arch + "/libnode.so";
            File nodeFile = new File(nodePath);
            
            // إذا لم يوجد، جرب arm64-v8a (الأكثر شيوعاً)
            if (!nodeFile.exists()) {
                nodePath = context.getFilesDir().getAbsolutePath() + "/nodejs/lib/arm64-v8a/libnode.so";
                nodeFile = new File(nodePath);
            }
            
            // إذا لم يوجد، جرب armeabi-v7a
            if (!nodeFile.exists()) {
                nodePath = context.getFilesDir().getAbsolutePath() + "/nodejs/lib/armeabi-v7a/libnode.so";
                nodeFile = new File(nodePath);
            }
            
            if (!nodeFile.exists()) {
                Log.e(TAG, "Node.js binary (libnode.so) not found at: " + nodePath);
                return false;
            }
            
            Log.d(TAG, "Using Node.js binary: " + nodePath);

            // مسار server.js
            String serverPath = context.getFilesDir().getAbsolutePath() + "/server.js";
            File serverFile = new File(serverPath);
            
            if (!serverFile.exists()) {
                Log.e(TAG, "Server file not found at: " + serverPath);
                return false;
            }

            // تشغيل Node.js
            ProcessBuilder pb = new ProcessBuilder(nodePath, serverPath);
            pb.directory(new File(context.getFilesDir().getAbsolutePath()));
            
            // إعداد متغيرات البيئة
            pb.environment().put("PORT", "3000");
            pb.environment().put("NODE_ENV", "production");
            pb.environment().put("NODE_PATH", context.getFilesDir().getAbsolutePath() + "/nodejs/lib/node_modules");
            
            // توجيه الإخراج
            pb.redirectErrorStream(true);
            
            nodeProcess = pb.start();
            
            // قراءة الإخراج في thread منفصل
            new Thread(() -> {
                try {
                    BufferedReader reader = new BufferedReader(
                        new InputStreamReader(nodeProcess.getInputStream())
                    );
                    String line;
                    while ((line = reader.readLine()) != null) {
                        Log.d(TAG, "Node.js: " + line);
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error reading Node.js output", e);
                }
            }).start();

            // Process.pid() requires API 26+, use toString() for compatibility
            Log.d(TAG, "Node.js started successfully");
            return true;

        } catch (Exception e) {
            Log.e(TAG, "Error starting Node.js", e);
            return false;
        }
    }

    public void stopNodeJs() {
        if (nodeProcess != null) {
            nodeProcess.destroy();
            nodeProcess = null;
            Log.d(TAG, "Node.js stopped");
        }
    }

    private boolean copyNodeJsFiles() {
        try {
            File nodejsDir = new File(context.getFilesDir(), "nodejs");
            if (nodejsDir.exists()) {
                Log.d(TAG, "Node.js files already exist");
                return true;
            }

            nodejsDir.mkdirs();
            
            // نسخ libnode.so من assets
            String[] architectures = {"armeabi-v7a", "arm64-v8a", "x86", "x86_64"};
            boolean copied = false;
            
            for (String arch : architectures) {
                String assetPath = "nodejs/lib/" + arch + "/libnode.so";
                try {
                    InputStream is = context.getAssets().open(assetPath);
                    File libDir = new File(nodejsDir, "lib/" + arch);
                    libDir.mkdirs();
                    FileOutputStream fos = new FileOutputStream(new File(libDir, "libnode.so"));
                    
                    byte[] buffer = new byte[1024];
                    int length;
                    while ((length = is.read(buffer)) > 0) {
                        fos.write(buffer, 0, length);
                    }
                    
                    is.close();
                    fos.close();
                    copied = true;
                    Log.d(TAG, "Copied libnode.so for " + arch);
                } catch (Exception e) {
                    Log.d(TAG, "Could not copy libnode.so for " + arch + ": " + e.getMessage());
                }
            }

            // نسخ node binary
            String nodeBinaryPath = "nodejs/bin/node";
            try {
                InputStream is = context.getAssets().open(nodeBinaryPath);
                File binDir = new File(nodejsDir, "bin");
                binDir.mkdirs();
                File nodeFile = new File(binDir, "node");
                FileOutputStream fos = new FileOutputStream(nodeFile);
                
                byte[] buffer = new byte[1024];
                int length;
                while ((length = is.read(buffer)) > 0) {
                    fos.write(buffer, 0, length);
                }
                
                is.close();
                fos.close();
                
                // جعل الملف قابل للتنفيذ
                nodeFile.setExecutable(true);
                copied = true;
                Log.d(TAG, "Copied node binary");
            } catch (Exception e) {
                Log.e(TAG, "Could not copy node binary", e);
            }

            return copied;

        } catch (Exception e) {
            Log.e(TAG, "Error copying Node.js files", e);
            return false;
        }
    }

    private boolean copyServerFiles() {
        try {
            File filesDir = context.getFilesDir();
            
            // نسخ server.js
            try {
                InputStream is = context.getAssets().open("server.js");
                FileOutputStream fos = new FileOutputStream(new File(filesDir, "server.js"));
                
                byte[] buffer = new byte[1024];
                int length;
                while ((length = is.read(buffer)) > 0) {
                    fos.write(buffer, 0, length);
                }
                
                is.close();
                fos.close();
                Log.d(TAG, "Copied server.js");
            } catch (Exception e) {
                Log.e(TAG, "Could not copy server.js", e);
                return false;
            }

            // نسخ package.json و node_modules (مبسط - في الإنتاج تحتاج نسخ كامل)
            // يمكن نسخ node_modules كاملة أو استخدام bundle

            return true;

        } catch (Exception e) {
            Log.e(TAG, "Error copying server files", e);
            return false;
        }
    }
}

