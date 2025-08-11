import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api  from "../utils/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/admin/login/reset-password/${token}`, { newPassword });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Reset</button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
