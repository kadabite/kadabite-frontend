import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'
import ToggleMenu, { Navigation } from '@/app/ui/landing_page/ToggleMenu';
import Search from '@/app/ui/search';
import { Button } from '@/app/ui/button';
import Slidein from '@/app/ui/landing_page/slidein';
import { chooseUs, items, restaurant, testimonials } from '@/app/lib/utils';
import { blue, orange } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

export default function Page() {

  return (
    <>
     {/* Desktop Navigation */}
    <Navigation />
    {/* Mobile Navigation */}
    <ToggleMenu />
    <Search placeholder='find desired food(s), snack(s), fruit(s), drink(s), dessert(s), and more'/>
    <main className='pt-5 md:pt-0'>
      <section aria-labelledby="hero-heading" className='relative w-full p-12 bg-orange-50 shadow-md bg-[url("/landing_page/meal_mockup3.jpg")] bg-bottom bg-no-repeat bg-[length:100%_50%] md:bg-right md:bg-[length:65%_130%]'>
        <div className="sr-only" id="hero-heading">Healthy Meals Delivered to You</div>
        <h1 className='text-orange-900 w-full md:text-7xl text-4xl md:tracking-wide tracking-normal md:leading-relaxed leading-normal'>
          Healthy Eating. <br /> Better Living.
        </h1>
        <p className='text-gray-700 w-full md:max-w-sm md:text-xl text-sm md:tracking-wide leading-normal mb-10'>
          Achieve your health goals effortlessly with fresh, nutritious meals delivered straight to your doorstep.
        </p>
        <div className='flex md:flex-row flex-col md:space-x-2 items-center mb-20'>
          <Button className='bg-orange-500 text-white' aria-label="Order Now for Healthy Meals">Order Now</Button>
          <div className='mt-auto mb-auto text-gray-900 font-bold' aria-hidden="true"> - or - </div>
          <Button aria-label="Find Restaurants Near You">Find a Restaurant Near You</Button>
        </div>
      </section>

      <section aria-labelledby="how-it-works-heading" id="how_it_works" className="pt-10">
        <h2 id="how-it-works-heading" className="md:text-7xl text-3xl font-medium text-slate-900 text-center">
          <Slidein className=''> How it works</Slidein>
        </h2>
        <div className="w-full p-5 md:p-8 flex flex-col md:flex-row md:items-center">
          {items.map((item, idx) => (
            <div 
              className="flex flex-col md:w-1/3 w-full items-center justify-center p-6 rounded-xl cursor-pointer transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              key={idx}
              role="button" 
              tabIndex={0} 
              aria-label={`Learn more about ${item.header}`}
            >
              <p className="text-orange-900 text-2xl md:leading-normal mb-2">{item.header}</p>
              <Image
                src={`/landing_page/${item.name}`}
                width={300}
                height={300}
                alt={`Visual representation of ${item.header}`}
                className="rounded-xl shadow-md"
              />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="featured-restaurants-heading" className="w-full bg-orange-100 shadow-2xl" id="popular_restaurants">
        <h2 id="featured-restaurants-heading" className="md:text-7xl text-3xl font-medium text-slate-900 pt-10 text-center">
          <Slidein className=''>Popular Restaurants & Top Dishes</Slidein>
        </h2>
        <div className="w-full p-5 md:p-8 flex flex-col md:flex-row flex-wrap md:items-center">
          {restaurant.map((item, idx) => (
            <div 
              className="flex flex-col md:w-1/4 w-full justify-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              key={idx}
              tabIndex={0}
              aria-label={`Learn more about ${item.name}`}
            >
              <div className="shadow-lg rounded-xl p-5 bg-gray-50">
                <Link href={item.href} aria-label={`Order from ${item.name}`}>
                  <Image
                    src={`/landing_page/${item.image}`}
                    width={300}
                    height={200}
                    alt={`Image of popular dish at ${item.name}`}
                    className="rounded-t-xl cursor-pointer"
                  />
                </Link>
                <h3 className="text-xl text-slate-900 md:leading-normal pt-3 pb-3">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500 md:leading-normal">
                  {item.briefDescription}
                </p>
                <div className="flex flex-row justify-center p-5">
                  <Button className="bg-orange-500" aria-label={`Order from ${item.name}`}>Order from here</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="why-choose-us-heading" className="w-full bg-slate-100 shadow-2xl" id="why_choose_us">
        <h2 id="why-choose-us-heading" className="md:text-7xl text-3xl font-medium text-orange-900 pt-10 text-center">
          <Slidein className=''>Why Choose Us</Slidein>
        </h2>
        <div className="w-full p-5 md:p-8 flex flex-col md:flex-row flex-wrap md:items-center">
          {chooseUs.map((item, idx) => (
            <div 
              className="flex flex-col md:w-1/4 w-full justify-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              key={idx}
              tabIndex={0}
              aria-label={`Learn more about why you should choose us for ${item.header}`}
            >
              <div className="shadow-lg rounded-xl p-5 bg-gray-50 flex flex-col items-center">
                <div className="text-center">
                  <item.icon 
                    sx={{ fontSize: 50, color: orange[900] }} 
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl text-blue-900 md:leading-normal pt-3 pb-3 text-center">
                  {item.header}
                </h3>
                <p className="text-sm text-blue-500 md:leading-normal text-center">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Register business owners who sell any kind of food products"></section>

      <section aria-labelledby="customer-testimonials-heading" id="success_stories" className="w-full bg-blue-100 shadow-lg">
        <h2 id="customer-testimonials-heading" className="md:text-5xl text-lg font-medium text-blue-900 pt-10 text-center">
          <Slidein className=''>See What Our Customers Are Saying</Slidein>
        </h2>
        <div className="w-full p-5 md:p-8 flex flex-col md:flex-row flex-wrap md:items-center">
          {testimonials.map((item, idx) => (
            <div 
              className="flex flex-col md:w-1/3 w-full justify-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
              key={idx}
              tabIndex={0}
              aria-label={`Customer testimonial from ${item.name}`}
            >
              <div className="shadow-lg rounded-xl p-5 bg-gray-50 flex flex-col items-center">
                <div className="text-center">
                  <Image
                    src={item.image}
                    width={300}
                    height={300}
                    alt={item.altText}
                    className="rounded-t-xl"
                  />
                </div>
                <blockquote className="text-sm text-gray-600 md:leading-normal text-center pt-3" aria-labelledby={`testimonial-${idx}`}>
                  {item.message}
                </blockquote>
                <footer className="text-xs text-gray-500 mt-2 text-center">
                  - {item.name}, {item.location}
                </footer>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>

    <section aria-labelledby="download-app-heading" className="w-full bg-gray-100 p-8">
      <h3 id="download-app-heading" className="text-center text-2xl font-semibold text-orange-800 mb-6">
        <Link href="/" className="text-blue-700 hover:underline">Download Our App</Link> on iOS or Android
      </h3>
      <div className="flex flex-col items-center text-gray-900 md:text-xl text-sm md:tracking-wide leading-normal mb-10">
        <div className="flex flex-row flex-wrap w-full justify-around p-7 md:text-lg text-sm">
          <Button 
            className="bg-gray-700 text-white m-3 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-200"
            aria-label="Sign up for our service"
          >
            Sign Up
          </Button>
          <Button 
            className="bg-orange-600 text-white m-3 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-200"
            aria-label="Order now"
          >
            Order Now
          </Button>
          <Button 
            className="bg-gray-700 text-white m-3 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-200"
            aria-label="Find restaurants near you"
          >
            Find Your Restaurants
          </Button>
          <Button 
            className="bg-orange-600 text-white m-3 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-200"
            aria-label="Explore the market"
          >
            Explore the Market
          </Button>
        </div>
      </div>
    </section>
    <footer id="contact" aria-labelledby="footer-heading" className='w-full bg-orange-700 shadow-2xl flex flex-col md:flex-row p-5 pb-16'>
      <h2 id="footer-heading" className="sr-only">Footer Navigation</h2>
      <div className='w-full md:w-3/4 flex flex-col md:flex-row justify-around items-center'>
        <div className='flex flex-col text-slate-50'>
          <Typography sx={{ mt: 2, color: "black", fontSize: 20 }}>Important Pages</Typography>
          <Link href='/' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to home page">home page</Link>
          <Link href='/about' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to about page">about page</Link>
          <Link href='/app' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to app page">app page</Link>
          <Link href='/marketplace' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to marketplace">market place</Link>
        </div>

        <div className='flex flex-col text-slate-50'>
          <Typography sx={{ mt: 2, color: "black", fontSize: 20 }}>Important Pages</Typography>
          <Link href='/' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to home page">home page</Link>
          <Link href='/about' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to about page">about page</Link>
          <Link href='/app' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to app page">app page</Link>
          <Link href='/marketplace' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to marketplace">market place</Link>
        </div>

        <div className='flex flex-col text-slate-50'>
          <Typography sx={{ mt: 2, color: "black", fontSize: 20 }}>Important Pages</Typography>
          <Link href='/' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to home page">home page</Link>
          <Link href='/about' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to about page">about page</Link>
          <Link href='/app' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to app page">app page</Link>
          <Link href='/marketplace' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to marketplace">market place</Link>
        </div>
      </div>
      <div className="w-full md:w-1/4 flex flex-col justify-around">
        <div>
          <label
            className="mb-3 mt-5 block text-lg font-medium text-slate-50"
            htmlFor="email">
            Subscribe to our Newsletter
          </label>
          <div className="relative mt-2 mb-3">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Subscribe by entering your email"
              required
              aria-required="true"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <Button className='rounded-md' aria-label="Submit email subscription">Submit</Button>
        </div>
      </div>
    </footer>
  </>
  );
}

