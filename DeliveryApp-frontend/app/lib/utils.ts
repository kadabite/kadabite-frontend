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

export const navItems = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/#about_us' },
    { name: 'Our foods', url: '/#our_foods' },
    { name: 'How it works', url: '/#how_it_works' },
    { name: 'Success stories', url: '/#success_stores' },
    { name: 'Contact', url: '/#contact' },
  ];


export const items = [
    {
      name: 'choose_meal.jpg',
      altText: 'Choose food from your favorite restaurant',
      header: 'Choose your meal'
    },
    {
      name: 'place_order.jpg',
      altText: 'Order food from your favorite restaurant',
      header: 'Place your Order'
    },
    {
      name: 'track_delivery.jpg',
      altText: 'Track the delivery from your favorite restaurant',
      header: 'Track Delivery'
    },
  ]

export const restaurant = [
    {
      name: 'morba chinons restaurant',
      image: 'choose_meal.jpg',
      href: '/',
      altText: 'Choose food from your favorite restaurant',
      briefDescription: 'Choose your meal Choose food from your favorite restaurant Choose food from your favorite restaurant'
    },
     {
      name: 'morba chinons restaurant',
      image: 'choose_meal.jpg',
      href: '/',
      altText: 'Choose food from your favorite restaurant',
      briefDescription: 'Choose your meal Choose food from your favorite restaurant Choose food from your favorite restaurant'
    },
     {
      name: 'morba chinons restaurant',
      image: 'choose_meal.jpg',
      href: '/',
      altText: 'Choose food from your favorite restaurant',
      briefDescription: 'Choose your meal Choose food from your favorite restaurant Choose food from your favorite restaurant'
    },
    {
      name: 'morba chinons restaurant',
      image: 'choose_meal.jpg',
      href: '/',
      altText: 'Choose food from your favorite restaurant',
      briefDescription: 'Choose your meal Choose food from your favorite restaurant Choose food from your favorite restaurant'
    },
    {
      name: 'morba chinons restaurant',
      image: 'choose_meal.jpg',
      href: '/',
      altText: 'Choose food from your favorite restaurant',
      briefDescription: 'Choose your meal Choose food from your favorite restaurant Choose food from your favorite restaurant'
    },
  ];

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
    description: 'We only use the best ingredients for our meals.',
  },
  {
    icon: AccountBalanceIcon,
    header: 'Trust',
    description: 'Our services are trusted by thousands of customers.',
  },
  {
    icon: AddShoppingCartIcon,
    header: 'Convenience',
    description: 'Easily order your meals online.',
  },
  {
    icon: AddModeratorIcon,
    header: 'Security',
    description: 'Your data is safe with us.',
  },
  {
    icon: AddchartIcon,
    header: 'Performance',
    description: 'Fast and reliable delivery service.',
  },
  {
    icon: ApartmentIcon,
    header: 'Variety',
    description: 'A wide range of meals to choose from.',
  },
  {
    icon: AssessmentIcon,
    header: 'Feedback',
    description: 'We value your feedback to improve our services.',
  },
  {
    icon: AssuredWorkloadIcon,
    header: 'Compliance',
    description: 'We adhere to all food safety regulations.',
  },
  {
    icon: BreakfastDiningIcon,
    header: 'Delicious',
    description: 'Enjoy delicious meals every time.',
  }
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