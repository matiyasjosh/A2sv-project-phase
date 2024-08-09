"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [time, setTimer] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (time === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000); // every 10^3 ms === 1s
    return () => clearInterval(interval);
  }, [time]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) { // this function focus on the next otp input field if it has more input to enter
        const nextInput = document.querySelector(
          `#otp-input-${index + 1}`
        ) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const otpCode = otp.join("");
    const email = localStorage.getItem("signupEmail");

    if (!email) {
      setError("Email not found. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, OTP: otpCode }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        localStorage.removeItem("signupEmail");
        router.push("/auth/signIn");
      } else {
        setError(result.message || "Verification failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);

    const email = localStorage.getItem("signupEmail");

    if (!email) {
      setError("Email not found. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setTimer(30); // Reset timer
      } else {
        setError(result.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-12 rounded-lg w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-8 text-center">
          Verify Your Email
        </h1>

        <p className="text-center text-gray-600 mb-6">
          We&#39;ve sent a verification code to the email address you provided.
          To complete the verification process, please enter the code here.
        </p>

        <div className="flex justify-center mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleOtpChange(e, index)}
              className="w-10 h-10 text-center border border-gray-300 rounded-lg mx-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              maxLength={1}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 mt-4 text-white bg-indigo-900 rounded-full hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
        <div className="text-center mt-4">
          <button
            onClick={handleResendOtp}
            className="text-indigo-600 hover:underline"
            disabled={time > 0}
          >
            {time > 0 ? `Resend OTP in ${time}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
