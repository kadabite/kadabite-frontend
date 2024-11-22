import { Revenue } from './definitions';

export const getPasswordValidationMessage = (password: string) => {
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one digit.';
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return 'Password must contain at least one special character (@$!%*?&).';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  return 'Password is strong.';
};

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
  { name: 'About Us', url: '/about_us' },
  { name: 'Popular restaurants', url: '/#popular_restaurants' },
  { name: 'How It Works', url: '/#how_it_works' },
  { name: 'Why Choose Us', url: '/#why_choose_us' },
  { name: 'Success Stories', url: '/#success_stories' },
  { name: 'Contact', url: '/#contact' },
];

export const connect = [
  {
    header: 'For Customers: Easy Ordering Process',
    paragraph: 'Browse menus, place orders, and track deliveries effortlessly.',
    image: '/landing_page/place_order.jpg',
    altImage: 'image of easy ordering',
    accessibilityText: 'it shows how easy it is to order the food'
  },
  {
    header: 'For Food Vendors: Expand Your Reach',
    paragraph: 'Join LinXapp to connect with more customers and increase sales.',
    image: '/landing_page/place_order.jpg',
    altImage: 'image of vendors expanding their reach',
    accessibilityText: 'it shows how vendors expand their reach'
  },
  {
    header: 'For Dispatch Riders: Flexible Job Opportunities',
    paragraph: 'Become a dispatch rider and earn on your schedule',
    image: '/landing_page/place_order.jpg',
    altImage: 'image of flexible job opportunity',
    accessibilityText: 'a description of flexible job opportunity'
  }
];

import ApartmentIcon from '@mui/icons-material/Apartment';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

export const connect2 = [
  {
    header: 'Step 1: Place Your Order',
    paragraph: 'Browse our extensive menu and select your favorites.',
    image: '/landing_page/place_order.jpg',
    logo: ApartmentIcon,
    accessibilityText: 'it shows how easy it is to order the food'
  },
  {
    header: 'Step 2: Restaurant Prepares Your Meal',
    paragraph: 'Our partner restaurants prepare your order with care.',
    logo: AddModeratorIcon,
    accessibilityText: 'it shows how vendors expand their reach'
  },
  {
    header: 'Step 3: Fast Delivery to Your Doorstep',
    paragraph: 'Become a dispatch rider and earn on your schedule',
    logo: AssuredWorkloadIcon,
    accessibilityText: 'a description of flexible job opportunity'
  }
]

export const team = [
  {
    name: 'Alice Johnson',
    position: 'CEO & Founder',
    description: 'Alice leads our vision, ensuring quality and innovation in every delivery.',
    linkedIn: 'https://www.linkedin.com/in/chinonsomorba/',
    x: 'https://x.com/Cadatech1/',
    image: '/landing_page/testimonial1.jpg'
  },
  {
    name: 'Mark Smith',
    position: 'CTO',
    description: 'Mark drives our technology strategy, enhancing user experience and operationsl efficiency.',
    linkedIn: 'https://www.linkedin.com/in/chinonsomorba/',
    x: 'https://x.com/Cadatech1/',
    image: '/landing_page/testimonial1.jpg'
  },
  {
    name: 'Sarah Lee',
    position: 'Marketing Director',
    description: 'Sarah crafts our brand story, connecting with customers and food vendors alike.',
    linkedIn: 'https://www.linkedin.com/in/chinonsomorba/',
    x: 'https://x.com/Cadatech1/',
    image: '/landing_page/testimonial1.jpg'
  },
  {
    name: 'James Brown',
    position: 'Operations Manager',
    description: 'James ensures smooth operations, optimizing logistics for timely deliveries.',
    linkedIn: 'https://www.linkedin.com/in/chinonsomorba/',
    x: 'https://x.com/Cadatech1/',
    image: '/landing_page/testimonial1.jpg'
  },
];

// Testimonials
export const testimonials = [
  {
    name: 'Sarah Johnson',
    image: '/landing_page/testimonial1.jpg',
    altText: 'Photo of satisfied customer Jane Doe',
    message: 'Linux Kitchens has completely changed the way I order food. The convenience and variety they offer are unmatched!',
    location: 'New York, NY',
    star: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'Jane Doe',
    image: '/landing_page/testimonial1.jpg',
    altText: 'Photo of satisfied customer Jane Doe',
    message: 'The food is always fresh and the delivery is on point. Highly recommend!',
    location: 'New York, NY',
    star: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'John Smith',
    image: '/landing_page/testimonial2.jpg',
    altText: 'Photo of happy customer John Smith',
    message: 'Incredible service and delicious meals! I order every week.',
    location: 'Los Angeles, CA',
    star: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'Anna Lee',
    image: '/landing_page/testimonial2.jpg',
    altText: 'Photo of regular customer Anna Lee',
    message: 'Amazing variety of meals and the app is so easy to use!',
    location: 'Chicago, IL',
    star: '⭐⭐⭐⭐⭐'
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