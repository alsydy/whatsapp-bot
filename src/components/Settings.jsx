import React, { useState, useEffect } from 'react';

function Settings({ onClose }) {
  const [serverUrl, setServerUrl] = useState(() => {
    const saved = localStorage.getItem('serverUrl');
    return saved || 'http://localhost:3000';
  });
  const [useExternalServer, setUseExternalServer] = useState(() => {
    const saved = localStorage.getItem('useExternalServer');
    return saved === 'true';
  });

  const handleSave = () => {
    localStorage.setItem('serverUrl', serverUrl);
    localStorage.setItem('useExternalServer', useExternalServer.toString());
    alert('تم حفظ الإعدادات! يرجى إعادة تحميل الصفحة.');
    window.location.reload();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚙️ الإعدادات</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="settings-content">
          <div className="setting-item">
            <h3>🔗 إعدادات الخادم</h3>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={!useExternalServer}
                  onChange={(e) => setUseExternalServer(!e.target.checked)}
                />
                {' '}استخدام الخادم المحلي (localhost)
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={useExternalServer}
                  onChange={(e) => setUseExternalServer(e.target.checked)}
                />
                {' '}استخدام خادم خارجي
              </label>
            </div>
            {useExternalServer && (
              <div className="form-group">
                <label htmlFor="server-url">عنوان الخادم:</label>
                <input
                  id="server-url"
                  type="text"
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                  placeholder="http://192.168.1.100:3000"
                />
                <small className="form-hint">
                  أدخل عنوان IP ورقم المنفذ للخادم الخارجي
                </small>
              </div>
            )}
          </div>

          <div className="setting-item">
            <h3>📱 معلومات التطبيق</h3>
            <p>خادم واتساب بوت - الإصدار 1.0.0</p>
            <p>يعمل على الهاتف كسيرفر مستقل</p>
          </div>

          <div className="setting-item">
            <h3>⚠️ ملاحظة مهمة</h3>
            <p style={{color: '#856404', background: '#fff3cd', padding: '10px', borderRadius: '5px'}}>
              <strong>للعمل على الهاتف:</strong><br/>
              يجب تثبيت Termux و Node.js أولاً.<br/>
              راجع ملف SETUP_INSTRUCTIONS_AR.md للتفاصيل.
            </p>
          </div>

          <div className="setting-item">
            <h3>🔄 الميزات</h3>
            <ul>
              <li>✅ إدارة جلسات متعددة</li>
              <li>✅ عمل في الخلفية</li>
              <li>✅ إعادة الاتصال التلقائي</li>
              <li>✅ معالجة انقطاع الإنترنت</li>
              <li>✅ معالجة إعادة التشغيل</li>
            </ul>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            💾 حفظ
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;

