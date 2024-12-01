import Link from 'next/link';
import Image from 'next/image'
import ToggleMenu, { Navigation } from '@/app/ui/landing_page/ToggleMenu';
import Search from '@/app/ui/search';
import { Button } from '@/app/ui/button';
import { team, testimonials, connect, connect2 } from '@/app/lib/utils';
import { orange } from '@mui/material/colors';
import { Typography } from '@mui/material';
import Imagetext from '@/app/ui/image-text'
import AddchartIcon from '@mui/icons-material/Addchart';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import Carousel from '@/app/ui/landing_page/carausel';
import NewsletterForm from '@/app/ui/newsletterForm';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchSkeleton } from '@/app/ui/skeletons';
 
export const metadata: Metadata = {
  title: 'Food Delivery',
};

export default function Page() {
  const placeholder='find desired food(s), snack(s), fruit(s), drink(s), dessert(s), and more';
  return (
    <>
     {/* Desktop Navigation */}
    <Navigation />
    {/* Mobile Navigation */}
    <ToggleMenu />
    <Suspense fallback={<SearchSkeleton placeholder={placeholder} />}>
      <Search placeholder={placeholder}/>
    </Suspense>
    <main className='pt-5 md:pt-0'>
      <section aria-labelledby="hero-heading" className='relative w-full p-12 bg-orange-50 shadow-md md:bg-[url("/landing_page/meal_mockup3.jpg")] bg-bottom bg-no-repeat md:bg-right md:bg-[length:65%_130%]'>
        <div className="sr-only" id="hero-heading">Healthy Meals Delivered to You</div>
        <h1 className='pt-5 text-orange-900 md:w-1/2 w-full md:text-6xl text-3xl md:tracking-wide tracking-normal md:leading-tight leading-normal font-semibold'>
          Experience Seamless Food Delivery with Kadabite
        </h1>
        <p className='text-gray-900 w-full md:max-w-sm md:text-lg text-sm md:tracking-wide leading-normal mb-10'>
            At Kadabites, we revolutionize your food ordering experience by connecting you with local
            restaurants and vendors effortlessly. With Kadabite, enjoy quick access to a diverse range of
            delicious meals delivered right to your doorstep.
        </p>
        <Image 
          width={500}
          height={500}
          className='rounded-lg md:hidden mb-5'
          alt='Visual representation of the solution'
          src='/landing_page/meal_mockup3.jpg'
        />
        <div className='flex flex-row space-x-2 items-center mb-20'>
        <Link href='/order'>
          <Button className='bg-orange-500 text-white rounded-lg' aria-label="Order Now for Healthy Meals">Order</Button>
        </Link>
        <Link href='/learn-more'>
          <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
        </Link>
        </div>
      </section>

      <Imagetext ariaLabelledby='feature_section' imageUrl='/landing_page/meal_mockup3.jpg' className='bg-slate-100'>
        <div className='md:w-1/2 w-full flex flex-col justify-center space-y-2' id='feature_section'>
          <h2 className='md:text-5xl text-2xl text-gray-700 font-semibold'>Empowering Restaurants: Reach More Customers
            with Our Comprehensive Delivery solution
          </h2>
          <p className='text-gray-800 md:text-lg text-sm'>
            Our end-to-end solution allows restaurants and food sellers to effortlessly connect with
            a wider audience. Experience increased visibility and sales while providing your customers
            with a seamless ordering experience.
          </p>
        </div>
      </Imagetext>

      <section className='relative md:p-28 p-7 space-y-7 flex flex-col justify-center items-center bg-gradient-to-l from-blue-300 to-orange-200 w-full'>
        <h1 className='md:w-1/2 w-full text-center md:text-5xl text-2xl text-orange-900 font-semibold'>
          Savor the Flavor, Delivered to Your Door
        </h1>
        <p className='md:w-1/2 w-full text-center text-slate-700 text-md'>At Kadabites, we connect you with your favorite local restaurants and food vendors,
          making ordering food a breeze. Experience the convenience of our Kadabite and enjoy delicious
          meals delivered right to you.
        </p>
        <div className='flex flex-row space-x-5'>
          <Link href='/download'>
            <Button className='bg-orange-500 text-white rounded-lg' aria-label="Download the app">Download</Button>
          </Link>
          <Link href='/learn-more'>
            <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
          </Link>
        </div>
      </section>

      <Imagetext ariaLabelledby='feature_section_app' imageUrl='/landing_page/meal_mockup3.jpg' className='bg-orange-200'>
        <div className='md:w-1/2 w-full flex flex-col justify-center space-y-4' id='feature_section_app'>
          <AddchartIcon 
            sx={{ fontSize: 50, color: orange[900] }} 
            aria-hidden="true"
          />
          <h2 className='md:text-5xl text-2xl text-gray-700 font-semibold'>
            Experience Effortless Food Ordering with Kadabite
          </h2>
          <p className='text-slate-900 text-md'>
            Kadabite revolutionizes the way you order food, offering a smooth and intuitive interface
            that makes your cravings just a few taps away.
            Enjoy a diverse selection of local vendors and restaurants, all delivered right
             to your doorstep with unmatched convenience.
          </p>
          <div className='flex flex-row space-x-5'>
            <Link href='/order'>
              <Button className='bg-orange-500 text-white rounded-lg' aria-label="Order Now for Healthy Meals">Order</Button>
            </Link>
            <Link href='/learn-more'>
              <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
            </Link>
            </div>
        </div>
      </Imagetext>

      <Imagetext ariaLabelledby='feature_section_access' imageUrl='/landing_page/meal_mockup3.jpg' className=''>
        <div className='md:w-1/2 w-full flex flex-col justify-center space-y-7' id='feature_section_access'>
          <h2 className='md:text-5xl text-2xl text-gray-700 font-semibold'>
            Experience Effortless Food Ordering with Kadabite's User-Friendly Platform
          </h2>
          <p className='text-slate-900 text-md'>
            With Kadabite, ordering your favourite meals is just a few taps away.
            Enjoy a hassle-free process that connects you directly to local restaurants and food
            vendors.
          </p>

          <div className='flex md:flex-row flex-col md:space-x-5 md:space-y-0 space-y-4'>
            <div className='flex flex-col space-y-2 shadow-lg bg-blue-100 p-3 rounded-md h-full'>
              <AcUnitIcon 
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <h3 className='font-semibold text-lg text-orange-900'> Easy Access</h3>
              <p className='text-sm text-slate-900'>Browse menus, customize orders, and track deliveries all in one place.</p>
            </div>
            <div className='flex flex-col space-y-2 shadow-lg bg-blue-100 p-3 rounded-md h-full'>
              <AddShoppingCartIcon 
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <h3 className='font-semibold text-lg text-orange-900'>Quick Delivery</h3>
              <p className='text-sm text-slate-900'>Our efficient dispatch riders ensure your food arrives hot and fresh every time.</p>
            </div>
          </div>
        </div>
      </Imagetext>

      <Imagetext ariaLabelledby='feature_section_dispatcher' imageUrl='/landing_page/meal_mockup3.jpg' className='bg-blue-100'>
        <div className='md:w-1/2 w-full flex flex-col justify-center space-y-7' id='feature_section_dispatcher'>
          <h2 className='md:text-5xl text-2xl text-gray-700 font-semibold'>
            Empowering Dispatch Riders for Flexible Work and Efficient Deliveries
          </h2>
          <p className='text-slate-900 text-md'>
            Our Platform seamlessly integrates dispatch riders, providing them with
            flexible job opportunities that fit their schedules. This not only enhances their earnings
            potential but also ensures timely and efficient delivery for our customers
          </p>

          <div className='flex flex-col space-y-4'>
            <div className='flex flex-row space-x-2 w-full items-center'>
              <AssuredWorkloadIcon
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <p className='text-sm text-slate-900'>Flexible schedules for riders to maximize their earnings.</p>
            </div>
            <div className='flex flex-row space-x-2 w-full items-center'>
              <AddModeratorIcon 
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <p className='text-sm text-slate-900'>Streamlined delivery process for a better customer experience.</p>
            </div>
            <div className='flex flex-row space-x-2 w-full items-center'>
              <ApartmentIcon 
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <p className='text-sm text-slate-900'>Join our team and enjoy work-life balance.</p>
            </div>
          </div>
        </div>
      </Imagetext>

      <section aria-labelledby='discovery' className='md:p-10 p-5 space-y-10 bg-orange-200'>
        <div className='flex md:flex-row flex-col md:space-x-10 md:space-y-0 space-y-5'>
          <h1 className='md:text-4xl text-2xl text-orange-700 font-semibold md:w-1/2 w-full md:tracking-wide tracking-normal md:leading-tight leading-normal' id='discovery'>
            Discover the Best Local Restaurants and Enjoy Seamless Food Delivery
          </h1>
          <p className='self-center text-slate-500 font-bold text-md md:w-1/2 w-full tracking-wide md:leading-snug leading-normal'>
            At Kadabites, we make it easy to find your favorite local eateries.
            Our platform allows you to explore variety of restaurants and cuisines right
            at your fingertips. Enjoy a hassle-free ordering experience that brings
            delicious meals straight to your door.
          </p>
        </div>

        <div className='flex md:flex-row flex-col md:space-x-5 md:space-y-0 space-y-10'>
          <div className='flex flex-col space-y-2 justify-between shadow-lg p-3 rounded-xl'>
            <AcUnitIcon 
              sx={{ fontSize: 25, color: orange[900] }} 
              aria-hidden="true"
            />
            <h3 className='font-semibold text-lg text-slate-700'> Effortless Ordering Experience with Just a Few Clicks</h3>
            <p className='text-sm text-slate-900'>
              Place your order in seconds and track it in real time.
            </p>
            <Link href='/' className='text-slate-700 hover:text-orange-900 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>Order &nbsp; &gt;</Link>
          </div>
          <div className='flex flex-col space-y-2 justify-between shadow-lg p-3 rounded-xl'>
            <AddShoppingCartIcon 
              sx={{ fontSize: 25, color: orange[900] }} 
              aria-hidden="true"
            />
            <h3 className='font-semibold text-lg text-slate-700'>
              Stay Updated with Real-Time Tracking of Your Deliveries
            </h3>
            <p className='text-sm text-slate-900'>
              Know exactly when your food will arrive with our live tracking feature.
            </p>
            <Link href='/' className='text-slate-700 hover:text-orange-900 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
              Track &nbsp; &gt;
            </Link>

          </div>
          <div className='flex flex-col space-y-2 justify-between shadow-lg p-3 rounded-xl'>
            <AddShoppingCartIcon 
              sx={{ fontSize: 25, color: orange[900] }} 
              aria-hidden="true"
            />
            <h3 className='font-semibold text-lg text-slate-700'>
              Join Our community of Food Lovers and Delivery Experts
            </h3>
            <p className='text-sm text-slate-900'>
              Become part of a vibrant network that supports local food vendors.
            </p>
            <Link href='/' className='text-slate-700 hover:text-orange-900 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
              Join &nbsp; &gt;
            </Link>
          </div>
        </div>
      </section>

      <Imagetext ariaLabelledby='hero_section_app' imageUrl='/landing_page/meal_mockup3.jpg' className='bg-orange-50'>
        <div className='md:w-1/2 w-full flex flex-col justify-center space-y-4' id='hero_section_app'>
          <h2 className='md:text-5xl text-2xl text-gray-700 font-semibold'>
            Savor the Best Local Flavors Delivered Fast
          </h2>
          <p className='text-slate-900 text-md'>
            Discover a world of culinary delights at your fingertips with Kadabite. 
            We connect you with local restaurants and food vendors for a seamless ordering experience.
          </p>
          <div className='flex flex-row space-x-5'>
            <Link href='/order'>
              <Button className='bg-orange-500 text-white rounded-lg' aria-label="Order Now for Healthy Meals">Order</Button>
            </Link>
            <Link href='/learn-more'>
              <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
            </Link>
          </div>
        </div>
      </Imagetext>

      <Imagetext ariaLabelledby='feature_section_dispatcher' imageUrl='/landing_page/meal_mockup3.jpg' className='bg-orange-100'>
        <div className='md:w-1/2 w-full flex flex-col justify-center space-y-7' id='feature_section_dispatcher'>
          <p className='text-sm text-orange-900'>Benefits</p>
          <h2 className='md:text-5xl text-2xl text-gray-700 font-semibold'>
            Unlocking Opportunities for Everyone Involved
          </h2>
          <p className='text-slate-900 text-md'>
            Our Platform empowers customers with a diverse selection of food options,
            ensuring convenience and satisfaction. Vendors gain increased visibility and sales,
            while dispatch riders enjoy flexible work opportunities.
          </p>

          <div className='flex flex-col space-y-4'>
            <div className='flex flex-row space-x-2 w-full items-center'>
              <AssuredWorkloadIcon
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <p className='text-sm text-slate-700'>Convenient food delivery at your fingertips.</p>
            </div>
            <div className='flex flex-row space-x-2 w-full items-center'>
              <AddModeratorIcon 
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <p className='text-sm text-slate-700'>Expand your reach and grow your business.</p>
            </div>
            <div className='flex flex-row space-x-2 w-full items-center'>
              <ApartmentIcon 
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <p className='text-sm text-slate-700'>Flexible jobs that fit your lifestyle.</p>
            </div>
          </div>
          <div className='flex flex-row space-x-5'>
            <Link href='/learn-more'>
              <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
            </Link>
            <Link href='/signup' className='self-center text-slate-900 hover:text-orange-700 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
              Sign Up &nbsp; &gt;
            </Link>
          </div>
        </div>
      </Imagetext>

      <section className='shadow-2xl relative md:p-28 p-7 space-y-7 flex flex-col justify-center items-center bg-gradient-to-l from-orange-300 to-blue-200 w-full'>
        <h6 className='text-sm text-slate-800'>Discover</h6>
        <h1 className='md:w-3/7 w-full text-center md:text-5xl text-2xl text-orange-900 font-semibold'>
        Explore the Amazing Featues of Kadabite
        </h1>
        <p className='md:w-1/2 w-full text-center text-slate-700 text-md'>
          Kadabite offers a user-friendly interface that makes ordering food a breeze.
          Enjoy real-time tracking and a diverse selection of food options right at your fingertips.
        </p>

        <div className="w-full p-5 md:p-8 flex flex-col md:flex-row flex-wrap md:items-center">
            <div 
              className="flex flex-col md:w-1/3 w-full justify-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              tabIndex={0}
              aria-label={`Learn more about user our user friendly interface.`}
            >
              <div className="shadow-lg rounded-xl p-5 bg-gray-50">
                <Link href='/'>
                  <Image
                    src={`/landing_page/place_order.jpg`}
                    width={300}
                    height={200}
                    alt={`Image of user friendliness`}
                    className="rounded-t-xl cursor-pointer"
                  />
                </Link>
                <h3 className="text-xl text-slate-900 md:leading-normal pt-3 pb-3">
                  User-Friendly Interface for Effortless Ordering
                </h3>
                <p className="text-sm text-slate-500 md:leading-normal">
                  Navigate our platform with ease and convenience.
                </p>
              </div>
            </div>

            <div 
              className="flex flex-col md:w-1/3 w-full justify-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              tabIndex={0}
              aria-label={`Learn more about our real time tracking.`}
            >
              <div className="shadow-lg rounded-xl p-5 bg-gray-50">
                <Link href='/'>
                  <Image
                    src={`/landing_page/place_order.jpg`}
                    width={300}
                    height={200}
                    alt={`Image of real time tracking`}
                    className="rounded-t-xl cursor-pointer"
                  />
                </Link>
                <h3 className="text-xl text-slate-900 md:leading-normal pt-3 pb-3">
                  Real-Time Tracking for Your Deliveries
                </h3>
                <p className="text-sm text-slate-500 md:leading-normal">
                  Stay updated on your order's journey in real-time
                </p>
              </div>
            </div>

            <div 
              className="flex flex-col md:w-1/3 w-full justify-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              tabIndex={0}
              aria-label={`Learn more about food variety options.`}
            >
              <div className="shadow-lg rounded-xl p-5 bg-gray-50">
                <Link href='/'>
                  <Image
                    src={`/landing_page/place_order.jpg`}
                    width={300}
                    height={200}
                    alt={`Image of real time tracking`}
                    className="rounded-t-xl cursor-pointer"
                  />
                </Link>
                <h3 className="text-xl text-slate-900 md:leading-normal pt-3 pb-3">
                  A Wide Variety of Food Options
                </h3>
                <p className="text-sm text-slate-500 md:leading-normal">
                  Choose from an extensive range of cuisines.
                </p>
              </div>
            </div>
            
        </div>
        <div className='flex flex-row space-x-5'>
          <Link href='/learn-more'>
            <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
          </Link>
          <Link href='/signup' className='self-center text-slate-900 hover:text-orange-700 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
            Sign Up &nbsp; &gt;
          </Link>
        </div>
      </section>


      <section className="w-full shadow-2xl flex md:flex-row flex-col p-20 mt-5">
        <div className='flex space-y-5 flex-col'>
          <h6 className='text-sm text-slate-800'>Connect</h6>
          <h1 className='md:text-5xl text-2xl text-orange-900 font-semibold'>Experience the future of Food Delivery</h1>
        </div>
        <div className='flex space-y-10 flex-col'>
          <h6 className='text-sm text-slate-800'>
            Kadabites bridges the gap between customers and local food vendors.
            Enjoy a seamless ordering experience while supporting your community.
          </h6>
          <div className='flex md:flex-row flex-col md:space-x-5 md:space-y-0 space-y-4'>
            <div className='flex flex-col space-y-2 shadow-lg bg-blue-100 p-3 rounded-md h-full'>
              <AcUnitIcon 
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <h3 className='font-semibold text-lg text-orange-900'>For Customers</h3>
              <p className='text-sm text-slate-900'>
                Access a diverse range of cuisines at your fingertips  
              </p>
            </div>
            <div className='flex flex-col space-y-2 shadow-lg bg-blue-100 p-3 rounded-md h-full'>
              <AddShoppingCartIcon 
                sx={{ fontSize: 25, color: orange[900] }} 
                aria-hidden="true"
              />
              <h3 className='font-semibold text-lg text-orange-900'>For Restaurants</h3>
              <p className='text-sm text-slate-900'>
                Expand your reach and grow your customer base effortlessly.
              </p>
            </div>
          </div>
          <div className='flex flex-row space-x-5'>
            <Link href='/learn-more'>
              <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
            </Link>
            <Link href='/signup' className='self-center text-slate-900 hover:text-orange-700 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
              Sign Up &nbsp; &gt;
            </Link>
        </div>
        </div>
      </section>

      <section className='shadow-2xl relative md:p-28 p-7 space-y-7 flex flex-col justify-center items-center bg-gradient-to-l from-orange-300 to-blue-200 w-full'>
        <h6 className='text-sm text-slate-800'>Team</h6>
        <h1 className='md:w-3/7 w-full text-center md:text-5xl text-2xl text-orange-900 font-semibold'>
          Our Team
        </h1>
        <p className='md:w-1/2 w-full text-center text-slate-700 text-md'>
          Meet the passionate individuals driving Linux Kitchens forward.
        </p>
      
        <div className="w-full p-5 md:p-8 flex flex-col md:flex-row flex-wrap md:items-center">
          {team.map((item, idx) => (
             <div
              key={idx}
              className="flex flex-col md:w-1/3 w-full justify-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              tabIndex={0}
              aria-label={`Learn more about food variety options.`}>
              <div className="shadow-lg rounded-xl p-5 bg-gray-50 flex flex-col items-center space-y-2">
                <Link href='/'>
                  <Image
                    src={item.image}
                    width={300}
                    height={200}
                    alt={`Image of ${item.name}`}
                    className="rounded-t-xl cursor-pointer"
                  />
                </Link>
                <h3 className="text-md text-slate-900 md:leading-normal">
                  {item.name}
                </h3>
                <h3 className="text-md text-slate-700 md:leading-normal">
                  {item.position}
                </h3>
                <p className="text-sm text-slate-500 md:leading-normal text-center">
                  {item.description}
                </p>
                <div className='flex flex-row space-x-5'>
                <Link href={item.linkedIn}>
                  <Image 
                    src='/landing_page/linkedIn.png'
                    width={20}
                    height={20}
                    alt='linkedIn logo'
                    />
                </Link>
                <Link href={item.x}>
                  <Image 
                    src='/landing_page/x.png'
                    width={20}
                    height={20}
                    alt='X logo'
                    />
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="customer-testimonials-heading" id="success_stories" className="md:p-28 w-full bg-blue-100 shadow-lg">
        <Carousel>
          {testimonials.map((item, idx) => (
            <div 
              className="flex flex-col w-full justify-center p-6 items-center md:space-y-5"
              key={idx}
              tabIndex={0}
              aria-label={`Customer testimonial from ${item.name}`}
            >
              <p aria-label={`${item.name}'s rating of our system`}>{item.star}</p>
              <blockquote className='w-full text-center text-md font-semibold text-gray-800 md:leading-normal'>
                {item.message}
              </blockquote>
              <div className="flex flex-row items-center p-4 justify-center space-x-3">
                <Image
                  src={item.image}
                  width={30}
                  height={30}
                  alt={item.altText}
                  className="rounded-full"
                />
                <div className='flex flex-col space-y-2 '>
                  <p className="text-sm text-gray-600 md:leading-normal text-left pt-3" aria-labelledby={`testimonial-${idx}`}>
                    {item.name}
                  </p>
                  <footer className="text-xs text-gray-500 mt-2 text-left">
                    {item.location}
                  </footer>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <section className='shadow-2xl relative md:p-28 p-7 space-y-7 flex flex-col justify-center items-center bg-gradient-to-l from-orange-300 to-blue-200 w-full'>
        <h6 className='text-sm text-slate-800'>Connect</h6>
        <h1 className='md:w-3/7 w-full text-center md:text-5xl text-2xl text-orange-900 font-semibold'>
          Discover How Kadabite Transforms Food Delivery
        </h1>
        <p className='md:w-1/2 w-full text-center text-slate-700 text-md'>
          Kadabite revolutionizes the way we order food. Our platform seamlessly connects Customers
          with local food vendors, ensuring a delightful experience from start to finish.  
        </p>
        <div className="w-full p-5 md:p-8 flex flex-col md:flex-row flex-wrap md:items-center">
          { connect.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:w-1/3 w-full justify-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              tabIndex={0}
              aria-label={item.accessibilityText}
            >
              <div className="shadow-lg rounded-xl p-5 bg-gray-50">
                <Link href='/'>
                  <Image
                    src={item.image}
                    width={300}
                    height={200}
                    alt={item.altImage}
                    className="rounded-t-xl cursor-pointer"
                  />
                </Link>
                <h3 className="text-xl text-slate-900 md:leading-normal pt-3 pb-3">
                  {item.header}
                </h3>
                <p className="text-sm text-slate-500 md:leading-normal">
                  {item.paragraph}
                </p>
              </div>
            </div>
            
          ))}
            
        </div>
        <div className='flex flex-row space-x-5'>
          <Link href='/learn-more'>
            <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
          </Link>
          <Link href='/signup' className='self-center text-slate-900 hover:text-orange-700 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
            Sign Up &nbsp; &gt;
          </Link>
        </div>
      </section>

      <section className='shadow-2xl relative md:p-28 p-7 space-y-7 flex flex-col justify-center items-center bg-gradient-to-l from-orange-300 to-grey-200 w-full'>
        <h6 className='text-sm text-slate-800'>Connect</h6>
        <h1 className='md:w-3/7 w-full text-center md:text-5xl text-2xl text-orange-900 font-semibold'>
          Discover How Kadabite Transforms Food Delivery
        </h1>
        <p className='md:w-1/2 w-full text-center text-slate-700 text-md'>
          With Kadabite, ordering your favorite meals is simple and fast. Experience a seamless connection
          between you and local restaurants. 
        </p>
        <div className="w-full p-5 md:p-8 flex flex-col md:flex-row flex-wrap md:items-center">
          { connect2.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:w-1/3 w-full justify-center items-center p-6 rounded-xl transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              tabIndex={0}
              aria-label={item.accessibilityText}
            >
              <div className="shadow-lg rounded-xl p-5 bg-gray-50 flex flex-col justify-center">
                <div className='text-center'><item.logo
                  sx={{ fontSize: 25, color: orange[900] }} 
                  aria-hidden="true"
                /></div>
                <h3 className="text-xl text-center text-slate-900 md:leading-normal pt-3 pb-3">
                  {item.header}
                </h3>
                <p className="text-sm text-center text-slate-500 md:leading-normal">
                  {item.paragraph}
                </p>
              </div>
            </div>
          ))}
            
        </div>
        <div className='flex flex-row space-x-5'>
          <Link href='/order'>
            <Button aria-label="Order" className='rounded-lg'>Order</Button>
          </Link>
          <Link href='/' className='self-center text-slate-900 hover:text-orange-700 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
            Learn More &nbsp; &gt;
          </Link>
        </div>
      </section>

      <section className='flex flex-col justify-center items-center md:p-24 p-16 space-y-5'>
        <h1 className='md:w-3/7 w-full text-center md:text-5xl text-2xl text-orange-900 font-semibold'>
          Join the Food Revolution Today
        </h1>
        <p className='md:w-1/2 w-full text-center text-slate-700 text-md'>
          Download Kadabite now or sign up as a vendor or rider to get started!
        </p>
        <div className='flex flex-row space-x-5'>
          <Link href='/download'>
            <Button aria-label="Download the app" className='rounded-lg'>Download</Button>
          </Link>
          <Link href='/learn-more' className='self-center text-slate-900 hover:text-orange-700 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
            Learn More &nbsp; &gt;
          </Link>
        </div>
      </section>

    </main>

    <section aria-labelledby="download-app-bottom" className="w-full bg-gray-100 md:p-20 p-8 space-y-5">
      <div className="flex flex-col text-gray-900 md:tracking-wide leading-normal mb-10 space-y-5">
        <h2 className='md:text-3xl text-xl font-semibold'>Order or Sell Food Today </h2>
        <p className='text-sm text-slate-500'>
          Download Kadabite now to explore delicious food options or
          start your own food business!
        </p>
      </div>
      <div className='flex flex-row space-x-2 items-center mb-20'>
        <Link href='/download'>
          <Button className='bg-orange-500 text-white rounded-lg' aria-label="download the app">Download</Button>
        </Link>
        <Link href='/learn-more'>
          <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
        </Link>
      </div>

      <hr className='bg-orange-800 h-1 w-full' />
    </section>

    <section aria-labelledby="download-app-bottom" className="w-full bg-gray-100 md:p-20 p-8 space-y-5">
      <div className="flex flex-col text-gray-900 md:tracking-wide leading-normal mb-10 space-y-5">
        <h2 className='md:text-3xl text-xl font-semibold'>Stay Updated with Kadabites </h2>
        <p className='text-sm text-slate-500'>
          Subscribe to our newsletter for the latest updates,
          promotions, and exclusive offers from Kadabites.
        </p>
      </div>
      <NewsletterForm />
      <footer className='text-sm text-slate-500'>
          By clicking Join Now, you agree to our Terms and Conditions.
      </footer>
  
    </section>

    <footer id="contact" aria-labelledby="footer-heading" className='w-full bg-orange-700 shadow-2xl flex flex-col md:flex-row p-5 pb-16'>
      <h2 id="footer-heading" className="sr-only">Footer Navigation</h2>
      <div className='w-full md:w-3/4 flex flex-col md:flex-row justify-around items-center'>
        <div className='flex flex-col text-slate-50'>
          <Image 
            alt='company logo'
            height={30}
            width={100}
            src='/landing_page/logo.jpg'
          />
        </div>
        <div className='flex flex-col text-slate-50'>
          <Typography sx={{ mt: 2, color: "black", fontSize: 20 }}>Quick Links</Typography>
          <Link href='/' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to home page">About Us</Link>
          <Link href='/aboutUs' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to about page">Contact Us</Link>
          <Link href='/app' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to app page">Our Services</Link>
          <Link href='/marketplace' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to marketplace">FAQ</Link>
          <Link href='/marketplace' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to marketplace">Blog</Link>
        </div>

        <div className='flex flex-col text-slate-50'>
          <Typography sx={{ mt: 2, color: "black", fontSize: 20 }}>Follow Us</Typography>
          <Link href='/' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to home page">Facebook</Link>
          <Link href='/about' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to about page">Twitter</Link>
          <Link href='/app' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to app page">LinkedIn</Link>
          <Link href='/marketplace' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to marketplace">YouTube</Link>
        </div>

        <div className='flex flex-col text-slate-50'>
          <Typography sx={{ mt: 2, color: "black", fontSize: 20 }}>Newsletter</Typography>
          <Link href='/signup' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to home page">Sign Up</Link>
          <Link href='/about' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to about page">Latest News</Link>
          <Link href='/app' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to app page">Events</Link>
          <Link href='/marketplace' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to marketplace">Partnerships</Link>
        </div>
      </div>
    </footer>
      <div 
        className='flex flex-col md:flex-row justify-around items-center text-slate-50 md:space-x-5 md:space-y-0 space-y-5 w-full bg-orange-700 p-5'
      >
        <p>&copy; 2024 Kadabites. All rights reserved.</p>
        <Link href='/' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to home page">Privacy Policy</Link>
        <Link href='/' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to about page">Terms of Use</Link>
        <Link href='/' className='cursor-pointer hover:text-gray-900 active:text-gray-900 focus:text-gray-900' aria-label="Go to app page">Cookie Settings</Link>
      </div>
  </>
  );
}

