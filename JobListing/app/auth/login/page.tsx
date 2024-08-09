'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';


type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('https://akil-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed', errorData);
        return;
      }

      const result = await response.json();
      // If the API request is successful, you can also use next-auth to set the session
      const authResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (authResult?.ok) {
        const returnUrl = searchParams.get('returnUrl') || '/';
        router.push('/');
      } else {
        console.error('Sign in with next-auth failed', authResult?.error);
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    }
  };

  return (
    <div className="flex items-center justify-center lg:justify-end lg:mr-40 min-h-screen ">
      <div className="p-12 rounded-lg w-full max-w-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center">Welcome Back,</h1>

        <button
          className="flex items-center justify-center w-full py-3 mb-6 border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={() => signIn('google')}
        >
          <FcGoogle className="mr-3" size={28} />
          Sign In with Google
        </button>

        <div className="flex items-center justify-center my-6">
          <span className="w-1/4 border-b border-gray-300"></span>
          <span className="px-3 text-gray-500">Or Sign In with Email</span>
          <span className="w-1/4 border-b border-gray-300"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...register('email', { required: 'Email is required' })}
              placeholder="Enter email address"
              type="email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full py-3 mt-6 text-white bg-indigo-900 rounded-full hover:bg-indigo-700">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&#39;t have an account?{' '}
          <a
            href="/auth/signup"
            className="text-indigo-600 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;