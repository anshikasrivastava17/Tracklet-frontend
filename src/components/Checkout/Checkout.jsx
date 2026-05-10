import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Redirect back to home after success
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] p-6" style={SG}>
      {/* Background blobs for premium feel */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-20" style={{ background: "#FF6200" }} />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-20" style={{ background: "#FFD60A" }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative z-10 border border-black/5"
      >
        <div className="flex justify-between items-center mb-8">
          <Link to="/subscription" className="text-[#888] hover:text-[#0A0A0A] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
          <div className="font-bold text-lg text-[#0A0A0A]">Checkout</div>
          <div className="w-6" /> {/* spacer for alignment */}
        </div>

        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-2">Payment Successful!</h2>
            <p className="text-[#888] font-medium">Welcome to Tracklet Premium.</p>
            <p className="text-[#888] text-sm mt-4">Redirecting you to dashboard...</p>
          </motion.div>
        ) : (
          <>
            <div className="mb-8 p-6 bg-[#0A0A0A] rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full blur-[50px] opacity-20 pointer-events-none" style={{ background: "#FF6200" }} />
              <div className="relative z-10">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-1">Plan</span>
                <h3 className="text-xl font-bold mb-4">Tracklet Premium</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">₹99</span>
                  <span className="text-[#aaa] font-medium mb-1">/ month</span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-widest">Card Details (Mock)</label>
                <div className="p-4 rounded-xl border border-black/10 bg-[#F7F7F7] flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="4242 4242 4242 4242" 
                    className="w-full bg-transparent outline-none font-medium placeholder:text-[#bbb] text-[#0A0A0A]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="p-4 rounded-xl border border-black/10 bg-[#F7F7F7]">
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full bg-transparent outline-none font-medium placeholder:text-[#bbb] text-[#0A0A0A]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="p-4 rounded-xl border border-black/10 bg-[#F7F7F7]">
                    <input 
                      type="text" 
                      placeholder="CVC" 
                      className="w-full bg-transparent outline-none font-medium placeholder:text-[#bbb] text-[#0A0A0A]"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-base font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 mt-6 flex items-center justify-center gap-2"
                style={{ background: "#FF6200", boxShadow: "0 6px 24px rgba(255,98,0,0.35)" }}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay ₹99"
                )}
              </button>
            </form>
            
            <p className="text-center text-xs text-[#888] font-medium mt-6">
              Payments are secure and encrypted. <br />
              Cancel your subscription at any time.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Checkout;
