'use client';

import { useState, useEffect, useActionState } from 'react';
import { Button } from '@/app/ui/button';
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Typography } from '@mui/material';
import { waitlist } from '@/app/lib/actions';
import AddressForm from '@/app/ui/address-form';
import { useQuery } from '@apollo/client';
import { GET_WAITLIST } from '@/app/query/user.query';
import Loading from '@/app/ui/loading';
import { AtSymbolIcon } from '@heroicons/react/20/solid';

export default function WaitlistPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [email, setEmail] = useState('');

  const [wait, setWait] = useState([]);

  const [data, formAction, isPending] = useActionState(
    waitlist,
    undefined
  );

  const { loading, error, data: waitList } = useQuery(GET_WAITLIST);

  if (error) {
    console.log(error);
  }
  useEffect(() => {
    if (waitList) {
      setWait(waitList.getWaitList.waitListData);
    }
  }, [waitList]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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

  return (
    <>
      <main className='pt-5 md:pt-0'>
        <section className='relative w-full p-12 bg-orange-50 shadow-md'>
          <Typography variant="h4" className='text-orange-900'>Join Our Waitlist</Typography>
          <form className="space-y-3 items-center w-full" action={formAction}>
            <div className="flex flex-col">
              <div>
                <div className='relative'>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className='peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
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
                  Join Waitlist <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </>
              )}
            </Button>
          </div>
          <div className="flex h-8 items-end space-x-1">
            {data && (!data?.ok ? (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{data.message}</p>
              </>
            ) : <p className="text-sm text-green-500">{data.message}</p>)}
          </div>
        </div>
      </form>
    </section>

    <section className='relative w-full p-12 bg-slate-100 shadow-md'>
      <Typography variant="h5" className='text-gray-700'>Current Waitlist</Typography>
      {loading ? <Loading /> : (
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>Email</th>
              <th className='py-2 px-4 border-b'>LGA</th>
              <th className='py-2 px-4 border-b'>State</th>
              <th className='py-2 px-4 border-b'>Country</th>
              <th className='py-2 px-4 border-b'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {wait.map((user: any, index) => (
              <tr key={index}>
                <td className='py-2 px-4 border-b'>{user?.email}</td>
                <td className='py-2 px-4 border-b'>{user?.lga}</td>
                <td className='py-2 px-4 border-b'>{user?.state}</td>
                <td className='py-2 px-4 border-b'>{user?.country}</td>
                <td className='py-2 px-4 border-b'>{new Date(user?.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  </main>
</>
  );
}