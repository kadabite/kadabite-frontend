'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import React, { useActionState, useState, useEffect } from 'react';
import { getPasswordValidationMessage } from '@/app/lib/utils';
import clsx from 'clsx';
import { ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import CircularProgress from '@mui/material/CircularProgress';
import { AtSymbolIcon, KeyIcon} from '@heroicons/react/24/outline';
import { signUpUser } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [data, formAction, isPending] = useActionState(signUpUser, undefined);
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (repeatPassword !== newPassword) setPasswordError('Passwords do not match');
    else setPasswordError('Password has matched!');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#^%*?&])[A-Za-z\d@$!%#^*?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordValidationError(getPasswordValidationMessage(newPassword));
    } else {
      setPasswordValidationError('Password is strong.');
    }
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('Password has matched!');
    }
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push('/login');
    }
  }, [data, router]);


  return (
    <main className="flex items-center justify-center">
    <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4">
      <div className="flex h-20 w-full items-end rounded-lg bg-orange-500 p-3 md:h-36">
        <div className="w-32 text-white md:w-36">
            <AcmeLogo />
        </div>
      </div>

      <form className="space-y-3" action={formAction}>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className="mb-3 text-2xl">SignUp</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3"></div>
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
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
                value={password}
                onChange={handlePasswordChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {passwordValidationError && (
              <p className={clsx("text-sm", {
                "text-red-500": passwordValidationError !== 'Password is strong.',
                "text-green-500": passwordValidationError === 'Password is strong.'
              })}>
                {passwordValidationError}
              </p>
            )}
          </div>
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="repeatPassword">
              Repeat Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="repeatPassword"
                type="password"
                name="repeatPassword"
                placeholder="Repeat password"
                required
                minLength={6}
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {passwordError && <p className={clsx("text-sm ", {
              "text-red-500": passwordError === "Passwords do not match",
              "text-green-500": passwordError === "Password has matched!"
              })}>{passwordError}</p>}
          </div>

          <div className="flex justify-center mt-4">
          <Button className="w-full md:w-1/3 bg-orange-500 flex justify-center items-center" aria-disabled={isPending}>
            {isPending ? (
              <CircularProgress size={24} className="text-gray-50" />
            ) : (
              <>
                SignUp <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
              </>
            )}
          </Button>
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
    </div>
  </main>
    );
    }