"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const EmailModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const res = await fetch("/api/email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ mail: email }),
  //   });
  //   const data = await res.json();
  //   setEmail("");
  //   localStorage.setItem("count", localStorage.getItem("count") - 2);
  //   if (data) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //   }
  //   onClose();
  // }

  const handleSignUp = () => {
    router.push('/signup'); // Navigate to signup page
    onClose(); // Close the modal
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-lg mx-4"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">
            Out of Credits!
            </h2>
            <p className="text-gray-400 mb-6 text-lg">
              Your free credits just ran out.<br /><br />
              Sign up for free (no credit card, promise) and get more credits! Let’s keep the fun going! 📸
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-300 hover:text-white transition-colors text-lg border border-gray-700 rounded-lg hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSignUp}
                className="px-8 py-3 bg-gradient-to-r from-[#21ABFD] to-[#0055DE] text-white rounded-lg transition-all hover:opacity-90 text-lg font-medium"
              >
                Sign Up
              </button>
            </div>
            
            {/* <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors text-lg"
                >
                  Maybe Later
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </div>
            </form> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailModal;