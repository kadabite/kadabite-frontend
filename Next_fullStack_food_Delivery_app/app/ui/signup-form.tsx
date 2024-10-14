'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { AtSymbolIcon, KeyIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { signUpUser } from '@/app/lib/actions';
import { getPasswordValidationMessage } from '@/app/lib/utils';
import clsx from 'clsx';

export default function SignupForm() {
  const [data, formAction, isPending] = useActionState(signUpUser, undefined);
  const [userType, setUserType] = useState('buyer');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  };

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

  const router = useRouter();
  
  useEffect(() => {
    if (data && data.ok) {
      router.push('/login');
    }
  }, [data, router]);

  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Create an account</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="firstName">
              First Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="lastName">
              Last Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
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
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="phoneNumber">
              Phone Number
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                required
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="lgaId">
              LGA ID
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="lgaId"
                type="text"
                name="lgaId"
                placeholder="Enter your LGA ID"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="userType">
              User Type
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="userType"
                name="userType"
                value={userType}
                onChange={handleUserTypeChange}
                required
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="dispatcher">Dispatcher</option>
              </select>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {userType === 'dispatcher' && (
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="vehicleNumber">
                Vehicle Number
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="vehicleNumber"
                  type="text"
                  name="vehicleNumber"
                  placeholder="Enter your vehicle number"
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button className="w-full md:w-1/3 bg-orange-500 flex justify-center items-center" aria-disabled={isPending}>
            {isPending ? (
              <CircularProgress size={24} className="text-gray-50" />
            ) : (
              <>
                Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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
  );
}
