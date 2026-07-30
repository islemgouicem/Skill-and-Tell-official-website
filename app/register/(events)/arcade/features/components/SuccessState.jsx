import ArcadeButton from "./ArcadeButton";
import ArcadeCard from "./ArcadeCard";
import Image from "next/image";
const SuccessState = ({ onBackHome }) => (<ArcadeCard size="lg" cardHeight="min(440px, calc(100vh - 170px))" contentPadding="px-4 sm:px-6 py-2 sm:py-4" className="arcade-success-card mt-0 mx-auto w-[92%] sm:w-[78%] lg:w-[66%]">
    <div className="arcade-success-inner relative flex flex-1 w-full flex-col text-center sm:gap-5">
      <Image src="/images/arcade/registeration_1.png" alt="" aria-hidden="true" className="arcade-success-decor-reg1-a absolute left-[12%] top-[12%] -translate-x-1/2 -translate-y-1/2" style={{ width: "clamp(124px, 11vw, 162px)" }} width={162} height={162} />
      <Image src="/images/arcade/registeration_1.png" alt="" aria-hidden="true" className="arcade-success-decor-reg1-b absolute left-[18%] top-[26%] -translate-x-1/2 -translate-y-1/2" style={{ width: "clamp(114px, 10vw, 150px)" }} width={150} height={150} />
      <Image src="/images/arcade/reg_2.png" alt="" aria-hidden="true" className="arcade-success-decor-reg2-a absolute right-[16%] bottom-[24%] translate-x-1/2 translate-y-1/2" style={{ width: "clamp(110px, 10vw, 146px)" }} width={146} height={146} />
      <Image src="/images/arcade/reg_2.png" alt="" aria-hidden="true" className="arcade-success-decor-reg2-b absolute right-[10%] bottom-[10%] translate-x-1/2 translate-y-1/2" style={{ width: "clamp(104px, 10vw, 140px)" }} width={140} height={140} />

      <div className="arcade-success-content">
        <div className="arcade-success-copy mx-auto w-full max-w-2xl space-y-2 sm:space-y-3">
          <h2 className="font-compacta text-[clamp(28px,3.4vw,48px)] uppercase tracking-[0.08em] text-white">
            Registration Complete
          </h2>
          <p className="mx-auto max-w-xl font-futura text-[clamp(14px,1.4vw,18px)] leading-relaxed text-white/85">
            Your Arcade registration has been submitted successfully. The Umbra Lab is reviewing your profile… await their verdict.
            and stay alert
          </p>
        </div>

        <div className="arcade-success-actions flex flex-col items-center gap-3 sm:flex-row">
          <div style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))", borderRadius: "40px" }}>
            <ArcadeButton variant="register" className="arcade-success-back-btn" onClick={onBackHome}>
              Back to Arcade
            </ArcadeButton>
          </div>
        </div>
      </div>
    </div>
  </ArcadeCard>);
export default SuccessState;
