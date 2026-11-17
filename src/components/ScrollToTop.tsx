"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When navigating to any page, immediately force scroll to top (0, 0)
    // using "instant" so that sticky headers or smooth-scroll don't trap the page midway.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname, searchParams]);

  return null;
}
