'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

export default function Slidein({ children, className }: {children: React.ReactNode, className: string}) {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headlineRef.current) {
      observer.observe(headlineRef.current);
    }

    return () => {
      if (headlineRef.current) {
        observer.unobserve(headlineRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div id="headline" ref={headlineRef} className={clsx('md:pt-10 md:pl-10', className)}>
        {children}
      </div>
      {/* Other content */}
    </div>
  );
}
