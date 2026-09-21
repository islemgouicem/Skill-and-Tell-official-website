import { useInView } from "./use_in_view";

/** Fade + rise on scroll. `delay` is in milliseconds. */
export default function Reveal({ delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`ody-reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
}
