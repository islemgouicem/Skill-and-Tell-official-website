"use client";
import Link from "next/link";
import { forwardRef } from "react";
import { usePageTransition } from "./TransitionShell";

/** Next <Link> that plays the curtain transition for internal routes. */
const TLink = forwardRef(function TLink({ href, onClick, children, ...props }, ref) {
  const { navigate } = usePageTransition();
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (props.target === "_blank") return;
    if (typeof href !== "string" || /^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <Link ref={ref} href={href} onClick={handle} {...props}>
      {children}
    </Link>
  );
});

export default TLink;
