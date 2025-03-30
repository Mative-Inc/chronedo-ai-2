"use client";
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MainLayout from '@/layouts/mainLayout';
import Notification from '@/components/Notification';

function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }

      setSuccess(data.message);
      
      setTimeout(() => {
        router.push(`/reset-password?token=${data.token}`);
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Invalid OTP or expired');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setSuccess('New OTP sent successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#0D0B13] rounded-lg border border-[#0093E8]">
        <h1 className="text-2xl font-bold text-center text-white">Verify OTP</h1>
        <p className="text-gray-400 text-center">
          We've sent a 6-digit code to {email}
        </p>

        {success && (
          <Notification
            isOpen={true}
            onClose={() => setSuccess(false)}
            title="Success"
            message={success}
            type="success"
          />
        )}

        {error && (
          <Notification
            isOpen={true}
            onClose={() => setError(false)}
            title="Error"
            message={error}
            type="error"
          />
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              OTP Code
            </label>
            <input
              type="text"
              value={otp}
              maxLength={6}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setOtp(value);
              }}
              className="w-full px-4 py-2 mt-1 text-white bg-[#0D0B13] border border-gray-700 rounded-md focus:ring-2 focus:ring-[#21ACFD]"
              placeholder="Enter 6-digit OTP"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-[#21ABFD] to-[#0055DE] rounded-md hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )}
      </div>
    </div>
  );
}

export default function VerifyOTP() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyOTPContent />
      </Suspense>
    </MainLayout>
  );
}