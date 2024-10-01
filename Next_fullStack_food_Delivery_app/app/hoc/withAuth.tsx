import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function withAuth(WrappedComponent: React.ComponentType) {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('authToken');
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};
