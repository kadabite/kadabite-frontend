'use client';

import { useEffect, useState } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import { orange } from '@mui/material/colors';
import Image from 'next/image'
import Link from 'next/link';
import { navItems } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';

export default function ToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, setState] = useState(navItems);

  // manage the state for login and logout
  useEffect(()=> {
    if (!isLoggedIn) {
      setState((prevValue) => [...prevValue, { name: 'Login', url: '/login' } ])
    } else {
      setState((prevValue) => [...prevValue, { name: 'Logout', url: '/logout' } ])
    }
    console.log(state);
  }, [])

  return (
    <>
    <div className='md:hidden bg-gray-50 flex flex-row justify-between shadow-md max-h-15 px-3 pb-1 pt-1 w-full overflow-x-hidden relative'>
      <Image 
        alt='company logo'
        height={30}
        width={100}
        src='/logo.png'
      />
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Open Menu" className="cursor-pointer">
        <AppsIcon sx={{ 
          color: orange[600], 
          fontSize: 60, 
          transition: 'color 0.3s',
          '&:focus': {
            color: orange[800],
            outline: 'none',
            boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)',
            borderRadius: '10px',
          }
        }} 
        className='transition-colors' 
        tabIndex={0} 
        />
      </button>
  </div>
    {isOpen && (
      <div className='absolute left-0 w-full bg-white shadow-lg z-50 transition-transform transform translate-y-0 menu-content'>
        <div className='flex flex-col bg-orange-50'>
          { state.map(({ name, url }: { name: string, url: string}) => (
            <Link key={name} href={url} className={`${lusitana.className} pb-4 pt-4 pl-10 border-b text-xl text-gray-800 md:text-3xl md:leading-normal active:bg-orange-100 focus:bg-orange-100`}>{name}</Link>
          ))
          }
        </div>
      </div>
    )}
    </>
  );
}
