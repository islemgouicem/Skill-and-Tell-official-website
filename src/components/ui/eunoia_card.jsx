import judgePortrait from "../../assets/badri.jpg"
import { Linkedin, Instagram } from "lucide-react"

const JudgeCard = ({
    name,
    subtitle,
    description,
    image = judgePortrait,
    linkedIn = "#",
    instagram = "#"
}) => {
    return (
        <div className="relative p-3">
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
                className="relative rounded-sm overflow-hidden p-[2px]"
                style={{
                    background:
                        "linear-gradient(-143deg, #C6831300 0%, #C68313 50%, #C6831300 100%)"
                }}
            >
                <div className="relative bg-purple-2 rounded-sm overflow-hidden flex flex-col h-full">

                    {/* Image — upper 60% */}
                    <div className="flex-[0_0_60%] w-full overflow-hidden">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>

                    {/* Content — lower 40% */}
                    <div className="flex-[0_0_40%] p-5 bg-purple-darker/95">
                        <h3 className="text-foreground font-semibold text-lg mb-1">
                            {name}
                        </h3>

                        <p className="text-gold text-sm mb-3">
                            Lorem Ipsum is{" "}
                            <span className="font-medium">simply dummy</span>
                        </p>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {description}
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-3">
                            <a
                                href="https://www.linkedin.com/company/skill-tell-club/"
                                className="w-9 h-9 rounded-full bg-gold/30 hover:bg-gold/60 transition-colors flex items-center justify-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5 text-gold" alt="linkedin" />
                            </a>
                            <a
                                href="https://www.instagram.com/skillntell.club?igsh=MTFzZ3dpMTY2cGV5bg=="
                                className="w-9 h-9 rounded-full bg-gold/30 hover:bg-gold/60 transition-colors flex items-center justify-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5 text-gold" alt="instagram" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JudgeCard
