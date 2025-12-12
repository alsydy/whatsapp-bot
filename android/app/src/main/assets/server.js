import express from 'express';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// إدارة الجلسات المتعددة
const sessions = new Map();
const sessionsConfigPath = join(__dirname, 'sessions.json');

// تحميل الجلسات المحفوظة
function loadSessions() {
  try {
    if (existsSync(sessionsConfigPath)) {
      const data = readFileSync(sessionsConfigPath, 'utf-8');
      const savedSessions = JSON.parse(data);
      savedSessions.forEach(session => {
        sessions.set(session.id, {
          ...session,
          client: null,
          ready: false,
          qrCode: null,
          lastActivity: new Date().toISOString()
        });
      });
      console.log(`✅ Loaded ${sessions.size} saved sessions`);
    }
  } catch (error) {
    console.error('Error loading sessions:', error);
  }
}

// حفظ الجلسات
function saveSessions() {
  try {
    const sessionsToSave = Array.from(sessions.values()).map(session => ({
      id: session.id,
      name: session.name,
      dataPath: session.dataPath,
      createdAt: session.createdAt
    }));
    writeFileSync(sessionsConfigPath, JSON.stringify(sessionsToSave, null, 2));
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

// تهيئة مجلد الجلسات
const sessionsDir = join(__dirname, '.sessions');
if (!existsSync(sessionsDir)) {
  mkdirSync(sessionsDir, { recursive: true });
}

// تحميل الجلسات عند البدء
loadSessions();

// API: الحصول على جميع الجلسات
app.get('/api/sessions', (req, res) => {
  const sessionsList = Array.from(sessions.values()).map(session => ({
    id: session.id,
    name: session.name,
    ready: session.ready,
    status: session.ready ? 'connected' : (session.qrCode ? 'waiting_qr' : 'disconnected'),
    createdAt: session.createdAt,
    lastActivity: session.lastActivity
  }));
  res.json({ sessions: sessionsList });
});

// API: إنشاء جلسة جديدة
app.post('/api/sessions', (req, res) => {
  const { name } = req.body;
  const sessionId = uuidv4();
  const sessionName = name || `Session ${sessions.size + 1}`;
  const dataPath = join(sessionsDir, sessionId);

  const session = {
    id: sessionId,
    name: sessionName,
    dataPath,
    client: null,
    ready: false,
    qrCode: null,
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString()
  };

  sessions.set(sessionId, session);
  saveSessions();

  // تهيئة العميل
  initializeClient(sessionId);

  res.json({ 
    success: true, 
    session: {
      id: sessionId,
      name: sessionName,
      ready: false,
      status: 'initializing'
    }
  });
});

// API: حذف جلسة
app.delete('/api/sessions/:id', async (req, res) => {
  const { id } = req.params;
  const session = sessions.get(id);

  if (!session) {
    return res.status(404).json({ success: false, error: 'الجلسة غير موجودة' });
  }

  try {
    // إيقاف العميل
    if (session.client) {
      await session.client.destroy();
    }

    sessions.delete(id);
    saveSessions();

    res.json({ success: true, message: 'تم حذف الجلسة بنجاح' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: الحصول على QR Code لجلسة معينة
app.get('/api/sessions/:id/qrcode', (req, res) => {
  const { id } = req.params;
  const session = sessions.get(id);

  if (!session) {
    return res.status(404).json({ error: 'الجلسة غير موجودة' });
  }

  if (session.ready) {
    return res.json({ ready: true });
  }

  if (session.qrCode) {
    return res.json({ qr: session.qrCode });
  }

  res.json({ waiting: true });
});

// API: الحصول على حالة جلسة
app.get('/api/sessions/:id/status', (req, res) => {
  const { id } = req.params;
  const session = sessions.get(id);

  if (!session) {
    return res.status(404).json({ error: 'الجلسة غير موجودة' });
  }

  res.json({
    id: session.id,
    name: session.name,
    ready: session.ready,
    status: session.ready ? 'connected' : (session.qrCode ? 'waiting_qr' : 'disconnected'),
    lastActivity: session.lastActivity
  });
});

// API: إرسال رسالة من جلسة معينة
app.post('/api/sessions/:id/send-message', async (req, res) => {
  const { id } = req.params;
  const session = sessions.get(id);

  if (!session) {
    return res.status(404).json({ 
      success: false, 
      error: 'الجلسة غير موجودة' 
    });
  }

  if (!session.ready || !session.client) {
    return res.status(400).json({ 
      success: false, 
      error: 'الجلسة غير متصلة. يرجى ربط واتساب أولاً.' 
    });
  }

  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'الرجاء إدخال رقم الهاتف والرسالة' 
    });
  }

  try {
    const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
    await session.client.sendMessage(chatId, message);
    
    session.lastActivity = new Date().toISOString();
    
    res.json({ 
      success: true, 
      message: 'تم إرسال الرسالة بنجاح' 
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'حدث خطأ أثناء إرسال الرسالة' 
    });
  }
});

// API: إعادة تشغيل جلسة
app.post('/api/sessions/:id/restart', async (req, res) => {
  const { id } = req.params;
  const session = sessions.get(id);

  if (!session) {
    return res.status(404).json({ success: false, error: 'الجلسة غير موجودة' });
  }

  try {
    // إيقاف العميل الحالي
    if (session.client) {
      await session.client.destroy();
    }

    // إعادة تهيئة
    session.client = null;
    session.ready = false;
    session.qrCode = null;
    
    initializeClient(id);

    res.json({ success: true, message: 'تم إعادة تشغيل الجلسة' });
  } catch (error) {
    console.error('Error restarting session:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: معالجة أحداث النظام (من Capacitor)
app.post('/api/system-event', (req, res) => {
  const { event } = req.body;
  console.log(`📱 System event: ${event}`);

  switch (event) {
    case 'app_active':
      console.log('🔄 App became active, checking sessions...');
      reinitializeAllSessions();
      break;
    case 'network_reconnected':
      console.log('🌐 Network reconnected, reinitializing sessions...');
      reinitializeAllSessions();
      break;
    case 'network_disconnected':
      console.log('⚠️ Network disconnected');
      break;
    default:
      console.log(`Unknown event: ${event}`);
  }

  res.json({ success: true });
});

// تهيئة عميل واتساب
function initializeClient(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return;

  const client = new Client({
    authStrategy: new LocalAuth({
      dataPath: session.dataPath,
      clientId: sessionId
    }),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-software-rasterizer'
      ]
    }
  });

  session.client = client;

  // حدث QR Code
  client.on('qr', async (qr) => {
    console.log(`[${session.name}] QR Code received`);
    try {
      session.qrCode = await qrcode.toDataURL(qr);
      session.lastActivity = new Date().toISOString();
    } catch (err) {
      console.error(`[${session.name}] Error generating QR code:`, err);
    }
  });

  // حدث جاهزية
  client.on('ready', () => {
    console.log(`✅ [${session.name}] Client is ready!`);
    session.ready = true;
    session.qrCode = null;
    session.lastActivity = new Date().toISOString();
  });

  // حدث المصادقة
  client.on('authenticated', () => {
    console.log(`✅ [${session.name}] Authenticated`);
    session.lastActivity = new Date().toISOString();
  });

  // حدث فشل المصادقة
  client.on('auth_failure', (msg) => {
    console.error(`❌ [${session.name}] Authentication failed:`, msg);
    session.ready = false;
    session.qrCode = null;
  });

  // حدث انقطاع الاتصال
  client.on('disconnected', (reason) => {
    console.log(`❌ [${session.name}] Disconnected:`, reason);
    session.ready = false;
    session.qrCode = null;
    
    // إعادة المحاولة بعد 5 ثوان
    setTimeout(() => {
      if (sessions.has(sessionId)) {
        console.log(`🔄 [${session.name}] Attempting to reconnect...`);
        initializeClient(sessionId);
      }
    }, 5000);
  });

  // حدث تحميل الجلسة
  client.on('loading_screen', (percent, message) => {
    console.log(`[${session.name}] Loading: ${percent}% - ${message}`);
  });

  // بدء العميل
  client.initialize().catch(err => {
    console.error(`[${session.name}] Error initializing:`, err);
    session.ready = false;
  });
}

// معالجة إعادة التشغيل - إعادة تهيئة جميع الجلسات
function reinitializeAllSessions() {
  console.log('🔄 Reinitializing all sessions...');
  sessions.forEach((session, id) => {
    if (!session.ready && !session.client) {
      initializeClient(id);
    }
  });
}

// معالجة انقطاع الإنترنت
let networkCheckInterval = null;

function startNetworkMonitoring() {
  if (networkCheckInterval) return;

  networkCheckInterval = setInterval(() => {
    // التحقق من حالة الجلسات وإعادة الاتصال إذا لزم الأمر
    sessions.forEach((session, id) => {
      if (session.client && !session.ready && !session.qrCode) {
        // محاولة إعادة الاتصال
        console.log(`🔄 [${session.name}] Network reconnected, reinitializing...`);
        initializeClient(id);
      }
    });
  }, 10000); // كل 10 ثوان
}

// بدء الخادم
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
  console.log('📱 Initializing saved sessions...');
  
  // إعادة تهيئة الجلسات المحفوظة
  reinitializeAllSessions();
  
  // بدء مراقبة الشبكة
  startNetworkMonitoring();
  
  console.log('✅ Server ready!');
});

// معالجة إيقاف التطبيق
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  sessions.forEach(async (session) => {
    if (session.client) {
      await session.client.destroy();
    }
  });
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  sessions.forEach(async (session) => {
    if (session.client) {
      await session.client.destroy();
    }
  });
  process.exit(0);
});
