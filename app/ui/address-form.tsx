'use client';

import React, { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_STATES, GET_LGAS, GET_COUNTRIES } from '@/app/query/location.query';
import { HomeIcon } from '@heroicons/react/24/outline';

interface AddressFormProps {
  selectedCountry: string;
  selectedState: string;
  selectedLga: string;
  handleCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLgaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  selectedCountry,
  selectedState,
  selectedLga,
  handleCountryChange,
  handleStateChange,
  handleLgaChange,
}) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [getStates, { loading: loadingState, error:errorState, data: statesData }] = useLazyQuery(GET_STATES);
  const [getLgas, { loading: loadingLga, error: errorLga, data: lgasData }] = useLazyQuery(GET_LGAS);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  useEffect(() => {
    if (selectedCountry) {
      getStates({ variables: { country: selectedCountry } });
    }
  }, [selectedCountry, getStates]);

  useEffect(() => {
    if (selectedState) {
      getLgas({ variables: { state: selectedState } });
    }
  }, [selectedState, getLgas]);

  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            console.log('The request to get user location timed out.');
            break;
        }
      });
    }
  }, [latitude, longitude]);

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-xl">Address Information</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="address">
              Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="address"
                type="text"
                name="address"
                placeholder="Type your address"
              />
              <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        <div>
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="country">
            Country
          </label>
          <div className="relative">
            <select
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="country"
              name="country"
              value={selectedCountry}
              onChange={ handleCountryChange}
            >
              <option value="">Select a country</option>
              {loading ? (
                <option className="text-green-500">loading...</option>
              ) : (error || !data?.getCountries?.ok) ? (
                <option className="text-red-500">Unable to load countries now!</option>
              ) : null}
              {data?.getCountries?.countriesData?.map((country: any) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        {selectedCountry && (
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="state">
              State
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="state"
                name="state"
                value={selectedState}
                onChange={ handleStateChange }
              >
                <option value="">Select a state</option>
                {loadingState ? (
                  <option className="text-green-500">loading...</option>
                ) : (errorState || !statesData?.getStates?.ok) ? (
                  <option className="text-red-500" onClick={()=> getStates({ variables: { state: selectedCountry } })}>Error, Click to reload!</option>
                ) : null}
                {statesData?.getStates?.statesData?.map((state: any) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        )}
        {selectedState && (
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="lga">
              LGA
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="lga"
                name="lga"
                value={selectedLga}
                onChange={handleLgaChange}
              >
                <option value="">Select an LGA</option>
                {loadingLga ? (
                  <option className="text-green-500">loading...</option>
                ) : (errorLga || !lgasData?.getLgas?.ok) ? (
                  <option className="text-red-500" onClick={()=> getLgas({ variables: { state: selectedState } })}>error, click to reload!</option>
                ) : null}
                {lgasData?.getLgas?.lgasData?.map((lga: any) => (
                  <option key={lga.id} value={lga.name}>
                    {lga.name}
                  </option>
                ))}
              </select>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
        )}
        <div style={{ display: 'none' }}>
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="latitude">
            Latitude
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="latitude"
              type="text"
              name="latitude"
              readOnly
              hidden={true}
              value={latitude}
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="longitude">
            Longitude
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="longitude"
              type="text"
              name="longitude"
              readOnly
              hidden={true}
              value={longitude}
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
