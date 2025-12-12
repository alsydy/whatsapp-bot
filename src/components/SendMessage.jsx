import React, { useState } from 'react';
import './SendMessage.css';

function SendMessage({ sessionId, API_BASE }) {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!number || !message) {
      setResult({ success: false, message: 'الرجاء إدخال رقم الهاتف والرسالة' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/sessions/${sessionId}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, message })
      });

      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: data.message || 'تم إرسال الرسالة بنجاح' });
        setMessage('');
      } else {
        setResult({ success: false, message: data.error || 'حدث خطأ أثناء إرسال الرسالة' });
      }
    } catch (error) {
      setResult({ success: false, message: 'حدث خطأ في الاتصال بالخادم' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="send-message">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="number">رقم الهاتف (بدون رموز)</label>
          <input
            id="number"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="مثال: 966501234567"
            required
            disabled={loading}
          />
          <small className="form-hint">
            أدخل الرقم بصيغة دولية بدون رموز (مثال: 966501234567)
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="message">الرسالة</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            required
            disabled={loading}
            rows="6"
          />
        </div>

        {result && (
          <div className={`result-message ${result.success ? 'success' : 'error'}`}>
            {result.success ? '✅' : '❌'} {result.message}
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? '⏳ جاري الإرسال...' : '📤 إرسال الرسالة'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;

