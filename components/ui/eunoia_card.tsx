
import { FaLinkedin } from "react-icons/fa"
import Image from "next/image"

const JudgeCard = ({
    name,
    subtitle,
    description,
    image = img,
    linkedIn = "#speakers",
}) => {
    return (
        <div className="relative p-3 w-full max-w-sm h-full">
            {/* Top-left corner bracket */}
            <div className="absolute top-0 left-0 w-6 h-6">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gold" />
                <div className="absolute top-0 left-0 h-full w-[2px] bg-gold" />
            </div>

            {/* Bottom-right corner bracket */}
            <div className="absolute bottom-0 right-0 w-6 h-6">
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gold" />
                <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gold" />
            </div>

            {/* Card with gradient border */}
            <div
                className="relative rounded-sm overflow-hidden p-[2px] h-full"
                style={{
                    background:
                        "linear-gradient(-143deg, #C6831300 0%, #C68313 50%, #C6831300 100%)"
                }}
            >
                <div className="relative bg-purple-2 rounded-sm overflow-hidden flex flex-col h-full">

                    {/* Image — upper 60% */}
                    <div className="w-full overflow-hidden aspect-[4/3]">
                        <Image width={300} height={400}
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>

                    {/* Content — lower 40% */}
                    <div className="p-5 bg-purple-darker/95 flex flex-col">
                        <h3 className="text-foreground font-semibold text-lg mb-1">
                            {name}
                        </h3>

                        <p className="text-gold text-sm mb-3">
                            {subtitle}
                        </p>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                            {description}
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-3 mt-auto">
                            <a
                                href={linkedIn}
                                className="w-9 h-9 rounded-full bg-gold/30 hover:bg-gold/60 transition-colors flex items-center justify-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="h-5 w-5 text-gold" alt="linkedin" />
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JudgeCard
