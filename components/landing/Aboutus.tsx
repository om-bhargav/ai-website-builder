import React from "react";

function Aboutus() {
  return (
    <div id="aboutus" className="container w-full mx-auto p-5">
      <div className="text-3xl font-semibold">
        <h2 className="flex items-center text-3xl font-bold mb-2">
          <span className="w-3 h-7 bg-gradient-to-b from-purple-500 to-indigo-500 rounded mr-2"></span>
          Know About Us
        </h2>
      </div>
      <div className="grid place-items-center gap-3">
        <img
          src="/about-us.png"
          className="border border-purple-600 rounded-xl w-full lg:h-[600px]"
        />
        <div className="max-md:text-sm md:text-lg text-justify">
          At our core, we empower non-technical founders to bring their ideas to life. Our platform
          combines visual design tools, AI-assisted code generation, backend logic, and one-click
          deployment to make building full-stack websites effortless — no coding experience
          required.Many early-stage entrepreneurs struggle to launch their products due to technical
          barriers. Existing no-code tools or AI code generators are either limited in functionality
          or lack full ownership of the code. We solve this by providing a complete end-to-end
          solution: design visually, generate production-ready code, build backend logic, and deploy
          the project seamlessly.Our mission is to democratize software development. We believe that
          great ideas shouldn’t be limited by technical skills. By combining AI, automation, and
          intuitive design, we enable founders to focus on innovation, not infrastructure.
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
