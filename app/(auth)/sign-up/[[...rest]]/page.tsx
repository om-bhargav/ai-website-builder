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
import * as React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { SITE_NAME } from "@/config";
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
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [email, setEmail] = useState("");
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
      throw Error();
    }
    if (body.pass.toString().length < 6) {
      setErrors({
        pass: ["Passwords Length Must be 6 at least!"],
        cpass: ["Passwords Length Must be 6 at least!"],
      });
      throw Error();
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
        }
        throw Error(response.message);
      }
      toast.success(response.message);
      setEmail(body.email as string);
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
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });
      const response = await request.json();
      if (!response.success) {
        if (response.errors) {
          setErrors(mapZodErrors(response.errors));
          return;
        }
        throw Error(response.message);
      }
      toast.success(response.message);
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || pending) return;

    try {
      setPending(true);

      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        console.error(data.message);
        return;
      }

      setResendCooldown(30);
    } catch (error) {
      console.error("Failed to resend OTP", error);
    } finally {
      setPending(false);
    }
  };
  React.useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);
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
              <div className="text-2xl font-semibold tracking-wide capitalize">{SITE_NAME} - Signup</div>
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
            <form
              onSubmit={handleOtp}
              className="grid gap-6 rounded-3xl border border-border/60 bg-background/80 p-6 backdrop-blur-xl"
            >
              <div className="text-center flex flex-col gap-2">
                <div className="text-2xl font-semibold tracking-tight">Verify OTP</div>

                <div className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to your email
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value.replace(/\D/g, ""))}
                  pattern="^[0-9]+$"
                  inputMode="numeric"
                  className="justify-center"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}
                      className="h-14 w-12 rounded-2xl! border-border bg-muted/40 text-lg font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                    <InputOTPSlot
                      index={1}
                      className="h-14 w-12 rounded-2xl border-border bg-muted/40 text-lg font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                    <InputOTPSlot
                      index={2}
                      className="h-14 w-12 rounded-2xl border-border bg-muted/40 text-lg font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                    <InputOTPSlot
                      index={3}
                      className="h-14 w-12 rounded-2xl border-border bg-muted/40 text-lg font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                    <InputOTPSlot
                      index={4}
                      className="h-14 w-12 rounded-2xl border-border bg-muted/40 text-lg font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                    <InputOTPSlot
                      index={5}
                      className="h-14 w-12 rounded-2xl! border-border bg-muted/40 text-lg font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                  </InputOTPGroup>
                </InputOTP>

                <ErrorText error={errors.otp} />

                <div className="text-xs text-muted-foreground">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={pending || resendCooldown > 0}
                    className="font-medium text-primary transition-colors hover:text-primary/80 disabled:opacity-50"
                  >
                    {pending
                      ? "Sending..."
                      : resendCooldown > 0
                        ? `Resend OTP in ${resendCooldown}s`
                        : "Resend OTP"}
                  </button>
                </div>
              </div>

              <Button2
                disabled={pending || otp.length < 6}
                text={pending ? "Verifying..." : "Verify OTP"}
              />

              <button
                type="button"
                onClick={() => setStep("signup")}
                className="text-sm text-center text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Go back
              </button>
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
