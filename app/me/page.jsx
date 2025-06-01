"use client";

import React, { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const letters = [..."LOADING."];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(false), 600); // start fade out after 500ms
    const changeTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % letters.length);
      setFade(true); // fade in new letter
    }, 1000); // change letter every 600ms

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(changeTimeout);
    };
  }, [currentIndex, letters.length]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        {/* Spinner ring */}
        <div className="size-7 border-5 border-gray-300 border-t-foreground rounded-full animate-spin  "></div>

        {/* Single letter centered */}
        <div className="absolute inset-0 flex items-center justify-center ">
          <span
            className={`text-foreground font-bold text-xs transition-opacity duration-500 translate-[1px]  ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {letters[currentIndex]}
          </span>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
