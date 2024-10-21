'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import React, { useActionState, useEffect, useState } from 'react';
import { getPasswordValidationMessage } from '@/app/lib/utils';
import clsx from 'clsx';
import { AtSymbolIcon, KeyIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { signUpUser } from '@/app/lib/actions';

export default function SignUpPage() {
  const [data, formAction, isPending] = useActionState(signUpUser, undefined);
  const [passwordError, setPasswordError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (repeatPassword !== newPassword) setPasswordError('Passwords do not match');
    else setPasswordError('Password has matched!');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
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
          <h1 className="mb-3 text-2xl">Register account</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3"></div>
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
        </div>
      </form>
    </div>
  </main>
    );
    }