import { cn } from "@/lib/utils/utils";

const ArcadeButton = ({ variant = "next", children, className, ...props }) => {
  const base = "relative inline-flex items-center justify-center font-compacta tracking-[0.06em] cursor-pointer transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:hover:scale-[1.02] enabled:hover:brightness-110 enabled:active:translate-y-0 enabled:active:scale-[0.99] disabled:cursor-not-allowed";

  const styles = {
    next: {
      bg: "/images/arcade/Red_button.png",
      color: "#FFFFFF",
      arrowSrc: "/images/arcade/arrow_next.svg",
    },
    previous: {
      bg: "/images/arcade/grey_button.png",
      color: "#FFFFFF",
      arrowSrc: "/images/arcade/arrow_prev.svg",
    },
    register: {
      bg: "/images/arcade/Red_button.png",
      color: "#FFFFFF",
      arrowSrc: null,
    },
  };

  const selected = styles[variant] ?? styles.next;

  return (
    <button
      className={cn(base, className)}
      style={{
        width: "197px",
        minWidth: "197px",
        maxWidth: "197px",
        height: "58px",
        minHeight: "58px",
        maxHeight: "58px",
        padding: 0,
        display: "grid",
        placeItems: "center",
        backgroundImage: `url(${selected.bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "40px",
        appearance: "none",
        WebkitAppearance: "none",
        outline: "none",
        overflow: "hidden",
        color: selected.color,
        boxShadow: "none",
        filter: "drop-shadow(0px 0px 20px rgba(161, 161, 161, 0.25))",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        mixBlendMode: "normal",
        opacity: 1,
        position: "relative",
        zIndex: 30,
        isolation: "isolate",
        fontFamily: "compacta, sans-serif",
        fontStyle: "normal",
        fontWeight: 400,
        textShadow: "2px 1px 8px rgba(255, 255, 255, 0.45)",
      }}
      {...props}
    >
      <span
        className="inline-flex items-center justify-center gap-3"
        style={{
          fontFamily: "compacta, sans-serif",
          fontSize: "36px",
          lineHeight: "35px",
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
          height: "35px",
          transform: "translateY(2px)",
        }}
      >
        {variant === "previous" && selected.arrowSrc ? (
          <>
            <img src={selected.arrowSrc} alt="" aria-hidden="true" style={{ width: "23px", height: "auto" }} />
            <span style={{ fontFamily: "compacta, sans-serif" }}>{children}</span>
          </>
        ) : selected.arrowSrc ? (
          <>
            <span style={{ fontFamily: "compacta, sans-serif" }}>{children}</span>
            <img src={selected.arrowSrc} alt="" aria-hidden="true" style={{ width: "23px", height: "auto" }} />
          </>
        ) : (
          <span style={{ fontFamily: "compacta, sans-serif" }}>{children}</span>
        )}
      </span>
    </button>
  );
};

export default ArcadeButton;
