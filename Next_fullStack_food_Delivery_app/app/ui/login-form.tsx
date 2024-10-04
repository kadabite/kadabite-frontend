'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { authenticate } from '@/app/lib/actions';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';

export default function LoginForm() {
  const [data, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const router = useRouter();

  useEffect(() => {
    if (data && data.token) {
      // remove old cookies
      Cookies.remove('authToken');
      // Store the token in a cookie
      Cookies.set('authToken', data.token, { expires: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN), sameSite: 'strict', secure: true });

      localStorage.setItem('refreshToken', data.refreshToken);
      // Redirect to a protected page
      router.push('/dashboard');
    } else {
      console.log(data);
    }
  }, [data, router]);

  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full bg-orange-500 flex justify-center items-center" aria-disabled={isPending}>
          {isPending ? (
            <CircularProgress size={24} className="text-gray-50" />
          ) : (
            <>
              Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </>
          )}
        </Button>
        <div className="flex justify-between items-center mt-4">
          <Link href="/forgotPassword" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="flex h-8 items-end space-x-1">
          {data && (!data?.ok && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{data?.message}</p>
            </>
          ))}
        </div>
      </div>
    </form>
  );
}