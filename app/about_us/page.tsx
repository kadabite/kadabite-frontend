import { Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <>
      <header className='bg-gray-50 p-5 flex justify-center items-center'>
        <Image 
          alt='company logo'
          height={200}
          width={200}
          src='/landing_page/logo.jpg'
          className='rounded-full shadow-lg'
        />
      </header>
      <main className='p-10 bg-gray-50'>
        <section className='mb-10'>
          <Typography variant="h2" className='text-orange-900 font-semibold border-b-2 border-orange-900 pb-2'>About Kadabite</Typography>
          <Typography variant="body1" className='text-slate-700 mt-5 leading-relaxed'>
            Kadabite is a dynamic food delivery platform dedicated to 
            transforming local commerce by connecting customers with food 
            vendors and restaurants through our flagship product, Kadabite. 
            Our platform provides an end-to-end solution that enables restaurants 
            and food sellers to reach a broader audience, while customers enjoy a seamless 
            food ordering experience. Dispatch riders are integrated into the system, offering 
            flexible job opportunities while ensuring efficient delivery services. Kadabite takes 
            a 5% commission on every sale, driving revenue while promoting growth for all stakeholders.
          </Typography>
        </section>

        <section className='mb-10'>
          <Typography variant="h3" className='text-orange-900 font-semibold border-b-2 border-orange-900 pb-2'>Mission Statement</Typography>
          <Typography variant="body1" className='text-slate-700 mt-5 leading-relaxed'>
            Our mission is to revolutionize the local food delivery 
            landscape by empowering restaurants and food sellers with a 
            reliable platform, providing customers with access to a wide range 
            of culinary options, and fostering flexible employment for dispatch riders.
          </Typography>
        </section>

        <section className='mb-10'>
          <Typography variant="h3" className='text-orange-900 font-semibold border-b-2 border-orange-900 pb-2'>Vision Statement</Typography>
          <Typography variant="body1" className='text-slate-700 mt-5 leading-relaxed'>
            We aim to become the leading food delivery platform that enhances 
            community engagement, improves business efficiency for local food 
            sellers, and offers unparalleled convenience and value for customers
            while creating meaningful job opportunities.
          </Typography>
        </section>

        <section className='mb-10'>
          <Typography variant="h3" className='text-orange-900 font-semibold border-b-2 border-orange-900 pb-2'>Business Description</Typography>
          <Typography variant="body1" className='text-slate-700 mt-5 leading-relaxed'>
            Kadabite is a versatile and robust delivery platform available 
            across Android, iOS, and web platforms. It is designed to simplify 
            local food commerce by connecting restaurants, food sellers, customers, 
            and dispatch riders in a seamless ecosystem. The platform is built to serve 
            multiple stakeholders, ensuring smooth operations, convenience, and growth 
            for each user group.
          </Typography>
        </section>

        <section className='mb-10'>
          <Typography variant="h4" className='text-orange-900 font-semibold border-b-2 border-orange-900 pb-2'>Key Features</Typography>
          <Typography variant="h5" className='text-slate-700 mt-5 font-semibold'>Business Control and Management</Typography>
          <Typography variant="body1" className='text-slate-700 mt-2 leading-relaxed'>
            Kadabite equips restaurant owners and food sellers with powerful 
            tools to efficiently manage their operations. This includes real-time 
            order tracking, delivery management, performance analytics, and the ability 
            to control menus, prices, and availability. These features empower business 
            owners to streamline processes, enhance operational efficiency, and optimize
            customer satisfaction.
          </Typography>
          <Typography variant="h5" className='text-slate-700 mt-5 font-semibold'>Customer Connectivity</Typography>
          <Typography variant="body1" className='text-slate-700 mt-2 leading-relaxed'>
            Customers benefit from instant access to a wide range of local
            businesses, allowing them to browse, order, and track deliveries 
            from their favorite food sellers. The platform provides a user-friendly 
            interface, ensuring a seamless and enjoyable ordering experience,
            from selection to delivery.
          </Typography>
          <Typography variant="h5" className='text-slate-700 mt-5 font-semibold'>Dispatcher Management and Opportunities</Typography>
          <Typography variant="body1" className='text-slate-700 mt-2 leading-relaxed'>
            Kadabite offers dispatchers a comprehensive management system that
            enables them to accept and manage delivery requests efficiently. 
            The platform creates flexible job opportunities for local dispatchers, 
            with features like real-time task allocation, route optimization, and 
            delivery tracking to ensure timely and accurate deliveries.
          </Typography>
        </section>

        <section className='mb-10'>
          <Typography variant="h4" className='text-orange-900 font-semibold border-b-2 border-orange-900 pb-2'>Value Proposition</Typography>
          <Typography variant="body1" className='text-slate-700 mt-5 leading-relaxed'>
            At Kadabite, we deliver high-quality, affordable meals 
            celebrating local flavours and cultural authenticity. 
            Partnering with trusted vendors trained to uphold freshness 
            and consistency, we ensure every meal arrives as if it came 
            straight from the kitchen. Kadabite combines the best of local 
            cuisine with convenience and reliability, bringing beloved dishes 
            to your door without compromising on taste, quality, or affordability.
          </Typography>
        </section>

        <section className='mt-10'>
          <Link href='/' className='text-orange-700 hover:text-orange-900 focus:text-orange-900 active:text-orange-900 text-sm tracking-tighter font-semibold'>
            Back to Home &nbsp; &gt;
          </Link>
        </section>
      </main>
    </>
  );
}
