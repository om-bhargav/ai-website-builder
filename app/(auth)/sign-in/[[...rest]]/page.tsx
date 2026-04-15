"use client";
import Button2 from "@/components/buttons/Button2";
import GoBackButton from "@/components/buttons/GoBackButton";
import GoogleButtonProvider from "@/components/buttons/GoogleButtonProvider";
import Input from "@/components/CustomComponents/Input";
import { Particles } from "@/components/ui/particles";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Login = () => {
  const router = useRouter();
  const [pending,setPending] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try{
      const fd = new FormData(e.currentTarget as any);
      const body = Object.fromEntries(fd);
      const res: any = await signIn("credentials", {
        email: body.email,
        password: body.password,
        redirect: false
      });
      if (res?.error) {
        throw Error("Invalid email or password");
      }
      router.push("/");
    }catch(error: any){
      toast.error(error.message);
    }finally{
      setPending(false);
    }
  };
  return (
    <div>
      <div className="xl:w-screen place-items-center mx-auto grid xl:grid-cols-2 px-3 h-screen w-full">
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

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid">
              <Input type="email" name="email" placeholder="Your Email" />
            </div>

            <div className="grid">
              <Input type="password" name="password" placeholder="Password" />
            </div>
            <Button2 disabled={pending} text={pending ? "Sigining In...":"Start Building"} />

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

          {/* <div className="grid grid-cols-3 gap-3">
            <InfoCard Icon={Monitor} text="Frontend" />
            <InfoCard Icon={Server} text="Backend" />
            <InfoCard Icon={Database} text="Database" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
