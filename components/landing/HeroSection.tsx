"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2, Globe, CheckCircle2 } from "lucide-react";

import { Particles } from "@/components/ui/particles";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import Button1 from "@/components/buttons/Button1";
import { AuthStore } from "@/store/AuthInfo";

const features = [
  "AI Generated Layouts",
  "Responsive Design",
  "SEO Friendly Pages",
  "Deploy in Minutes",
];

const stats = [
  { title: "10x Faster", desc: "Website creation speed" },
  { title: "100+", desc: "Design combinations" },
  { title: "24/7", desc: "AI assistance" },
];

export default function MyHeader() {
  const { user } = AuthStore();
  const router = useRouter();

  return (
    <section
      id="home"
      className="relative overflow-hidden w-full min-h-screen flex items-center justify-center"
    >
      {/* Glow Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/20 blur-[120px] rounded-full" />

      {/* Particles */}
      <Particles
        className="absolute inset-0"
        quantity={250}
        ease={80}
        color="#ffffff"
        refresh
      />

      <div className="max-w-[1400px] relative z-10 px-6 py-20 mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <Badge className="mb-5 px-4 py-2 rounded-full bg-white/10 text-white border-white/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Website Builder
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Build Stunning Websites in{" "}
            <span className="bg-gradient-to-r from-pink-400 to-violet-300 bg-clip-text text-transparent">
              Seconds
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Launch a beautiful, responsive, and fully functional website instantly.
            Our AI creates layouts, writes content, and designs everything around
            your business needs.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {user ? (
              <Button1
                onClick={() => router.push("/panel")}
                className="px-8 py-6 rounded-full text-lg min-w-[230px]"
                text="Go To Dashboard"
              />
            ) : (
              <Button1
                onClick={() => router.push("/sign-up")}
                className="px-8 py-6 rounded-full text-lg min-w-[230px]"
                text="Get Started"
              />
            )}

            <button
              onClick={() => router.push("/templates")}
              className="group px-8 py-6 rounded-full border border-white/20 text-white backdrop-blur-md hover:bg-white/10 transition flex items-center justify-center gap-2"
            >
              Explore Templates
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0">
            {features.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-white/90 text-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE CARD UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Card className="border-white/10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-violet-500/20">
                  <Wand2 className="text-violet-300 w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    AI Builder Preview
                  </p>
                  <p className="text-white/60 text-sm">
                    Generate your next website instantly
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {stats.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                    <Globe className="text-cyan-300 w-5 h-5" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-white/10">
                <p className="text-white font-medium">
                  Ready to build your online presence?
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Let AI do the heavy lifting for you.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}