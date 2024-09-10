import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
// Navigation Items
export const navItems = [
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/#about_us' },
  { name: 'Popular restaurants', url: '/#popular_restaurants' },
  { name: 'How It Works', url: '/#how_it_works' },
  { name: 'Why Choose Us', url: '/#why_choose_us' },
  { name: 'Success Stories', url: '/#success_stories' },
  { name: 'Contact', url: '/#contact' },
];

// Carousel Items
export const items = [
  {
    name: 'choose_meal.jpg',
    altText: 'Choose food from your favorite restaurant',
    header: 'Choose Your Meal',
  },
  {
    name: 'place_order.jpg',
    altText: 'Order food from your favorite restaurant',
    header: 'Place Your Order',
  },
  {
    name: 'track_delivery.jpg',
    altText: 'Track the delivery from your favorite restaurant',
    header: 'Track Your Delivery',
  },
];

// Restaurant Details
export const restaurant = [
  {
    name: 'Morba Chinons Restaurant',
    image: 'choose_meal.jpg',
    href: '/',
    altText: 'Choose food from Morba Chinons Restaurant',
    briefDescription: 'Discover a variety of meals prepared with top-quality ingredients, carefully curated to meet your tastes.',
  },
  {
    name: 'Taste of Africa',
    image: 'place_order.jpg',
    href: '/',
    altText: 'Order food from Taste of Africa',
    briefDescription: 'Authentic African meals crafted to deliver an unforgettable dining experience.',
  },
  {
    name: 'Italian Feast',
    image: 'track_delivery.jpg',
    href: '/',
    altText: 'Order Italian food from Italian Feast',
    briefDescription: 'Enjoy classic Italian dishes with the finest ingredients and flavors.',
  },
  {
    name: 'Asian Delights',
    image: 'choose_meal.jpg',
    href: '/',
    altText: 'Asian meals at Asian Delights',
    briefDescription: 'Taste the rich flavors of Asia with freshly made meals delivered to your doorstep.',
  },
  {
    name: 'Healthy Bites',
    image: 'place_order.jpg',
    href: '/',
    altText: 'Order healthy food from Healthy Bites',
    briefDescription: 'Savor healthy, balanced meals that nourish your body and satisfy your taste buds.',
  },
];

// Why Choose Us Section
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AddchartIcon from '@mui/icons-material/Addchart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';

export const chooseUs = [
  {
    icon: AcUnitIcon,
    header: 'Quality',
    description: 'We use only the best ingredients for our meals.',
  },
  {
    icon: AccountBalanceIcon,
    header: 'Trust',
    description: 'Trusted by thousands of customers for reliable service.',
  },
  {
    icon: AddShoppingCartIcon,
    header: 'Convenience',
    description: 'Order meals easily from the comfort of your home.',
  },
  {
    icon: AddModeratorIcon,
    header: 'Security',
    description: 'Your data and transactions are securely handled.',
  },
  {
    icon: AddchartIcon,
    header: 'Performance',
    description: 'Experience fast and efficient food delivery every time.',
  },
  {
    icon: ApartmentIcon,
    header: 'Variety',
    description: 'A wide selection of meals to cater to every preference.',
  },
  {
    icon: AssessmentIcon,
    header: 'Feedback',
    description: 'We value your input to improve and adapt our services.',
  },
  {
    icon: AssuredWorkloadIcon,
    header: 'Compliance',
    description: 'Our services meet all food safety and delivery regulations.',
  },
  {
    icon: BreakfastDiningIcon,
    header: 'Delicious',
    description: 'Indulge in mouth-watering dishes every time you order.',
  },
];

// Testimonials
export const testimonials = [
  {
    name: 'Jane Doe',
    image: '/landing_page/testimonial1.jpg',
    altText: 'Photo of satisfied customer Jane Doe',
    message: 'The food is always fresh and the delivery is on point. Highly recommend!',
    location: 'New York, NY',
  },
  {
    name: 'John Smith',
    image: '/landing_page/testimonial2.jpg',
    altText: 'Photo of happy customer John Smith',
    message: 'Incredible service and delicious meals! I order every week.',
    location: 'Los Angeles, CA',
  },
  {
    name: 'Anna Lee',
    image: '/landing_page/testimonial2.jpg',
    altText: 'Photo of regular customer Anna Lee',
    message: 'Amazing variety of meals and the app is so easy to use!',
    location: 'Chicago, IL',
  },
];

// import { useRef, useEffect } from 'react';
// import Chart from 'chart.js';

// function ChartComponent() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       new Chart(canvasRef.current, {
//         type: 'bar',
//         data: {
//           labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//           datasets: [
//             {
//               label: '# of Votes',
//               data: [12, 19, 3, 5, 2, 3],
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)',
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)',
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//       });
//     }
//   }, []);

//   return <canvas ref={canvasRef}></canvas>;
// }