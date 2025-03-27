"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function OTPVerification({ formData, onClose }) {
  const router = useRouter();
  const email = formData.email;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useUser();

  const handleVerify = async () => {
    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const verifyResponse = await axios.post('/api/auth/email-verification', {
        email,
        otp
      });

      if (verifyResponse.status === 200) {
        const registerResponse = await axios.post('/api/auth/register', formData);
        
        if (registerResponse.status === 201) {
          const loginResponse = await axios.post('/api/auth/login', {
            email: formData.email,
            password: formData.password
          });

          if (loginResponse.status === 200) {
            login(loginResponse.data.token);
            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => router.push('/dashboard'), 2000);
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/send-otp', {
        email
      });

      if (response.status === 200) {
        setSuccess('New OTP sent successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Blurred background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          onClick={onClose}
        />
        
        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative z-10 bg-[#0D0B13] border border-[#0093E8] rounded-xl p-8 w-full max-w-md mx-4"
        >
          <h1 className="text-2xl font-bold text-center text-white mb-4">Verify OTP</h1>
          <p className="text-gray-400 text-center mb-6">
            We've sent a 6-digit code to {email}
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-2 text-white bg-[#0D0B13] border border-gray-700 rounded-md focus:ring-2 focus:ring-[#21ACFD]"
                placeholder="Enter 6-digit OTP"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-[#21ABFD] to-[#0055DE] text-white rounded-md disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-[#21ACFD] hover:underline text-sm w-full text-center"
            >
              Didn't receive code? Resend OTP
            </button>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            {success && <p className="text-green-500 text-center text-sm">{success}</p>}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}