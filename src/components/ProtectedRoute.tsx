'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Assume you have an auth hook
import { useRouter } from 'next/navigation';
import { AuthRouteProps } from '@/types';


const AuthRoute: React.FC<AuthRouteProps> = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && user) {
      console.log("I am here");
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !user ? <>{children}</> : null;
};

export default AuthRoute;