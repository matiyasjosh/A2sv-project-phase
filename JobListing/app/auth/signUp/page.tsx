"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

type FormType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormType>();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setLoading(true);
    setError(null);

    const response = await fetch("https://akil-backend.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "user", // or the role you are assigning
      }),
    });

    const result = await response.json();

    setLoading(false);

    if (response.ok) {
      // Store email in local storage
      localStorage.setItem("signupEmail", data.email);
      const returnUrl = searchParams.get("returnUrl") || "/auth/verify-email";
      window.location.href = returnUrl;
    } else {
      setError(result.message || "Registration failed");
    }
  };

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-12 rounded-lg w-full max-w-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center">
          Sign Up Today!
        </h1>

        <button
          className="flex items-center justify-center w-full py-3 mb-6 border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={() => signIn("google", {callbackUrl: "/"})}
        >
          <FcGoogle className="mr-3" size={28} />
          Sign Up with Google
        </button>

        <div className="flex items-center justify-center my-6">
          <span className="w-1/4 border-b border-gray-300"></span>
          <span className="px-3 text-gray-500">Or Sign Up with Email</span>
          <span className="w-1/4 border-b border-gray-300"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Enter your full name"
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter email address"
              type="email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 text-white bg-indigo-900 rounded-full hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Continue"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-indigo-600 hover:underline font-bold"
          >
            Login
          </a>
        </p>
        <p className="font-light text-md text-gray-400">
          By clicking &#39;Continue&#39;, you acknowledge that you have read and
          accepted our <span className="text-indigo-900">Terms of Service</span>{" "}
          and <span className="text-indigo-900">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;