'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

export default function Headline({ children, className }: {children: React.ReactNode, className: string}) {
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
      { threshold: 0.1 }
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
      <div id="headline" ref={headlineRef} className={clsx('p-12', className)}>
        {children}
      </div>
      {/* Other content */}
    </div>
  );
}
