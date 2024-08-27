'use client';

import { useState } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import { orange } from '@mui/material/colors';
import Image from 'next/image'
import Link from 'next/link';

export default function ToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className='flex flex-col pl-10 pt-4 space-y-3 bg-orange-50'>
            <Link href='/' className='pb-2 border-b'>Home</Link>
            <Link href='/' className='pb-2 border-b'>About Us</Link>
            <Link href='/' className='pb-2 border-b'>Our foods</Link>
            <Link href='/' className='pb-2 border-b'>How it works</Link>
            <Link href='/' className='pb-2 border-b'>Success stories</Link>
            <Link href='/' className='pb-2 border-b'>Contact</Link>
            <Link href='/' className='pb-2 border-b'>Login</Link>
            <Link href='/' className='pb-2 border-b'>Logout</Link>
          </div>
        </div>
      )}
  
    </>
  );
}
