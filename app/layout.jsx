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

export default function RootLayout({ children, }) {
    return (<html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>);
}