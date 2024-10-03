"use client";

import { AuthLib } from '@/apiClient/services';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { z } from 'zod';
import TextInput from '@/components/textInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters long' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

/**
 * The ClientLogin component handles the login process. It renders a form with
 * inputs for the username, full name, and password, and a submit button. When
 * the form is submitted, it calls the `registerUser` function which makes an API
 * call to the backend to authenticate the user. If the login is successful, it
 * sets an access token in the user's cookies and redirects the user to the
 * homepage. If the login fails, it displays an error message.
 *
 * @returns The ClientLogin component.
 */
const ClientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Handles the register form submission. It validates the form inputs, and if
   * they are valid, makes an API call to the backend to authenticate the user.
   * If the login is successful, it sets an access token in the user's cookies
   * and redirects the user to the homepage. If the login fails, it displays an
   * error message.
   *
   * @param e The form event.
   */
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setUsernameError(null);
    setFullNameError(null);
    setPasswordError(null);

    const validation = registerSchema.safeParse({ username, fullName, password });
    if (!validation.success) {
      validation.error.issues.forEach(issue => {
        if (issue.path[0] === 'username') {
          setUsernameError(issue.message);
        } else if (issue.path[0] === 'fullName') {
          setFullNameError(issue.message);
        } else if (issue.path[0] === 'password') {
          setPasswordError(issue.message);
        }
      });
      return;
    }

    registerUser();
  };


  /**
   * Registers a new user.
   *
   * Makes an API call to the backend to register the user. If the registration
   * is successful, it sets an access token in the user's cookies and redirects
   * the user to the homepage. If the registration fails, it displays an error
   * message.
   */
  const registerUser = async () => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await AuthLib.CreateUser({ username, fullName, password });
      Cookies.set('accessToken', response.data.accessToken);
      // console.log('User registered:', response.data);
      setUsernameError(null);
    setFullNameError(null);
    setPasswordError(null);
    router.push('/');
    } catch (error) {
      // console.error('Error registering user:', error);
      if(error instanceof Error) { 
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="w-full md:border md:w-[400px] flex flex-col justify-between h-screen md:h-fit gap-2 p-6 pt-10">
      <div className='flex flex-col pt-10 pb-4 gap-2'>
        <h1 className='text-[36px] leading-[40px] font-light w-2/3'>Create new login password</h1>
        <p className='text-[18px] leading-[32px] font-light'>Create a new password for your account.</p>
      </div>
      <div className='flex flex-col justify-between h-full md:gap-36'>
        <div className='flex flex-col gap-[12px]'>
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            type="text"
            error={usernameError}
            disabled={loading}
          />
          <TextInput
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            type="text"
            error={fullNameError}
            disabled={loading}
          />
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            error={passwordError}
            disabled={loading}
          />
        {errorMessage && <p className="text-red-500 text-[12px] font-light">* {errorMessage}</p>}
        </div>
        <div className='flex flex-col gap-[12px]'>
        <button
          type="submit"
          className={`rounded-[4px] min-w-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}
          disabled={loading}
          >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        <p className='text-center font-light text-sm text-[#5857590]'>
          Already have an account?{' '}
          <Link href={'/auth/login'} className="text-[#000000] underline">
            Login
          </Link>
        </p>
          </div>
      </div>
    </form>
  );
};

export default ClientLogin;
