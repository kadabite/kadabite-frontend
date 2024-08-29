'use client';

import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import CircularProgress from '@mui/material/CircularProgress';
import { orange } from '@mui/material/colors';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(searchParams.get('query')?.toString() || '');

  // Debounce the search input so that it is only called after the user stops typing
  const handleSearch = useDebouncedCallback((term) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
      setState(true);
      setInputValue(term);
    } else {
      params.delete('query');
      setInputValue('')
      setState(false);
    }
    replace(`${pathname}?${params.toString()}`);
    // setLoading(false);
  }, 300);

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0 ml-5 mr-5 mt-5">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        {inputValue && (
          <XCircleIcon
            className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-800 cursor-pointer"
            onClick={() => handleSearch('')}
          />
        )}
      </div>
      {state && (
        <div className="absolute translate-y-1 flex flex-row items-center mx-auto pl-5 pr-5 h-14 w-full flex flex-row rounded-md border border-gray-200 text-sm outline-2 bg-white z-50">
          {loading ? (
              <CircularProgress sx={{ 
                color: orange[600],
                fontSize: 30,
                marginLeft:'auto',
                marginRight:'auto'
              }}/>
          ) : (
            <div>
              {/* Your search results will go here */}
            </div>
          )}
        </div>
      )}
      <div className="h-5 w-full hidden md:flex flex-row relative"></div>
    </>
  );
}