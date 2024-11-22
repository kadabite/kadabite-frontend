'use client';

import { useState, useEffect, ReactNode } from 'react';

// Define the prop types for the carousel
interface CarouselProps {
  children: ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalSlides = children.length;

  // Move to next slide (for controls)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Move to previous slide (for controls)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId); // Cleanup interval
  }, [totalSlides]);


  return (
    <div
      className="relative w-full overflow-hidden p-5"
      aria-roledescription="carousel"
    >
      {/* Carousel Container */}
      <div className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0" 
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${totalSlides}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Left and Right Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-orange-900 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-orange-900 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        &#10095;
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-orange-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
