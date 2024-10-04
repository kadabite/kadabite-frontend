'use client';

import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, ExclamationCircleIcon, CheckCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import AcmeLogo from '@/app/ui/acme-logo';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { updatePassword } from '@/app/lib/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';

export default function UpdatePasswordPage() {
  const [data, formAction, isPending] = useActionState(
    updatePassword,
    undefined,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  useEffect(() => {
    if (data && data.ok) {
      // Redirect to a confirmation page or show a success message
      router.push('/dashboard');
    } else {
      console.log(data);
    }
  }, [data, router]);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-orange-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <form className="space-y-3" action={formAction}>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Update Password
            </h1>
            <p className="mb-4 text-sm text-gray-600">
              Enter your email address, the token you received, and your new password.
            </p>
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
              <input
                type="hidden"
                name="token"
                value={tokenFromUrl}
              />
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your new password"
                    required
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
                  Update Password <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </>
              )}
            </Button>
            <div className="flex justify-between items-center mt-4">
              <Link href="/login" className="text-sm text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
            <div className="flex h-8 items-end space-x-1">
              {data && data.ok && (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-green-500">Password updated successfully!</p>
                </>
              )}
              {data && !data.ok && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{data?.message}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
