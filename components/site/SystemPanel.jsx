// Glowing "system window" frame used by the Missions visuals.
export default function SystemPanel({ children, className = "", title }) {
  return (
    <div className={`relative rounded-[18px] border border-Main-300/30 bg-[#12002a]/70 p-5 md:p-7 shadow-[0_0_60px_-10px_rgba(157,78,221,0.55),inset_0_0_40px_rgba(157,78,221,0.12)] backdrop-blur-xl ${className}`}>
      {["left-2 top-2 border-l-2 border-t-2", "right-2 top-2 border-r-2 border-t-2", "left-2 bottom-2 border-l-2 border-b-2", "right-2 bottom-2 border-r-2 border-b-2"].map((c) => (
        <span key={c} aria-hidden="true" className={`absolute h-4 w-4 border-accent-300 ${c}`} />
      ))}
      {title && (
        <div className="mb-4 flex items-center justify-center gap-3 border-b border-Main-300/20 pb-3">
          <span className="h-2 w-2 rotate-45 bg-accent-400 shadow-[0_0_10px_#ff8500]" />
          <span className="font-futura_md_bt text-xs uppercase tracking-[0.35em] text-Main-200">{title}</span>
          <span className="h-2 w-2 rotate-45 bg-accent-400 shadow-[0_0_10px_#ff8500]" />
        </div>
      )}
      {children}
    </div>
  );
}
