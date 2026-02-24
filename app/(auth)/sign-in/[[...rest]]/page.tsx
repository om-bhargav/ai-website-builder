"use client";
import { InfoCard } from "@/app/(auth)/sign-up/[[...rest]]/page";
import Button2 from "@/components/buttons/Button2";
import GoBackButton from "@/components/buttons/GoBackButton";
import GoogleButtonProvider from "@/components/buttons/GoogleButtonProvider";
import Input from "@/components/CustomComponents/Input";
import Footer from "@/components/landing/Footer";
import { Particles } from "@/components/ui/particles";
import { Database, Monitor, Server } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
const Login = () => {
  return (
    <div>
      <div className="xl:w-screen py-5 place-items-center mx-auto grid xl:grid-cols-2 px-3 lg:min-h-screen w-full">
        <Particles
          className="absolute inset-0 w-full"
          quantity={300}
          ease={80}
          color="#ffffff"
          refresh
        />
        <div className="hidden xl:flex -z-2">
          <img src="/side-bar.png" className="h-screen w-full animate-movable" />
        </div>
        <div className="flex shadow-lg bg-gray-100/10 max-md:p-5 md:p-10 rounded-xl max-w-lg w-full flex-col gap-5">
          <GoBackButton />
          <div className="flex gap-3 items-center flex-col">
            <img src="/logo.png" className="h-50 select-none" />
            <div className="flex flex-col gap-1 items-center text-center">
              <div className="text-2xl font-semibold tracking-wide">Pagepiolet - Signin</div>
              <div className="text-sm text-gray-200 tracking-wider">
                AI POWERED WEBSITE CREATION NO CODE REQUIRED!
              </div>
            </div>
          </div>

          <form className="grid gap-5">
            <div className="grid">
              <Input type="email" placeholder="Your Email" />
            </div>

            <div className="grid">
              <Input type="password" placeholder="Password" />
            </div>
            <Button2 text={"Start Building"} />

            {/* Google Signup Button */}
            <GoogleButtonProvider
              value={"Continue With Google"}
              onClick={async () => {
                await signIn("google", { callbackUrl: "/" });
              }}
            />

            <Link
              href="/sign-up"
              className="cursor-pointer text-gray-300 hover:text-gray-400 
      transition-colors duration-200 text-sm text-center"
            >
              Don't Have any account? Signup
            </Link>
          </form>

          <div className="grid grid-cols-3 gap-3">
            <InfoCard Icon={Monitor} text="Frontend" />
            <InfoCard Icon={Server} text="Backend" />
            <InfoCard Icon={Database} text="Database" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
