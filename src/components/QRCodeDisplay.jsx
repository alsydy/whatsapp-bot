import React, { useState, useEffect } from 'react';
import './QRCodeDisplay.css';

function QRCodeDisplay({ sessionId, isConnected, isWaitingQR, API_BASE }) {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      setQrCode(null);
      setLoading(false);
      return;
    }

    const fetchQR = async () => {
      try {
        const response = await fetch(`${API_BASE}/sessions/${sessionId}/qrcode`);
        const data = await response.json();
        
        if (data.qr) {
          setQrCode(data.qr);
        } else if (data.ready) {
          setQrCode(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching QR code:', error);
        setLoading(false);
      }
    };

    fetchQR();
    const interval = setInterval(fetchQR, 2000);
    return () => clearInterval(interval);
  }, [sessionId, isConnected, API_BASE]);

  if (isConnected) {
    return (
      <div className="qr-display connected">
        <div className="success-icon">✅</div>
        <h3>تم الربط بنجاح!</h3>
        <p>الجلسة متصلة وجاهزة لإرسال الرسائل</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="qr-display loading">
        <div className="spinner"></div>
        <p>جاري تحضير QR Code...</p>
      </div>
    );
  }

  if (!qrCode) {
    return (
      <div className="qr-display waiting">
        <div className="waiting-icon">⏳</div>
        <p>في انتظار QR Code...</p>
      </div>
    );
  }

  return (
    <div className="qr-display">
      <div className="qr-instructions">
        <h3>📱 خطوات الربط:</h3>
        <ol>
          <li>افتح تطبيق واتساب على هاتفك</li>
          <li>اذهب إلى <strong>الإعدادات</strong> → <strong>الأجهزة المرتبطة</strong></li>
          <li>اضغط على <strong>"ربط جهاز"</strong></li>
          <li>امسح الباركود الموجود أدناه</li>
        </ol>
      </div>
      
      <div className="qr-code-container">
        <img src={qrCode} alt="QR Code" className="qr-code-image" />
      </div>
      
      <p className="qr-note">
        ⚠️ لا تشارك هذا الباركود مع أي شخص
      </p>
    </div>
  );
}

export default QRCodeDisplay;

