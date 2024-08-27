import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'
import { Button } from '@/app/ui/button';
import Nav from '@/app/ui/landing_page/nav';
import ToggleMenu from './ui/landing_page/ToggleMenu';

export default function Page() {

  return (
    <>
     {/* Desktop Navigation */}
    <nav aria-label="header section" className='hidden md:flex flex-row justify-between shadow-md min-h-4 items-center p-4 bg-gray-50'>
      <Image 
        alt='company logo'
        height={30}
        width={70}
        src='/logo.png'
        className='cursor-pointer transition-transform transform hover:scale-105'
      />
      <div className='flex flex-row xl:space-x-10'>
        <Nav url='/'>Home</Nav>
        <Nav url='/#about_us'>About Us</Nav>
        <Nav url='/'>Our foods</Nav>
        <Nav url='/#how_it_works'>How it works</Nav>
        <Nav url='/#success_stories'>Success Stories</Nav>
        <Nav url='/#contact'>Contact</Nav>
      </div>

      <div className='flex flex-row space-x-2'>
        <Button className='bg-orange-500'>Sign Up</Button>
        <div className='mt-auto mb-auto'> -or- </div>
        <Button className='hover:bg-orange-400 focus-visible:outline-orange-500 active:bg-orange-600'>Login</Button>
      </div>
    </nav>
      {/* Mobile Icon */}
        <ToggleMenu />
      {/* Mobile Navigation */}
      <nav>
      </nav> 
    
    <main>
      <section aria-label="hero section">
        <div>Cadatech</div>
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
