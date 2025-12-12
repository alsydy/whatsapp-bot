import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import SessionList from './components/SessionList';
import SessionDetails from './components/SessionDetails';
import CreateSession from './components/CreateSession';
import Settings from './components/Settings';
import BackgroundService from './capacitor/BackgroundService';
import './App.css';

function App() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const isNative = Capacitor.isNativePlatform();

  // تحديد API_BASE بناءً على الإعدادات
  const getApiBase = () => {
    if (isNative) {
      const useExternal = localStorage.getItem('useExternalServer') === 'true';
      if (useExternal) {
        const serverUrl = localStorage.getItem('serverUrl') || 'http://localhost:3000';
        return `${serverUrl}/api`;
      }
      return 'http://localhost:3000/api';
    }
    return window.location.hostname === 'localhost' 
      ? 'http://localhost:3000/api' 
      : '/api';
  };

  const API_BASE = getApiBase();

  useEffect(() => {
    // تهيئة خدمة الخلفية إذا كان على الأندرويد
    if (isNative) {
      BackgroundService.setupListeners();
    }

    fetchSessions();
    const interval = setInterval(fetchSessions, 3000);
    return () => clearInterval(interval);
  }, [isNative]);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_BASE}/sessions`);
      const data = await response.json();
      setSessions(data.sessions || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setLoading(false);
    }
  };

  const handleCreateSession = async (name) => {
    try {
      const response = await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      if (data.success) {
        setShowCreate(false);
        fetchSessions();
        setSelectedSession(data.session);
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('حدث خطأ أثناء إنشاء الجلسة');
    }
  };

  const handleDeleteSession = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه الجلسة؟')) return;

    try {
      const response = await fetch(`${API_BASE}/sessions/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        if (selectedSession?.id === id) {
          setSelectedSession(null);
        }
        fetchSessions();
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('حدث خطأ أثناء حذف الجلسة');
    }
  };

  const handleRestartSession = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/sessions/${id}/restart`, {
        method: 'POST'
      });
      const data = await response.json();
      if (data.success) {
        fetchSessions();
      }
    } catch (error) {
      console.error('Error restarting session:', error);
      alert('حدث خطأ أثناء إعادة تشغيل الجلسة');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📱 خادم واتساب بوت</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setShowCreate(true)}
          >
            ➕ جلسة جديدة
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowSettings(true)}
          >
            ⚙️ الإعدادات
          </button>
        </div>
      </header>

      <div className="app-content">
        <SessionList
          sessions={sessions}
          selectedSession={selectedSession}
          onSelectSession={setSelectedSession}
          onDeleteSession={handleDeleteSession}
          onRestartSession={handleRestartSession}
          API_BASE={API_BASE}
        />

        {selectedSession && (
          <SessionDetails
            session={selectedSession}
            onClose={() => setSelectedSession(null)}
            API_BASE={API_BASE}
          />
        )}
      </div>

      {showCreate && (
        <CreateSession
          onClose={() => setShowCreate(false)}
          onCreate={handleCreateSession}
        />
      )}

      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
