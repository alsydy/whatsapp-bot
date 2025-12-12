import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';

class BackgroundService {
  constructor() {
    this.isOnline = true;
    this.setupListeners();
  }

  setupListeners() {
    // مراقبة حالة التطبيق
    App.addListener('appStateChange', (state) => {
      if (state.isActive) {
        console.log('App is now active');
        this.notifyServer('app_active');
      } else {
        console.log('App is now in background');
        this.startBackgroundTask();
      }
    });

    // مراقبة الشبكة
    Network.addListener('networkStatusChange', (status) => {
      const wasOnline = this.isOnline;
      this.isOnline = status.connected;

      if (!wasOnline && this.isOnline) {
        console.log('Network reconnected');
        this.notifyServer('network_reconnected');
      } else if (wasOnline && !this.isOnline) {
        console.log('Network disconnected');
        this.notifyServer('network_disconnected');
      }
    });

    // التحقق من حالة الشبكة عند البدء
    Network.getStatus().then(status => {
      this.isOnline = status.connected;
    });
  }

  async startBackgroundTask() {
    try {
      // ملاحظة: BackgroundTask plugin غير متوفر حالياً
      // سيتم التعامل مع الخلفية من خلال Android Service
      console.log('Background task handling via Android Service');
    } catch (error) {
      console.error('Error starting background task:', error);
    }
  }

  notifyServer(event) {
    // إرسال إشعار للخادم عن التغييرات
    fetch('/api/system-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event })
    }).catch(err => {
      console.error('Error notifying server:', err);
    });
  }
}

export default new BackgroundService();

