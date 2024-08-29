'use client';

import { use, useEffect, useState } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import { orange } from '@mui/material/colors';
import Image from 'next/image'
import Link from 'next/link';
import { navItems } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import clsx from 'clsx';

export default function ToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, setState] = useState(navItems);

  // manage the state for login and logout
  useEffect(()=> {
    if (!isLoggedIn) {
      setState((prevValue) => [...prevValue.filter(({ name }) => name !== 'Login'), { name: 'Login', url: '/login' }]);
    } else setState((prevValue) => [...prevValue.filter(({ name }) => name !== 'Logout'), { name: 'Logout', url: '/logout' }]);
  }, [isLoggedIn])

  return (
    <>
    <div className='md:hidden bg-gray-50 flex flex-row justify-between shadow-md h-15 px-3 w-full overflow-x-hidden relative'>
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
    
    <div className={`absolute left-0 w-full bg-white shadow-lg z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='flex flex-col bg-orange-50'>
        { state.map(({ name, url }: { name: string, url: string}) => (
          <Link onClick={() => setIsOpen(!isOpen)} key={name} href={url} className={`${lusitana.className} pb-4 pt-4 pl-10 border-b text-xl text-gray-800 md:text-3xl md:leading-normal active:bg-orange-100 focus:bg-orange-100`}>{name}</Link>
        ))}
      </div>
    </div>
    <style jsx>{`
      .menu-content {
        transition: transform 0.3s ease-in-out;
      }
    `}</style>
    </>
  );
}

export function Navigation() {
  
  const [hash, setHash] = useState(0);

  useEffect(() => {
    const location = window.location.hash;
    const index = navItems.findIndex(({ url }) => url === `/${location}`);
    if (index !== -1) setHash(index);
  }, [])

  return (
    <>
    <nav aria-label="header section" className='hidden md:flex flex-row justify-between shadow-md h-20 items-center p-4 bg-gray-50 fixed z-50 left-0 top-0 w-full '>
      <Image 
        alt='company logo'
        height={30}
        width={70}
        src='/logo.png'
        className='cursor-pointer transition-transform transform hover:scale-105'
      />
      <div className='flex flex-row xl:space-x-10'>
        { navItems.map(({ name, url }: { name: string, url: string}, index) => (
              <Link onClick={() => setHash(index)} key={name} href={url} className={clsx(
                `${lusitana.className} text-gray-800 md:leading-normal flex items-center gap-5 p-2 self-start rounded-md font-medium hover:text-white transition-colors hover:bg-orange-400`,
                hash === index ? 'text-white bg-orange-400' : '')
              }>
                {name}
              </Link>
            ))
          }
      </div>

      <div className='flex flex-row space-x-2'>
        <Button className='bg-orange-500'>Sign Up</Button>
        <div className='mt-auto mb-auto'> -or- </div>
        <Button className='hover:bg-orange-400 focus-visible:outline-orange-500 active:bg-orange-600'>Login</Button>
      </div>
    </nav>
    <div className="h-20 w-full hidden md:flex flex-row"></div>
    </>
  );
}
