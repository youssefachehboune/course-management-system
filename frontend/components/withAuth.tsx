"use client";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: any) => {
  const Auth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      // Get the access token from cookies
      const token = Cookies.get('accessToken');
      
      // If there is no access token, redirect to the login page
      if (!token) {
        router.push('/auth/login');
      }
    }, [router]);

    // If access token exists, render the component
    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;