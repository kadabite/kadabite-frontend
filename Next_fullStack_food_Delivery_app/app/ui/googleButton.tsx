'use client';

import { FcGoogle } from 'react-icons/fc'; // Google icon from react-icons
import clsx from 'clsx';
import { signIn } from 'next-auth/react';

interface GoogleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function GoogleButton({ className, ...rest }: GoogleButtonProps) {

  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-500 active:bg-gray-200',
        className,
      )}
      onClick={() => signIn('google')
      }
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Sign in with Google
    </button>
  );
}