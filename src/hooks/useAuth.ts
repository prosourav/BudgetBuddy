// hooks/useAuth.ts
'use client'
import { useState, useEffect, SetStateAction } from 'react';
import { parseCookies } from 'nookies'


export const useAuth = () => {
  const [user, setUser] = useState<SetStateAction<string | null>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cookieData = parseCookies();
        if (cookieData.token) {
          setUser(cookieData.token);
        }
      } catch (error) {
        console.error('Auth check failed', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
};