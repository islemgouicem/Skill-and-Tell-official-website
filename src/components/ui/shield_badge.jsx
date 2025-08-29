import { Avatar, AvatarImage, AvatarFallback } from "./avatar.jsx"


const Shield = (props) => (
    <svg
        width="164"
        height="180"
        viewBox="0 0 164 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >

        <foreignObject
            x="-15"
            y="-15"
            width="194"
            height="209.619"
        >
            <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                    backdropFilter: "blur(7.5px)",
                    WebkitBackdropFilter: "blur(7.5px)", // Safari / iOS support
                    clipPath: "url(#bgblur_0_2060_8790_clip_path)",
                    height: "100%",
                    width: "100%",
                }}
            />
        </foreignObject>
        <path
            data-figma-bg-blur-radius="15"
            d="M83.2344 1.74902C84.3435 2.29852 85.9752 3.08562 88.0723 4.04004C92.2662 5.94882 98.3241 8.52749 105.791 11.2139C120.516 16.5116 140.748 22.2336 162.988 24.0508V88.3203L162.989 88.3389V88.3486C162.99 88.3561 162.99 88.3678 162.99 88.3838C162.991 88.4164 162.993 88.467 162.994 88.5342C162.997 88.6686 163 88.8711 163 89.1377C163 89.6711 162.99 90.4611 162.947 91.4756C162.861 93.5054 162.645 96.433 162.122 100.003C161.076 107.145 158.806 116.844 153.915 127.071C144.167 147.453 123.967 170.024 82 178.597C40.0328 170.024 19.8329 147.453 10.085 127.071C5.1936 116.844 2.92379 107.145 1.87793 100.003C1.35518 96.433 1.13866 93.5054 1.05273 91.4756C1.00979 90.4611 0.999689 89.6711 1 89.1377C1.00016 88.8711 1.00314 88.6686 1.00586 88.5342C1.00722 88.467 1.0088 88.4164 1.00977 88.3838C1.01024 88.3678 1.01049 88.3561 1.01074 88.3486V88.3389L1.01172 88.3203V24.0508C23.252 22.2336 43.4837 16.5116 58.209 11.2139C65.6759 8.52749 71.7338 5.94882 75.9277 4.04004C78.0248 3.08562 79.6565 2.29852 80.7656 1.74902C81.3011 1.48374 81.7144 1.27263 82 1.12598C82.2856 1.27263 82.6989 1.48374 83.2344 1.74902Z"
            fill="url(#paint0_linear_2060_8790)"
            fillOpacity="0.3"
            stroke="url(#paint1_linear_2060_8790)"
            strokeWidth="2"
        />
        <foreignObject x="0" y="40" width="160px" height="160px">
            <div className="flex flex-col items-center justify-center m-auto overflow-hidden">
                <div className="flex -space-x-3 overflow-hidden mb-4">
                    <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarImage src="/images/Ellipse_1.png?height=32&width=32" alt="Member 1" />
                        <AvatarFallback>M1</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-14 h-14 border-2 border-white z-10">
                        <AvatarImage src="/images/indabax.png?height=32&width=32" alt="Member 2" />
                        <AvatarFallback>M2</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarImage src="/images/Ellipse_3.png?height=32&width=32" alt="Member 3" />
                        <AvatarFallback>M3</AvatarFallback>
                    </Avatar>
                </div>
                <p className="text-[#ff6d00] font-bold">5+</p>
                <p className="text-sm md:text-base font-semibold drop-shadow-sm jusitfy-start">Events</p>
            </div>


        </foreignObject>

        <defs>

            <clipPath
                id="bgblur_0_2060_8790_clip_path"
                transform="translate(15 15)"
            >
                <path d="M83.2344 1.74902C84.3435 2.29852 85.9752 3.08562 88.0723 4.04004C92.2662 5.94882 98.3241 8.52749 105.791 11.2139C120.516 16.5116 140.748 22.2336 162.988 24.0508V88.3203L162.989 88.3389V88.3486C162.99 88.3561 162.99 88.3678 162.99 88.3838C162.991 88.4164 162.993 88.467 162.994 88.5342C162.997 88.6686 163 88.8711 163 89.1377C163 89.6711 162.99 90.4611 162.947 91.4756C162.861 93.5054 162.645 96.433 162.122 100.003C161.076 107.145 158.806 116.844 153.915 127.071C144.167 147.453 123.967 170.024 82 178.597C40.0328 170.024 19.8329 147.453 10.085 127.071C5.1936 116.844 2.92379 107.145 1.87793 100.003C1.35518 96.433 1.13866 93.5054 1.05273 91.4756C1.00979 90.4611 0.999689 89.6711 1 89.1377C1.00016 88.8711 1.00314 88.6686 1.00586 88.5342C1.00722 88.467 1.0088 88.4164 1.00977 88.3838C1.01024 88.3678 1.01049 88.3561 1.01074 88.3486V88.3389L1.01172 88.3203V24.0508C23.252 22.2336 43.4837 16.5116 58.209 11.2139C65.6759 8.52749 71.7338 5.94882 75.9277 4.04004C78.0248 3.08562 79.6565 2.29852 80.7656 1.74902C81.3011 1.48374 81.7144 1.27263 82 1.12598C82.2856 1.27263 82.6989 1.48374 83.2344 1.74902Z" />
            </clipPath>
            <linearGradient
                id="paint0_linear_2060_8790"
                x1="-4"
                y1="27.381"
                x2="164.924"
                y2="150.378"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" stopOpacity="0.5" />
                <stop offset="1" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_2060_8790"
                x1="-6"
                y1="19.7143"
                x2="163.262"
                y2="145.892"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" stopOpacity="0.5" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>

    </svg>
);

export default Shield;
