'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { orange } from '@mui/material/colors';
import { getSession } from 'next-auth/react';

export default function withAuth(WrappedComponent: React.ComponentType) {
  return (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [errors, setError] = useState<string | null>(null);

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const session = await getSession();
          if (!session) {
            router.push('/login');
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          setError('Failed to check authentication');
          router.push('/login');
        }
      };

      checkAuthentication();
    }, [router]);

    if (isAuthenticated === null) {
      return (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress
            sx={{
              color: orange[600],
              fontSize: 30,
            }}
          />
        </div>
      );
    }

    if (errors) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{errors}</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
