/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate"
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
    darkMode: ["class"],
    content: [
        "./index.html", // Crucial for Vite: Scans your main HTML file
        "./src/**/*.{js,jsx}", // Scans all JS/JSX files in src/
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                futura: ['Futura', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                titles: "hsl(var(--titles))",
                ring: "hex(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Custom Space Theme Colors (for dark sections)
                space: {
                    dark: "#0A001A", // Very dark purple/blue for background
                    medium: "#1A0033", // Slightly lighter dark purple for sections
                    light: "#2B004D", // Even lighter for card backgrounds
                    accent: "#FF8C00", // Bright orange/gold for highlights
                    glow: "#FFD700", // Gold for glowing effects
                    text: "#E0E0E0", // Light gray for general text
                    subtle: "#4A0080", // Subtle purple for patterns
                    grid: "#3A0066", // For grid lines
                },
                // Custom Footer Colors (for light section)
                footer: {
                    background: "#F8F0FF", // Light purple/pink
                    text: "#330066", // Dark purple text
                    link: "#663399", // Medium purple for links
                    buttonBg: {
                        instagram: "#E1306C",
                        discord: "#7289DA",
                        linkedin: "#0077B5",
                        gmail: "#EA4335",
                    },
                    buttonText: "#FFFFFF",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                glow: {
                    "0%, 100%": { boxShadow: "0 0 5px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.3)" },
                    "50%": { boxShadow: "0 0 15px rgba(255, 215, 0, 0.8), 0 0 25px rgba(255, 215, 0, 0.6)" },
                },
                "star-twinkle": {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                },
                "nebula-move": {
                    "0%": { backgroundPosition: "0% 0%" },
                    "100%": { backgroundPosition: "100% 100%" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "card-expand": {
                    "0%": { width: "100px" },
                    "100%": { width: "400px" },
                },
                "card-collapse": {
                    "0%": { width: "400px" },
                    "100%": { width: "100px" },
                },
                "sparkle-fade-out": {
                    "0%": { opacity: "1", transform: "scale(1)" },
                    "100%": { opacity: "0", transform: "scale(0.5)" },
                },
                "sparkle-glow": {
                    "0%, 100%": { boxShadow: "0 0 5px rgba(255, 215, 0, 0.5)" },
                    "50%": { boxShadow: "0 0 15px rgba(255, 215, 0, 0.8)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in-up": "fade-in-up 0.8s ease-out forwards",
                glow: "glow 2s infinite alternate",
                "star-twinkle": "star-twinkle 3s infinite alternate",
                "nebula-move": "nebula-move 60s linear infinite alternate",
                float: "float 3s ease-in-out infinite",
                "card-expand": "card-expand 0.3s ease-out forwards",
                "card-collapse": "card-collapse 0.3s ease-out forwards",
            },
        },
    },
    plugins: [animate],
}

export default config
