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
import Imagetext from '@/app/ui/image-text'
import AddchartIcon from '@mui/icons-material/Addchart';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';


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
        <h1 className='pt-5 text-orange-900 md:w-1/2 w-full md:text-6xl text-3xl md:tracking-wide tracking-normal md:leading-tight leading-normal font-semibold'>
          Experience Seamless Food Delivery with LinuXapp
        </h1>
        <p className='text-gray-900 w-full md:max-w-sm md:text-lg text-sm md:tracking-wide leading-normal mb-10'>
            At Linux Kitchens, we revolutionize your food ordering experience by connecting you with local
            restaurants and vendors effortlessly. With LinuXapp, enjoy quick access to a diverse range of
            delicious meals delivered right to your doorstep.
        </p>
        <div className='flex flex-row space-x-2 items-center mb-20'>
          <Button className='bg-orange-500 text-white rounded-lg' aria-label="Order Now for Healthy Meals">Order</Button>
          <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
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
        <h1 className='md:w-1/2 w-full text-center md:text-5xl text-2xl text-orange-900 font-semibold'>Savor the Flavor, Delivered to Your Door</h1>
        <p className='md:w-1/2 w-full text-center text-slate-700 text-md'>At Linux Kitchens, we connect you with your favorite local restaurants and food vendors,
          making ordering food a breeze. Experience the convenience of our LinuXapp and enjoy delicious
          meals delivered right to you.
        </p>
        <div className='flex flex-row space-x-5'>
          <Button className='bg-orange-500 text-white rounded-lg' aria-label="Download the app">Download</Button>
          <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
        </div>
      </section>

      <Imagetext ariaLabelledby='feature_section_app' imageUrl='/landing_page/meal_mockup3.jpg' className='bg-orange-50'>
        <div className='md:w-1/2 w-full flex flex-col justify-center space-y-4' id='feature_section_app'>
          <AddchartIcon 
            sx={{ fontSize: 50, color: orange[900] }} 
            aria-hidden="true"
          />
          <h2 className='md:text-5xl text-2xl text-gray-700 font-semibold'>
            Experience Effortless Food Ordering with LinuXapp
          </h2>
          <p className='text-slate-900 text-md'>
            LinuXapp revolutionizes the way you order food, offering a smooth and intuitive interface
            that makes your cravings just a few taps away.
            Enjoy a diverse selection of local vendors and restaurants, all delivered right
             to your doorstep with unmatched convenience.
          </p>
          <div className='flex flex-row space-x-5'>
            <Button className='bg-orange-500 text-white rounded-lg' aria-label="Order Now for Healthy Meals">Order</Button>
            <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
          </div>
        </div>
      </Imagetext>

      <Imagetext ariaLabelledby='feature_section_access' imageUrl='/landing_page/meal_mockup3.jpg' className=''>
        <div className='md:w-1/2 w-full flex flex-col justify-center space-y-7' id='feature_section_access'>
          <h2 className='md:text-5xl text-2xl text-gray-700 font-semibold'>
            Experience Effortless Food Ordering with LinuXapp's User-Friendly Platform
          </h2>
          <p className='text-slate-900 text-md'>
            With LinuXapp, ordering your favourite meals is just a few taps away.
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

      <Imagetext ariaLabelledby='feature_section_dispatcher' imageUrl='/landing_page/meal_mockup3.jpg' className='bg-orange-50'>
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

      <section aria-labelledby='discovery' className='md:p-10 p-5 space-y-10'>
        <div className='flex md:flex-row flex-col md:space-x-10 md:space-y-0 space-y-5'>
          <h1 className='md:text-4xl text-2xl text-orange-700 font-semibold md:w-1/2 w-full md:tracking-wide tracking-normal md:leading-tight leading-normal' id='discovery'>
            Discover the Best Local Restaurants and Enjoy Seamless Food Delivery
          </h1>
          <p className='self-center text-slate-500 font-bold text-md md:w-1/2 w-full tracking-wide md:leading-snug leading-normal'>
            At Linux Kitchens, we make it easy to find your favorite local eateries.
            Our platform allows you to explore variety of restaurants and cuisines right
            at your fingertips. Enjoy a hassle-free ordering experience that brings
            delicious meals straight to your door.
          </p>
        </div>

        <div className='flex md:flex-row flex-col md:space-x-5 md:space-y-0 space-y-10'>
          <div className='flex flex-col space-y-2 justify-between'>
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
          <div className='flex flex-col space-y-2 justify-between'>
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
          <div className='flex flex-col space-y-2 justify-between'>
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
            Discover a world of culinary delights at your fingertips with LinuXapp. 
            We connect you with local restaurants and food vendors for a seamless ordering experience.
          </p>
          <div className='flex flex-row space-x-5'>
            <Button className='bg-orange-500 text-white rounded-lg' aria-label="Order Now for Healthy Meals">Order</Button>
            <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
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
            <Button aria-label="Learn more about how we operate" className='rounded-lg'>Learn More</Button>
            <Link href='/' className='self-center text-slate-900 hover:text-orange-700 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
              Sign Up &nbsp; &gt;
            </Link>
          </div>
        </div>
      </Imagetext>

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

      <section aria-labelledby="why-choose-us-heading" className="w-full bg-slate-200 shadow-2xl" id="why_choose_us">
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

