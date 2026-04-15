"use client";
import { Particles } from "@/components/ui/particles";
import { useRouter } from "next/navigation";

import Button1 from "@/components/buttons/Button1";
import { AuthStore } from "@/store/AuthInfo";
import { ArrowRight } from "lucide-react";
const MyHeader = () => {
  const { user } = AuthStore();
  const router = useRouter();
  return (
    <div
      id="home"
      className="z-[10] animate-btu relative p-4 w-screen maxn-w-[1400px] lg:min-h-[600px] flex justify-center items-center bg-gradient-to-b from-[#3c1d6f] to-background"
    >
      <div className="container max-w-3xl text-center flex flex-col items-center justify-center gap-5">
        <div className="max-md:text-lg md:text-3xl font-semibold leading-normal">
          Create Stunning, Fully Functional Websites Instantly with Our AI-Powered Builder
        </div>
        <div className="max-md:text-sm md:text-xl text-white leading-normal">
          Empower your business with a professional website built in seconds. Our AI generates
          responsive layouts, engaging content, and polished designs tailored to your brand. Launch
          with confidence and focus on growing your business, while we handle the technical details.
        </div>
        <div className="flex gap-3 flex-col lg:flex-row w-full justify-center">
          {user ? (<Button1
              onClick={() => {
                router.push("/panel");
              }}
              className="md:min-w-[300px] p-6! rounded-full! text-xl"
              text={`Go To Dashboard →`}
            />):(
            <Button1
              onClick={() => {
                router.push("/sign-up");
              }}
              className="md:min-w-[300px] p-6! rounded-full! text-xl"
              text="Get Started"
            />
          )}
        </div>
      </div>
      <Particles
        className="absolute inset-0 w-full"
        quantity={300}
        ease={80}
        color="#ffffff"
        refresh
      />
    </div>
  );
};

export default MyHeader;
