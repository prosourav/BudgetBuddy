// hooks/useAuth.ts
import { useState, useEffect, SetStateAction } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const useAuth = () => {
  const [user, setUser] = useState<SetStateAction<string | null>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cookieData = parseCookies();
        const  user  = JSON.parse(cookieData.user);
    
        if (user.email) {
          setUser(user.email);
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