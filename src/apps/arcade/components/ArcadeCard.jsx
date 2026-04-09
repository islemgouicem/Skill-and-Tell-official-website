import { cn } from "@/lib/utils/utils";

const CARD_VARIANTS = {
  sm: {
    cardHeight: "254px",
    radius: "50px",
    cornerSize: "98px",
    cornerTopOffset: "-15px",
    cornerSideOffset: "-15px",
    cornerScale: 1.16,
    topRightCorner: "/images/arcade/top_right_sm.png",
    bottomLeftCorner: "/images/arcade/bottom_left_sm.png",
    topRightCornerMobile: "/images/arcade/top_right_sm_mobile.png",
    bottomLeftCornerMobile: "/images/arcade/bottom_left_sm_mobile.png",
    contentPadding: "px-7 sm:px-9 lg:px-10 py-8 sm:py-7",
    titleSize: "clamp(24px, 2.8vw, 36px)",
    iconClass: "h-[26px] w-[26px] sm:h-11 sm:w-11",
    mobileCornerSize: "82px",
    mobileCornerTopOffset: "-20px",
    mobileCornerSideOffset: "-20px",
    mobileCornerScale: 1.08,
  },
  md: {
    cardHeight: "468px",
    radius: "50px",
    cornerSize: "clamp(88px, 7.4vw, 106px)",
    cornerTopOffset: "-16px",
    cornerSideOffset: "-16px",
    cornerScale: 1.18,
    topRightCorner: "/images/arcade/top_right_md.png",
    bottomLeftCorner: "/images/arcade/bottom_left_md.png",
    topRightCornerMobile: "/images/arcade/top_right_lg_mobile.png",
    bottomLeftCornerMobile: "/images/arcade/bottom_left_lg_mobile.png",
    contentPadding: "px-8 sm:px-11 lg:px-12 py-10 sm:py-9",
    titleSize: "clamp(24px, 2.8vw, 36px)",
    iconClass: "h-[26px] w-[26px] sm:h-11 sm:w-11",
    mobileCornerSize: "88px",
    mobileCornerTopOffset: "-24px",
    mobileCornerSideOffset: "-24px",
    mobileCornerScale: 1.1,
  },
  lg: {
    cardHeight: "615px",
    radius: "50px",
    cornerSize: "clamp(94px, 8vw, 114px)",
    cornerTopOffset: "-18px",
    cornerSideOffset: "-18px",
    cornerScale: 1.2,
    topRightCorner: "/images/arcade/top_right_lg.png",
    bottomLeftCorner: "/images/arcade/bottom_left_lg.png",
    topRightCornerMobile: "/images/arcade/top_right_lg_mobile.png",
    bottomLeftCornerMobile: "/images/arcade/bottom_left_lg_mobile.png",
    contentPadding: "px-9 sm:px-14 lg:px-16 py-11 sm:py-10 lg:py-12",
    titleSize: "clamp(24px, 2.8vw, 36px)",
    iconClass: "h-[26px] w-[26px] sm:h-11 sm:w-11",
    mobileCornerSize: "88px",
    mobileCornerTopOffset: "-24px",
    mobileCornerSideOffset: "-24px",
    mobileCornerScale: 1.1,
  },
};

