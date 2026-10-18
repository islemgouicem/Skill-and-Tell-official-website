import "./globals.css";

export const metadata = {
  title: "Skill & Tell",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
};

export const viewport = {
  themeColor: "#0a001a",
};

// Runs before first paint: enables JS-only initial animation states and
// skips the intro loader when it has already played this session.
const bootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');if(sessionStorage.getItem('loaderShown')==='true'){d.setAttribute('data-intro','seen');}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
