import React, { useState } from 'react';
import axios from "../utils/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/admin/login/forgot-password', { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Send Reset Link</button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
