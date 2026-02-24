import React from "react";
import { Check } from "lucide-react";
const plans = [
  {
    title: "Basic",
    price: "$19/mo",
    features: [
      "Visual Frontend Builder",
      "AI Code Generation",
      "Limited Backend APIs",
      "Email Support",
    ],
  },
  {
    title: "Pro",
    price: "$49/mo",
    features: [
      "All Basic Features",
      "Full Backend Builder",
      "Database & Authentication",
      "Priority Support",
      "AI Chat Assistant",
    ],
    highlighted: true, // optional for special styling
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "All Pro Features",
      "Team Collaboration",
      "Custom Integrations",
      "Dedicated Account Manager",
      "One-Click Deployment",
    ],
  },
];
function Pricings() {
  return (
    <div id="pricing" className="container w-full mx-auto p-5">
      <div className="text-3xl font-semibold">
        <h2 className="flex items-center text-3xl font-bold mb-2">
          <span className="w-3 h-7 bg-gradient-to-b from-purple-500 to-indigo-500 rounded mr-2"></span>
          Pricing Plans
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mt-4">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`hover:scale-101 shadow shadow-purple-500 relative p-[1px] rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 transition-transform duration-300 ${
              plan.highlighted ? "" : ""
            }`}
          >
            <div className="bg-gray-900 rounded-xl p-8 flex flex-col h-full">
              <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="flex-1 space-y-2 mb-6">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center">
                    <Check className="p-1 w-4 h-4 text-lg bg-purple-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="cursor-pointer mt-auto py-2 px-6 transition rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricings;
