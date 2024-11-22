import { Button } from '@/app/ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function LogoutButton() {

    const router = useRouter();
    return <Button onClick={() => {
        localStorage.removeItem('refreshToken');
        Cookies.remove('authToken');
        router.push('/login');
    }}>Logout</Button>
}
