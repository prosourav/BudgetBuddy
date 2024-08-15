'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Assume you have an auth hook
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !user ? <>{children}</> : null;
};

export default ProtectedRoute;