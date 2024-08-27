import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';


export default function Nav({ children, url } : { children: React.ReactNode, url: string }) {
    return (
    <Link href={url} className='flex items-center gap-5 p-2 self-start rounded-md font-medium hover:text-white transition-colors hover:bg-orange-400 active:text-white active:bg-orange-400 focus:text-white focus:bg-orange-400'>
        {children}    
    </Link>
    )
}
