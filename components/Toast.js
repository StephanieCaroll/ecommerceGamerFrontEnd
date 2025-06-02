import React from 'react';
import '../styles/toast.css';

export default function Toast({ mensagem, tipo }) {
  return (
    <div className="toast-container">
      <div className={`toast-message ${tipo === 'add' ? 'toast-add' : 'toast-remove'}`}>
        {mensagem}
      </div>
    </div>
  );
}
