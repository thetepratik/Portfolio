import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setLoading(true);
    // Simulate a brief auth delay for UX
    await new Promise(r => setTimeout(r, 900));
    const success = login(id.trim(), password);
    setLoading(false);
    if (!success) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          background: 'radial-gradient(circle, #7c5af4, transparent)',
          borderRadius: '50%', filter: 'blur(100px)', opacity: 0.15,
          top: '-150px', right: '-100px',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          background: 'radial-gradient(circle, #c084fc, transparent)',
          borderRadius: '50%', filter: 'blur(100px)', opacity: 0.12,
          bottom: '-100px', left: '-100px',
        }} />
        {/* Grid dots */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px', opacity: 0.4,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}
      >
        {/* Card */}
        <motion.div
          animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '2.5rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {/* Logo badge */}
            <div style={{
              width: '60px', height: '60px', borderRadius: '16px',
              background: 'var(--gradient-hero)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem', margin: '0 auto 1.25rem',
              boxShadow: '0 8px 24px var(--accent-glow)',
            }}>
              🔐
            </div>
            <h1 style={{
              fontSize: '1.6rem', fontWeight: '800',
              color: 'var(--text-primary)', marginBottom: '0.4rem',
              letterSpacing: '-0.03em',
            }}>
              Admin Login
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Sign in to access the portfolio dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Admin ID */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>👤</span> Admin ID
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter your admin ID"
                value={id}
                onChange={e => { setId(e.target.value); setError(''); }}
                autoComplete="username"
                autoFocus
                style={{ fontSize: '0.95rem' }}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>🔑</span> Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                  style={{ paddingRight: '3rem', fontSize: '0.95rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  style={{
                    position: 'absolute', right: '0.875rem', top: '50%',
                    transform: 'translateY(-50%)', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: '1rem', color: 'var(--text-muted)',
                    padding: '0.25rem', lineHeight: 1,
                  }}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(252, 96, 96, 0.1)',
                  border: '1px solid rgba(252, 96, 96, 0.25)',
                  borderRadius: '10px',
                  padding: '0.7rem 1rem',
                  fontSize: '0.85rem',
                  color: '#fc6060',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>⚠️</span> {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: '100%', justifyContent: 'center',
                fontSize: '0.95rem', padding: '0.85rem',
                marginTop: '0.5rem', opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin-slow 1s linear infinite' }}>⚙️</span>
                  Verifying...
                </>
              ) : (
                <>🚀 Sign In to Dashboard</>
              )}
            </button>
          </form>

          {/* Hint box */}
          <div style={{
            marginTop: '1.5rem',
            padding: '0.875rem 1rem',
            background: 'rgba(124, 90, 244, 0.06)',
            border: '1px solid rgba(124, 90, 244, 0.15)',
            borderRadius: '12px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}>
          </div>
        </motion.div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '0.85rem',
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              transition: 'color 0.2s', fontFamily: 'inherit',
            }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--accent-2)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            ← Back to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
