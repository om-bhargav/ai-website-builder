import React from "react";
import {
  Code,
  Eye,
  LayoutDashboard,
  MessageSquare,
  Package,
  Rocket,
  Server,
  Smartphone,
} from "lucide-react";
export const features = [
  {
    title: "AI Website Generation",
    paragraph:
      "Generate complete modern websites instantly using powerful AI prompts. Create landing pages, portfolios, SaaS apps, dashboards, and business websites without starting from scratch.",
    icon: <LayoutDashboard className="w-6 h-6" />,
  },

  {
    title: "Live Visual Editor",
    paragraph:
      "Edit websites visually with a real-time preview system. Instantly see layout, typography, color, and component changes while building responsive experiences across all devices.",
    icon: <Eye className="w-6 h-6" />,
  },

  {
    title: "One-Click Publishing",
    paragraph:
      "Publish your generated websites instantly with production-ready deployment support. Move from idea to live website in minutes without complex setup or infrastructure management.",
    icon: <Rocket className="w-6 h-6" />,
  },

  {
    title: "Smart AI Assistant",
    paragraph:
      "Chat with an intelligent AI assistant to improve layouts, generate sections, redesign interfaces, and create high-quality frontend code tailored to your project goals.",
    icon: <MessageSquare className="w-6 h-6" />,
  },

  {
    title: "Responsive Modern Design",
    paragraph:
      "Every generated website is fully responsive and optimized for mobile, tablet, and desktop devices with modern UI patterns, smooth animations, gradients, and premium styling.",
    icon: <Smartphone className="w-6 h-6" />,
  },

  {
    title: "Templates & Showcase System",
    paragraph:
      "Browse featured templates, explore community showcases, and launch projects faster using professionally designed starter layouts powered by AI-generated components.",
    icon: <Package className="w-6 h-6" />,
  },
];
function Features() {
  return (
    <div id="features" className="container w-full mx-auto p-5 flex flex-col gap-4">
      <div className="text-3xl font-semibold">
        <h2 className="flex items-center text-3xl font-bold mb-2">
          <span className="w-3 h-7 bg-gradient-to-b from-purple-500 to-indigo-500 rounded mr-2"></span>
          Features
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-3">
        {features.map((ele, ind) => {
          return (
            <div
              key={ind}
              className="rounded-md bg-gradient-to-r from-primary/20 to-primary/5 p-[1px]"
            >
              <div className="flex h-full flex-col gap-2 rounded-md bg-sidebar p-6">
                <div className="self-start rounded-md bg-primary/10 p-2 text-primary">
                  {ele.icon}
                </div>

                <div className="text-xl font-semibold text-foreground">{ele.title}</div>

                <div className="text-sm text-muted-foreground">{ele.paragraph}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;
