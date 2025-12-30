declare module '@splidejs/react-splide' {
  import React from 'react';
  
  export interface SplideProps {
    options?: any;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export interface SplideSlideProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<SplideSlideProps>;
}
