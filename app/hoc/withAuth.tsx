'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { GET_ACCESS_TOKEN } from '@/app/query/user.query';
import CircularProgress from '@mui/material/CircularProgress';
import { orange } from '@mui/material/colors';
import { useLazyQuery } from '@apollo/client';

export default function withAuth(WrappedComponent: React.ComponentType) {
  return (props: any) => {
    const router = useRouter();
    const [getNewAccessToken, { loading, error, data }] = useLazyQuery(GET_ACCESS_TOKEN);
    const [errors, setError] = useState<string | null>(null);

    useEffect(() => {
      const token = Cookies.get('authToken');
      if (!token) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          router.push('/login');
        } else {
          getNewAccessToken({ variables: { refreshToken } });
        }
      }
    }, [getNewAccessToken, router]);

    useEffect(() => {
      if (data && data.getNewAccessToken) {
        if (data.getNewAccessToken.ok) {
          Cookies.set('authToken', data.getNewAccessToken.token, { sameSite: 'None', secure: true });
        } else {
          router.push('/login');
        }
      }
    }, [data, router]);

    useEffect(() => {
      if (error) {
        setError(error.message);
        router.push('/login');
      }
    }, [error, router]);

    if (loading) {
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
