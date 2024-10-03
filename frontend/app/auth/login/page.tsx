"use client";

import { AuthLib } from '@/apiClient/services';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { z } from 'zod';
import TextInput from '@/components/textInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

  /**
   * The ClientLogin component handles the login process. It renders a form with
   * inputs for the username and password, and a submit button. When the form is
   * submitted, it calls the `loginUser` function which makes an API call to
   * the backend to authenticate the user. If the login is successful, it sets an
   * access token in the user's cookies and redirects the user to the homepage.
   * If the login fails, it displays an error message.
   *
   * @returns The ClientLogin component.
   */
const ClientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();
  /**
   * Handles the login form submission. It validates the form inputs, and if
   * they are valid, makes an API call to the backend to authenticate the user.
   * If the login is successful, it sets an access token in the user's cookies
   * and redirects the user to the homepage. If the login fails, it displays an
   * error message.
   *
   * @param e The form event.
   */
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setUsernameError(null);
    setPasswordError(null);

    const validation = loginSchema.safeParse({ username, password });
    if (!validation.success) {
      validation.error.issues.forEach(issue => {
        if (issue.path[0] === 'username') {
          setUsernameError(issue.message);
        } else if (issue.path[0] === 'password') {
          setPasswordError(issue.message);
        }
      });
      return;
    }

    loginUser();
  };

  /**
   * Makes an API call to the backend to authenticate the user. If the login is
   * successful, it sets an access token in the user's cookies and redirects the
   * user to the homepage. If the login fails, it displays an error message.
   */
  const loginUser = async () => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await AuthLib.LoginUser({ username, password });
      Cookies.set('accessToken', response.data.accessToken);
      setUsernameError(null);
    setPasswordError(null);
    router.push('/');
    } catch (error) {
      // console.error('Error logging in:', error);
      if(error instanceof Error) {
        setErrorMessage(error.message);
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full flex flex-col justify-between h-screen gap-2 p-6 pt-10">
      <div className='flex flex-col pt-10 pb-4 gap-2'>
        <h1 className='text-[36px] leading-[40px] font-light w-2/3'>Create new login password</h1>
        <p className='text-[18px] leading-[32px] font-light'>Create a new password for your account.</p>
      </div>
      <div className='flex flex-col justify-between h-full'>
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
            className={`rounded-[4px] min-w-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${(loading  || username === '' || password === '') ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}
            disabled={loading  || username === '' || password === ''}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className='text-center font-light text-sm text-[#5857590]'>
            Don&apos;t have an account?
            <Link href={'/auth/register'} className="text-[#000000] underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default ClientLogin;
