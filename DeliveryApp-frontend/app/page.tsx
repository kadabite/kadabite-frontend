import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'
import ToggleMenu, { Navigation } from '@/app/ui/landing_page/ToggleMenu';
import Search from '@/app/ui/search';
import { Button } from '@/app/ui/button';

export default function Page() {

  return (
    <>
     {/* Desktop Navigation */}
    <Navigation />
    {/* Mobile Navigation */}
    <ToggleMenu />
    <Search placeholder='find desired food(s) / restaurant(s)'/>
    <main>
      <section aria-label="hero section" className='relative w-full p-10 bg-orange-50 shadow-md'>
        <div className='text-orange-900 w-full md:text-7xl text-4xl tracking-wide leading-relaxed'>Healthy Eating. <br/>Better Living.</div>
        <div className='text-gray-900 w-full text-xl tracking-wide leading-loose my-8'>
          Accomplish your goals with convenient, <br />
          healthy meals delivered to your door.
        </div>
        <div className='flex flex-row space-x-2'>
          <Button className='bg-orange-500'>Order Now</Button>
          <div className='mt-auto mb-auto'> -or- </div>
          <Button className='hover:bg-orange-400 focus-visible:outline-orange-500 active:bg-orange-600'>Find restaurant near you</Button>
        </div>
      </section>

      <section aria-label="how it works section" id='how_it_works'>
        <div id="headline"></div>
      </section>
      <section aria-label="Featured Restaurants or Dishes"></section>
      <section aria-label="Why Choose Us Section"></section>
      <section aria-label="Customer Testimonials:" id='success_stories'></section>
    </main>
    <footer id='contact'>taptap</footer>
    </>
    // <main className="flex min-h-screen flex-col p-6">
    //   <div className={styles.shape} />
    //   <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
    //     <AcmeLogo />
    //   </div>
      
    //   <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        
    //     <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
    //       <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black">
    //       </div>
    //       <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
    //         <strong>Welcome to Acme.</strong> This is the example for the{' '}
    //         <a href="https://nextjs.org/learn/" className="text-blue-500">
    //           Next.js Learn Course
    //         </a>
    //         , brought to you by Vercel.
    //       </p>
    //       <Link
    //         href="/login"
    //         className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
    //       >
    //         <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
    //       </Link>
    //     </div>
    //     <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
    //       {/* Add Hero Images Here */}
    //       <Image 
    //         src="/hero-desktop.png"
    //         width={1000}
    //         height={760}
    //         className='hidden md:block'
    //         alt='Screenshots of the dashboard project showing desktop version'
    //       />

    //       <Image
    //         src="/hero-mobile.png"
    //         width={560}
    //         height={620}
    //         className='block md:hidden'
    //         alt='Screenshots of the dashboard project showing mobile version'
    //       />
    //     </div>
    //   </div>
    // </main>
  );
}
