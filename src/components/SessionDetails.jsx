import React, { useState, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import SendMessage from './SendMessage';
import './SessionDetails.css';

function SessionDetails({ session, onClose, API_BASE }) {
  const [sessionStatus, setSessionStatus] = useState(session);
  const [activeTab, setActiveTab] = useState('qrcode');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/sessions/${session.id}/status`);
        const data = await response.json();
        setSessionStatus(data);
      } catch (error) {
        console.error('Error fetching session status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, [session.id, API_BASE]);

  const isConnected = sessionStatus.status === 'connected';
  const isWaitingQR = sessionStatus.status === 'waiting_qr';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal session-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📱 {sessionStatus.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="session-status-bar">
          <span className={`status-badge ${sessionStatus.status === 'connected' ? 'connected' : sessionStatus.status === 'waiting_qr' ? 'waiting' : 'disconnected'}`}>
            {sessionStatus.status === 'connected' ? '✅ متصل' : 
             sessionStatus.status === 'waiting_qr' ? '⏳ في انتظار QR' : 
             '❌ غير متصل'}
          </span>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'qrcode' ? 'active' : ''}`}
            onClick={() => setActiveTab('qrcode')}
            disabled={isConnected}
          >
            📷 QR Code
          </button>
          <button
            className={`tab ${activeTab === 'send' ? 'active' : ''}`}
            onClick={() => setActiveTab('send')}
            disabled={!isConnected}
          >
            💬 إرسال رسالة
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'qrcode' && (
            <QRCodeDisplay
              sessionId={session.id}
              isConnected={isConnected}
              isWaitingQR={isWaitingQR}
              API_BASE={API_BASE}
            />
          )}

          {activeTab === 'send' && isConnected && (
            <SendMessage
              sessionId={session.id}
              API_BASE={API_BASE}
            />
          )}

          {activeTab === 'send' && !isConnected && (
            <div className="tab-placeholder">
              <p>⚠️ يجب ربط الجلسة أولاً قبل إرسال الرسائل</p>
              <p>انتقل إلى تبويب QR Code لربط واتساب</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SessionDetails;

