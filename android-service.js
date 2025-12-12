// ملف خدمة الخلفية للأندرويد
// هذا الملف يتم تشغيله كخدمة منفصلة على الأندرويد

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// تشغيل الخادم كعملية منفصلة
const serverProcess = spawn('node', [join(__dirname, 'server.js')], {
  detached: true,
  stdio: 'ignore'
});

serverProcess.unref();

console.log('✅ Background service started, PID:', serverProcess.pid);

// معالجة الإيقاف
process.on('SIGTERM', () => {
  console.log('Stopping background service...');
  serverProcess.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Stopping background service...');
  serverProcess.kill();
  process.exit(0);
});

