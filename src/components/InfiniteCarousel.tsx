"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface InfiniteCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  overlay?: boolean;
}

export function InfiniteCarousel({
  images,
  interval = 4000,
  className,
  overlay = false,
}: InfiniteCarouselProps) {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(advance, interval);
    return () => clearInterval(id);
  }, [advance, interval, images.length]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out",
            i === current ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#33305e]/40 to-transparent" />
      )}
    </div>
  );
}
