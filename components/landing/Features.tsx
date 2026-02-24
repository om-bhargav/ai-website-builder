import React from "react";
import { Code, Eye, LayoutDashboard, MessageSquare, Package, Server } from "lucide-react";
export const features = [
  {
    title: "Visual Frontend Builder",
    paragraph:
      "Design responsive and interactive web pages using an intuitive drag-and-drop interface. Arrange components, customize layouts, and see your design in real time without writing code.",
    icon: <LayoutDashboard className="w-6 h-6" />,
  },
  {
    title: "AI Code Generation",
    paragraph:
      "Automatically generate production-ready frontend and backend code (React, HTML, CSS, JavaScript) from your visual designs or text prompts, bridging the gap between design and development.",
    icon: <Code className="w-6 h-6" />,
  },
  {
    title: "Backend & Database Builder",
    paragraph:
      "Create APIs, database models, and authentication flows with AI assistance. Manage server-side and database logic visually while ensuring your app is fully functional and secure.",
    icon: <Server className="w-6 h-6" />,
  },
  {
    title: "Real-Time Preview & Deployment",
    paragraph:
      "Preview your application live as you build it, and deploy the full-stack app with a single click to platforms like Vercel, Render, or Supabase. Focus on ideas, not infrastructure.",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    title: "AI Assistant & Smart Suggestions",
    paragraph:
      "Get AI-powered suggestions, auto-complete edits, and guidance while building your app. The assistant helps even complete beginners to enhance layouts, content, and logic effortlessly.",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    title: "Component Library & Upload",
    paragraph:
      "Upload custom code snippets or components and convert them into reusable visual elements. Build a personal component library to accelerate future projects and maintain consistency.",
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
              className="p-[1px] rounded-md bg-gradient-to-r from-purple-500 to-indigo-500"
              key={ind}
            >
              <div className="h-full flex flex-col bg-gray-900 rounded-md p-6 gap-2">
                <div className="rounded-md bg-gradient-to-br from-purple-500 to-indigo-500 self-start p-2">
                  {ele.icon}
                </div>
                <div className="text-xl font-semibold">{ele.title}</div>
                <div>{ele.paragraph}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;
