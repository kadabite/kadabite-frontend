import Image from 'next/image'
import Link from 'next/link';
import clsx from 'clsx';

export default function Imagetext({children, imageUrl, ariaLabelledby, className} : {
    children: React.ReactNode,
    imageUrl: string,
    ariaLabelledby: string,
    className: string
    }) {
    return (
        <section aria-labelledby={ariaLabelledby} className={clsx(
            'flex md:flex-row flex-col md:space-x-14 md:space-y-5 space-y-10 md:p-10 p-5 w-full',
            className
            )}>
            {children}
            <Image 
                width={500}
                height={500}
                alt='Visual representation of the solution'
                src={imageUrl}
            />
        </section>
    )
} 