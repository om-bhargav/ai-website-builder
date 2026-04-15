"use client";
import Button2 from "@/components/buttons/Button2";
import Footer from "@/components/landing/Footer";
import { Particles } from "@/components/ui/particles";
import Link from "next/link";
import Input from "@/components/CustomComponents/Input";
import GoBackButton from "@/components/buttons/GoBackButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { mapZodErrors } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { ErrorText } from "@/components/Errors";
import GoogleButtonProvider from "@/components/buttons/GoogleButtonProvider";
import { signIn } from "next-auth/react";
type SignupErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  pass?: string[];
  cpass?: string[];
  otp?: string[];
};

const Signup = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<SignupErrors>({});
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [pending, setPending] = useState(false);
  const [otp,setOtp] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrors({});
    const fd = new FormData(e.currentTarget as any);
    const body = Object.fromEntries(fd);
    if (body.pass !== body.cpass) {
      setErrors({
        cpass: ["Passwords do not match"],
      });
      return;
    }
    if (body.pass.toString().length < 6) {
      setErrors({
        pass: ["Passwords Length Must be 6 at least!"],
        cpass: ["Passwords Length Must be 6 at least!"],
      });
      return;
    }
    try {
      const request = await fetch("/api/auth/signup/send-otp", {
        method: "POST",
        body: JSON.stringify({ name: body.name, email: body.email, password: body.pass }),
      });
      const response = await request.json();
      if (!response.success) {
        if (response.errors) {
          setErrors(mapZodErrors(response.errors));
          return;
        }
      }
      toast.success(response.message);
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(e.currentTarget as any);
    const body = Object.fromEntries(fd);
    try {
      const request = await fetch("/api/auth/signup/verify-otp", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const response = await request.json();
      if (!response.success) {
        if (response.errors) {
          setErrors(mapZodErrors(response.errors));
          return;
        }
      }
      toast.success(response.message);
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  return (
    <div>
      <div className="xl:w-full place-items-center mx-auto grid xl:grid-cols-2 px-3 h-screen w-full">
        <Particles
          className="absolute inset-0 w-full"
          quantity={300}
          ease={80}
          color="#ffffff"
          refresh
        />
        <div className="flex shadow-lg bg-gray-100/10 max-md:p-5 md:px-10 md:py-2 rounded-xl max-w-lg w-full flex-col gap-5">
          {step === "signup" && <GoBackButton />}
          <div className="flex gap-3 items-center flex-col">
            <img src="/logo.png" className="h-50 select-none" />
            <div className="flex flex-col gap-1 items-center text-center">
              <div className="text-2xl font-semibold tracking-wide">Pagepiolet - Signup</div>
              <div className="text-sm text-gray-200 tracking-wider">
                AI POWERED WEBSITE CREATION NO CODE REQUIRED!
              </div>
            </div>
          </div>

          {step === "signup" ? (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid">
                <Input name="name" placeholder="Your Name" />
                <ErrorText error={errors.name} />
              </div>

              <div className="grid">
                <Input name="email" type="email" placeholder="Your Email" />
                <ErrorText error={errors.email} />
              </div>

              <div className="grid">
                <Input name="pass" type="password" placeholder="Password" />
                <ErrorText error={errors.pass || errors.password} />
              </div>

              <div className="grid">
                <Input name="cpass" type="password" placeholder="Confirm Password" />
                <ErrorText error={errors.cpass} />
              </div>

              <Button2 disabled={pending} text={pending ? "Sending Otp..." : "Get Started"} />
            <GoogleButtonProvider
              value={"Continue With Google"}
              onClick={async () => {
                await signIn("google", { callbackUrl: "/" });
              }}
            />
              <Link
                href="/sign-in"
                className="cursor-pointer text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm text-center"
              >
                Already Have an Account? Login
              </Link>
            </form>
          ) : (
            <form onSubmit={handleOtp} className="grid gap-5">
              <div className="text-center flex flex-col gap-2">
                <div className="text-xl font-semibold">Verify OTP</div>
                <div className="text-sm text-gray-300">
                  Enter the code sent to your mail
                </div>
              </div>

              <div className="grid">
                <Input name="otp" value={otp} onChange={(e)=>{setOtp(e?.target?.value ?? "")}} placeholder="Enter OTP" />
                <ErrorText error={errors.otp} />
              </div>
              <Button2 disabled={pending} text={pending ? "Verifying..." : "Verify OTP"} />

              <div
                onClick={() => setStep("signup")}
                className="text-sm text-center text-gray-400 cursor-pointer hover:text-gray-300"
              >
                Go back
              </div>
            </form>
          )}

          {/* <div className="grid grid-cols-3 gap-3">
            <InfoCard Icon={Monitor} text="Frontend" />
            <InfoCard Icon={Server} text="Backend" />
            <InfoCard Icon={Database} text="Database" />
          </div> */}
        </div>
        <div className="hidden xl:flex -z-2">
          <img src="/side-bar-2.png" className="h-screen w-full" />
        </div>
      </div>
    </div>
  );
};

export default Signup;

export function InfoCard({ Icon, text }: { Icon: any; text: string }) {
  return (
    <div
      className="cursor-pointer flex gap-2 justify-center items-center 
      border rounded-md px-3 py-2 bg-gray-800 border-white
      hover:border-purple-500 hover:shadow-md
      transition-all duration-200"
    >
      <Icon className="text-purple-500 hidden lg:block" />
      <div className="text-sm">{text}</div>
    </div>
  );
}
