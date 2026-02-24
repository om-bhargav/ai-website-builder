"use client";
import React, { useEffect } from "react";
import { Particles } from "@/components/ui/particles";
import { useRouter } from "next/navigation.js";

import Button1 from "@/components/buttons/Button1";
const MyHeader = () => {
  // const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  return (
    <div
      id="home"
      className="z-[10] animate-btu relative p-4 w-screen maxn-w-[1400px] lg:min-h-[600px] flex justify-center items-center bg-gradient-to-b from-[#3c1d6f] to-black"
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
          {/* {/* {!isSignedIn && ( */}
          <Button1
            onClick={() => {
              router.push("/sign-up");
            }}
            className="md:min-w-[300px] p-6! rounded-full! text-xl"
            text="Get Started"
          />
          {/* )}  */}
          {/* <button onClick={() => {router.push('/login')}} className='w-full text-white bg-gradient-to-br from-indigo-500 to-purple-900 hover:scale-103 transition cursor-pointer rounded-3xl text-xl text-black font-semibold p-3'>Login</button> */}
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
