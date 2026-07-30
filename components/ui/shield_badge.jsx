import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
const Shield = (props) => {
    // We define the SVG path data once to avoid repeating it.
    const shieldPath = "M83.2344 1.74902C84.3435 2.29852 85.9752 3.08562 88.0723 4.04004C92.2662 5.94882 98.3241 8.52749 105.791 11.2139C120.516 16.5116 140.748 22.2336 162.988 24.0508V88.3203L162.989 88.3389V88.3486C162.99 88.3561 162.99 88.3678 162.99 88.3838C162.991 88.4164 162.993 88.467 162.994 88.5342C162.997 88.6686 163 88.8711 163 89.1377C163 89.6711 162.99 90.4611 162.947 91.4756C162.861 93.5054 162.645 96.433 162.122 100.003C161.076 107.145 158.806 116.844 153.915 127.071C144.167 147.453 123.967 170.024 82 178.597C40.0328 170.024 19.8329 147.453 10.085 127.071C5.1936 116.844 2.92379 107.145 1.87793 100.003C1.35518 96.433 1.13866 93.5054 1.05273 91.4756C1.00979 90.4611 0.999689 89.6711 1 89.1377C1.00016 88.8711 1.00314 88.6686 1.00586 88.5342C1.00722 88.467 1.0088 88.4164 1.00977 88.3838C1.01024 88.3678 1.01049 88.3561 1.01074 88.3486V88.3389L1.01172 88.3203V24.0508C23.252 22.2336 43.4837 16.5116 58.209 11.2139C65.6759 8.52749 71.7338 5.94882 75.9277 4.04004C78.0248 3.08562 79.6565 2.29852 80.7656 1.74902C81.3011 1.48374 81.7144 1.27263 82 1.12598C82.2856 1.27263 82.6989 1.48374 83.2344 1.74902Z";
    return (
    // 1. Parent container is RELATIVE. This is the anchor for its children.
    <div className="relative w-32 h-32 md:w-40 md:h-40">

            {/* Layer 1: SVG background. It is ABSOLUTE. */}
            <svg width="164" height="180" viewBox="0 0 164 180" fill="none" xmlns="http://www.w3.org/2000/svg" 
    // Positioned to fill the relative parent
    className="absolute top-0 left-0 w-full h-full" {...props}>
                {/* This path draws the visible shield */}
                <path d={shieldPath} fill="url(#paint0_linear_2060_8790)" fillOpacity="0.3" stroke="url(#paint1_linear_2060_8790)" strokeWidth="2"/>
                <defs>
                    {/* This defines the shape for clipping the HTML content */}
                    <clipPath id="shield-clip-path">
                        <path d={shieldPath}/>
                    </clipPath>
                    
                    {/* Gradient definitions */}
                    <linearGradient id="paint0_linear_2060_8790" x1="-4" y1="27.381" x2="164.924" y2="150.378" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" stopOpacity="0.5"/>
                        <stop offset="1" stopColor="white" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_2060_8790" x1="-6" y1="19.7143" x2="163.262" y2="145.892" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" stopOpacity="0.5"/>
                        <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                </defs>
            </svg>

            {/* Layer 2: HTML Content. It is ALSO ABSOLUTE. */}
            <div style={{ clipPath: "url(#shield-clip-path)" }} 
    // This is the key fix: making the content layer absolute so it stacks on top.
    className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pt-2">
                {/* Content is now guaranteed to be inside the clipped, stacked container */}
                <div className="flex -space-x-3 overflow-hidden mb-2">
                    <Avatar className="w-8 h-8 lg:w-10 lg:h-10 border-2 border-white">
                        <AvatarImage src="/images/indabax.jpg" alt="Member 1"/>
                        <AvatarFallback>M1</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-white z-10">
                        <AvatarImage src="/images/agri.jpg" alt="Member 2"/>
                        <AvatarFallback>M2</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 lg:w-10 lg:h-10 border-2 border-white">
                        <AvatarImage src="/images/Arcade.jpg" alt="Member 3"/>
                        <AvatarFallback>M3</AvatarFallback>
                    </Avatar>
                </div>
                <p className="text-[#ff6d00] font-bold">5+</p>
                <p className="text-sm md:text-base font-semibold drop-shadow-sm">Events</p>
            </div>

        </div>);
};
export default Shield;
