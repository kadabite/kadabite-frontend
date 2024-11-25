'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { subscribe } from '@/app/lib/actions';

export default function NewsletterForm() {
    const [data, formAction, isPending] = useActionState(
			subscribe,
			undefined,
    );

    return (
			<form className="space-y-3 items-center w-full" action={formAction}>
				<div className="flex md:flex-row flex-col md:space-x-5 md:space-y-0 space-y-5 text-center md:items-center items-left w-full rounded-lg">
					<div>		
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
					<Button className="rounded-lg" aria-disabled={isPending}>
						Join Now <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
					</Button>
					<div className="flex items-end space-x-1">
						{data && (!data?.ok ? (
							<>
								<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
								<p className="text-sm text-red-500">{data.message}</p>
							</>
						): <p className="text-sm text-green-500">{data.message}</p>)}
					</div>
				</div>
		</form>
    );
}