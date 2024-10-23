'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { AtSymbolIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/lib/actions';
import AddressForm from '@/app/ui/address-form';
import { GET_USERS_DATA } from '@/app/query/user.query';
import { useQuery } from '@apollo/client';
import Cookies from 'js-cookie';

export default function RegisterForm() {
  const [data, formAction, isPending] = useActionState(registerUser, undefined);
  const [userType, setUserType] = useState('buyer');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const {loading, error, data:userData } = useQuery(GET_USERS_DATA);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedLga('');
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedLga('');
  };

  const handleLgaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLga(e.target.value);
  };

  const router = useRouter();

  useEffect(() => {

    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setToken(storedToken);
    }

    if (userData) {
      setEmail(userData.user.userData.email);
      setUsername(userData.user.userData.username);
      setPhoneNumber(userData.user.userData.phoneNumber);
    }
    if (data && data.ok) {
      router.push('/login');
    }
  }, [data, router, userData]);

  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Register account</h1>
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
                value={username}
                onChange={handleUsernameChange}
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
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter your phone number"
                required
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div style={{ display: 'none' }}>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="token"
                type="text"
                name="token"
                hidden={true}
                readOnly
                value={token}
              />
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
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>

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

        {/* Address Section */}
        <AddressForm
          selectedCountry={selectedCountry}
          selectedState={selectedState}
          selectedLga={selectedLga}
          handleCountryChange={handleCountryChange}
          handleStateChange={handleStateChange}
          handleLgaChange={handleLgaChange}
        />

        <div className="flex justify-center mt-4">
          <Button className="w-full md:w-1/3 bg-orange-500 flex justify-center items-center" aria-disabled={isPending}>
            {isPending ? (
              <CircularProgress size={24} className="text-gray-50" />
            ) : (
              <>
                Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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
