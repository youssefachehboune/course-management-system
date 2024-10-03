/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withNoAuth = (WrappedComponent: any) => {
  const NoAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      // Get the access token from cookies
      const token = Cookies.get('accessToken');

      // If token exists, redirect logged-in users to a restricted page (e.g., dashboard)
      if (token) {
        router.push('/'); // Redirect to a dashboard or home page
      }
    }, [router]);

    // If no token, render the wrapped component (allowing access to the page)
    return <WrappedComponent {...props} />;
  };

  return NoAuth;
};

export default withNoAuth;
