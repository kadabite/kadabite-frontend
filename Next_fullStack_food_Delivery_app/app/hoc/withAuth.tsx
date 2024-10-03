'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { GET_ACCESS_TOKEN } from '@/app/query/user.query';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { orange } from '@mui/material/colors';

export default function withAuth(WrappedComponent: React.ComponentType) {
  return (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const token = Cookies.get('authToken');
      if (!token) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          router.push('/login');
        } else {
          axios.post('/api/graphql', {
            query: GET_ACCESS_TOKEN,
            variables: { refreshToken },
          })
          .then((response: { data: { data: any; }; }) => {
            const data = response.data.data;
            if (data.getNewAccessToken.ok) {
              Cookies.set('authToken', data.getNewAccessToken.accessToken);
              setLoading(false);
            } else {
              router.push('/login');
            }
          })
          .catch((err: { message: SetStateAction<string | null>; }) => {
            setError(err.message);
            router.push('/login');
          });
        }
      } else {
        setLoading(false);
      }
    }, [router]);

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

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
    return <WrappedComponent {...props} />;
  };
}