const ArcadeCard = ({
  title,
  icon,
  children,
  className,
  size = "md",
  cardHeight,
  radius,
  contentPadding,
  topRightCorner,
  bottomLeftCorner,
  cornerSize,
  cornerTopOffset,
  cornerSideOffset,
  cornerScale,
}) => {
  const variant = CARD_VARIANTS[size] ?? CARD_VARIANTS.md;
  const resolvedCardHeight = cardHeight ?? variant.cardHeight;
  const resolvedRadius = radius ?? variant.radius;
  const resolvedContentPadding = contentPadding ?? variant.contentPadding;
  const resolvedTopRightCorner = topRightCorner ?? variant.topRightCorner;
  const resolvedBottomLeftCorner = bottomLeftCorner ?? variant.bottomLeftCorner;
  const resolvedTopRightCornerMobile = variant.topRightCornerMobile ?? resolvedTopRightCorner;
  const resolvedBottomLeftCornerMobile = variant.bottomLeftCornerMobile ?? resolvedBottomLeftCorner;
  const resolvedCornerSize = cornerSize ?? variant.cornerSize;
  const resolvedCornerTopOffset = cornerTopOffset ?? variant.cornerTopOffset;
  const resolvedCornerSideOffset = cornerSideOffset ?? variant.cornerSideOffset;
  const resolvedCornerScale = cornerScale ?? variant.cornerScale;
  const resolvedMobileCornerSize = variant.mobileCornerSize ?? resolvedCornerSize;
  const resolvedMobileCornerTopOffset = variant.mobileCornerTopOffset ?? resolvedCornerTopOffset;
  const resolvedMobileCornerSideOffset = variant.mobileCornerSideOffset ?? resolvedCornerSideOffset;
  const resolvedMobileCornerScale = variant.mobileCornerScale ?? resolvedCornerScale;

  return (
    <>
      <style>{`
        .arcade-card-title-line {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.56) 32%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%);
        }

        @media (max-width: 767px) {
          [data-arcade-card-size="sm"] {
            min-height: 275px !important;
            height:  !important;
          }

          [data-arcade-card-size="md"] {
            min-height: 568px !important;
            height: auto !important;
          }

          [data-arcade-card-size="lg"] {
            min-height: 710px !important;
            height: auto !important;
          }

          [data-arcade-card-size="sm"] .arcade-card-content {
            padding-top: 34px !important;
            padding-bottom: 34px !important;
          }

          [data-arcade-card-size="md"] .arcade-card-content {
            padding-top: 38px !important;
            padding-bottom: 38px !important;
          }

          .arcade-mobile-no-button-card .arcade-card-content {
            padding-bottom: clamp(58px, 10vw, 84px) !important;
          }

          .arcade-card-title-text {
            font-size: 26px !important;
            line-height: 0.98 !important;
          }

          .arcade-card-title-line {
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.64) 28%, rgba(255, 255, 255, 0.42) 52%, rgba(255, 255, 255, 0.2) 74%, rgba(255, 255, 255, 0) 100%);
          }
        }
      `}</style>
      <div
        data-arcade-card-size={size}
      className={cn(
        "relative overflow-visible",
        className
      )}
      style={{
        height: resolvedCardHeight,
        minHeight: resolvedCardHeight,
        background: "rgba(255, 0, 0, 0.01)",
        border: "1px solid #8C1414",
        boxShadow:
          "inset 0px 0px 20px rgba(255, 114, 114, 0.4), 0px 0px 22px rgba(255, 7, 7, 0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: resolvedRadius,
      }}
    >
      <img
        src={resolvedTopRightCorner}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden select-none sm:block"
        style={{
          width: resolvedCornerSize,
          height: "auto",
          opacity: 0.96,
          right: resolvedCornerSideOffset,
          top: resolvedCornerTopOffset,
          transform: `scale(${resolvedCornerScale})`,
          transformOrigin: "top right",
          filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))",
        }}
      />

      <img
        src={resolvedTopRightCornerMobile}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 select-none sm:hidden"
        style={{
          width: resolvedMobileCornerSize,
          height: "auto",
          opacity: 0.96,
          right: resolvedMobileCornerSideOffset,
          top: resolvedMobileCornerTopOffset,
          transform: `scale(${resolvedMobileCornerScale})`,
          transformOrigin: "top right",
          filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))",
        }}
      />

      <img
        src={resolvedBottomLeftCorner}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden select-none sm:block"
        style={{
          width: resolvedCornerSize,
          height: "auto",
          opacity: 0.96,
          left: resolvedCornerSideOffset,
          bottom: resolvedCornerTopOffset,
          transform: `scale(${resolvedCornerScale})`,
          transformOrigin: "bottom left",
          filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))",
        }}
      />

      <img
        src={resolvedBottomLeftCornerMobile}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 select-none sm:hidden"
        style={{
          width: resolvedMobileCornerSize,
          height: "auto",
          opacity: 0.96,
          left: resolvedMobileCornerSideOffset,
          bottom: resolvedMobileCornerTopOffset,
          transform: `scale(${resolvedMobileCornerScale})`,
          transformOrigin: "bottom left",
          filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))",
        }}
      />

      {/* Inner content wrapper */}
      <div className={cn("arcade-card-content relative z-10 flex h-full flex-col", resolvedContentPadding)}>
        {/* Header */}
        {title && (
          <div className="mb-6 sm:mb-10">
            <div className="mb-1 flex items-center gap-2 sm:gap-3">
              {icon && <span className={cn("flex shrink-0 -translate-y-[3px] items-center justify-center text-white", variant.iconClass)}>{icon}</span>}
              <h3
                className="arcade-card-title-text font-compacta leading-none text-white tracking-[0.06em]"
                style={{ fontSize: variant.titleSize, lineHeight: 0.95 }}
              >
                {title}
              </h3>
            </div>
            <div
              className="arcade-card-title-line mt-1"
              style={{
                height: "1px",
                borderRadius: "50px",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
      </div>
    </>
  );
};

export default ArcadeCard;
