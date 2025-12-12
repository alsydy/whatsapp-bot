import React, { useState } from 'react';

function CreateSession({ onClose, onCreate }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name || `Session ${Date.now()}`);
    setName('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ إنشاء جلسة جديدة</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="session-name">اسم الجلسة</label>
            <input
              id="session-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: جلسة العمل الرئيسية"
              autoFocus
            />
            <small className="form-hint">
              يمكنك ترك الحقل فارغاً لاستخدام اسم افتراضي
            </small>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              إلغاء
            </button>
            <button type="submit" className="btn btn-primary">
              إنشاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSession;

