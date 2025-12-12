import React from 'react';
import './SessionList.css';

function SessionList({ sessions, selectedSession, onSelectSession, onDeleteSession, onRestartSession, API_BASE }) {
  const getStatusBadge = (status) => {
    const badges = {
      connected: { class: 'connected', text: '✅ متصل', icon: '✅' },
      waiting_qr: { class: 'waiting', text: '⏳ في انتظار QR', icon: '⏳' },
      disconnected: { class: 'disconnected', text: '❌ غير متصل', icon: '❌' }
    };
    return badges[status] || badges.disconnected;
  };

  if (sessions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📱</div>
        <h3>لا توجد جلسات</h3>
        <p>أنشئ جلسة جديدة للبدء</p>
      </div>
    );
  }

  return (
    <div className="session-list">
      <h2 className="section-title">الجلسات ({sessions.length})</h2>
      <div className="sessions-grid">
        {sessions.map(session => {
          const status = getStatusBadge(session.status);
          const isSelected = selectedSession?.id === session.id;

          return (
            <div
              key={session.id}
              className={`session-card ${isSelected ? 'selected' : ''} ${session.status}`}
              onClick={() => onSelectSession(session)}
            >
              <div className="session-header">
                <div className="session-info">
                  <h3 className="session-name">{session.name}</h3>
                  <span className={`status-badge ${status.class}`}>
                    {status.icon} {status.text}
                  </span>
                </div>
                <div className="session-actions" onClick={(e) => e.stopPropagation()}>
                  {session.status === 'connected' && (
                    <button
                      className="btn-icon"
                      onClick={() => onRestartSession(session.id)}
                      title="إعادة التشغيل"
                    >
                      🔄
                    </button>
                  )}
                  <button
                    className="btn-icon danger"
                    onClick={() => onDeleteSession(session.id)}
                    title="حذف"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="session-meta">
                <span className="meta-item">
                  📅 {new Date(session.createdAt).toLocaleDateString('ar-SA')}
                </span>
                {session.lastActivity && (
                  <span className="meta-item">
                    🕐 {new Date(session.lastActivity).toLocaleTimeString('ar-SA')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SessionList;

