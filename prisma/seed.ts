import { PrismaClient, STATUS, ROLE, USER_STATUS, TransactionStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

// --- Luxurious Dark Mode HTML Generators ---

const generateTailwindWebsite = (title: string, description: string, imageUrl: string) => `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { 
      darkMode: 'class', 
      theme: { extend: { colors: { brand: '#9333ea', darkbg: '#000000', surface: '#0a0a0a' } } } 
    }
  </script>
</head>
<body class="bg-darkbg text-gray-300 min-h-screen flex flex-col font-sans selection:bg-brand selection:text-white overflow-x-hidden">
  <div class="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand/20 blur-[120px] pointer-events-none"></div>
  <div class="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none"></div>

  <nav class="w-full p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
    <div class="text-2xl font-black tracking-tighter text-white">${title}<span class="text-brand">.</span></div>
    <div class="hidden md:flex gap-8 text-sm font-medium text-gray-400">
      <a href="#" class="hover:text-white transition-colors">Platform</a>
      <a href="#" class="hover:text-white transition-colors">Solutions</a>
      <a href="#" class="hover:text-white transition-colors">Pricing</a>
    </div>
    <button class="px-5 py-2 text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-md transition-all">
      Login
    </button>
  </nav>
  
  <main class="flex-grow flex flex-col items-center p-8 relative z-10">
    <div class="max-w-5xl mx-auto text-center space-y-10 mt-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold tracking-wide uppercase mb-4">
        <span class="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
        System Active
      </div>
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 leading-tight">
        ${title}
      </h1>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
        ${description}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <button class="px-8 py-4 bg-brand hover:bg-purple-500 text-white rounded-lg font-semibold transition-all duration-300 shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)]">
          Initialize Project
        </button>
        <button class="px-8 py-4 bg-surface hover:bg-white/5 border border-white/10 text-white rounded-lg font-semibold transition-all">
          View Documentation
        </button>
      </div>
      
      <div class="mt-16 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
        <img src="${imageUrl}" alt="${title} Preview" class="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  </main>
</body>
</html>
`;

const generateTailwindBlog = (title: string, content: string, imageUrl: string) => `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#000000] text-gray-300 min-h-screen font-sans antialiased selection:bg-purple-600 selection:text-white">
  <article class="max-w-4xl mx-auto px-6 py-24 relative">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none blur-3xl"></div>
    
    <header class="mb-12 text-center relative z-10">
      <h1 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">${title}</h1>
      <div class="flex items-center justify-center gap-4 text-sm font-medium text-gray-500 uppercase tracking-widest">
        <span>Engineering</span>
        <span>•</span>
        <span>${Math.floor(Math.random() * 10) + 3} min read</span>
      </div>
    </header>

    <div class="mb-16 w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
      <img src="${imageUrl}" alt="${title}" class="w-full h-[400px] object-cover" />
    </div>
    
    <div class="prose prose-invert prose-purple max-w-none text-lg leading-loose space-y-8 relative z-10 max-w-3xl mx-auto">
      <p class="text-2xl text-gray-200 font-light border-l-4 border-purple-600 pl-6 bg-gradient-to-r from-purple-900/10 to-transparent py-2">
        ${content}
      </p>
      <p>In today's fast-paced development environment, optimizing your stack is crucial. We explore the deep architectural patterns required to scale seamlessly while maintaining a luxurious user experience.</p>
      
      <div class="my-12 p-6 rounded-xl bg-[#0a0a0a] border border-white/5">
        <h3 class="text-xl font-bold text-white mb-4">Key Takeaways</h3>
        <ul class="list-disc pl-5 space-y-2 text-gray-400">
          <li>Performance is a feature, not an afterthought.</li>
          <li>Dark mode typography requires higher contrast ratios.</li>
          <li>Agentic workflows drastically reduce boilerplate times.</li>
        </ul>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6 tracking-tight">The Technical Implementation</h2>
      <p>By leveraging modern frameworks and serverless infrastructure, we can achieve sub-100ms response times globally. The architecture relies heavily on edge computing and optimized asset delivery.</p>
    </div>
  </article>
</body>
</html>
`;

async function main() {
  console.log("🧹 Clearing existing database records...");
  
  // Clear records in reverse dependency order
  await prisma.transaction.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.submissions.deleteMany();
  await prisma.logTraffic.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.website.deleteMany();
  await prisma.template.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.user.deleteMany();

  console.log("🚀 Initiating Database Seeding...");

  // 1. Create Plans
  const plans = await Promise.all([
    prisma.plan.create({
      data: { title: "Basic", description: "Starter tier", price: 0, websites: 1, active: true },
    }),
    prisma.plan.create({
      data: { title: "Pro", description: "Professional developers", price: 1500, websites: 5, featured: true, active: true },
    }),
    prisma.plan.create({
      data: { title: "Advanced", description: "Agency power", price: 4500, websites: 999, active: true },
    }),
  ]);

  // 2. Create Users (Reduced to 5)
  console.log("👥 Generating 5 Users...");
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: i === 0 ? "Admin Developer" : `User ${i + 1}`,
        email: i === 0 ? "admin@dev.local" : `user${i + 1}@dev.local`,
        role: i === 0 ? ROLE.ADMIN : ROLE.USER,
        status: USER_STATUS.ACTIVATED,
        profileCompleted: true,
        bio: "Full-stack developer building modern web experiences.",
        total_websites: Math.floor(Math.random() * 10),
      },
    });
    users.push(user);
  }

  // 3. Create Exactly 10 Websites
  console.log("🌐 Generating 10 Websites...");
  const websiteNames = [
    "PagePilot AI", "Alfa Space Agrocom", "Presentify Dashboard", 
    "Forge Prototype", "Nexus Analytics", "Quantum Sync", 
    "Aero Network", "Zephyr Platform", "Nova Hub", "Cyber Space"
  ];

  for (let i = 0; i < 10; i++) {
    const title = websiteNames[i];
    const desc = `A high-performance web application designed for modern use cases. Concept build ${i + 1}.`;
    const imageUrl = `https://picsum.photos/seed/${title.replace(/\s/g, "")}Web/1200/800`;

    await prisma.website.create({
      data: {
        title: title,
        description: desc,
        userId: users[Math.floor(Math.random() * users.length)].id,
        thumbnail: imageUrl,
        featured: Math.random() > 0.5,
        status: i % 3 === 0 ? STATUS.UNDER_DEVELOPMENT : STATUS.PUBLISHED,
        views: Math.floor(Math.random() * 5000),
        file: generateTailwindWebsite(title, desc, imageUrl),
      },
    });
  }

  // 4. Create Exactly 10 Templates
  console.log("🎨 Generating 10 Templates...");
  const templateCategories = ["SaaS", "Agency", "Portfolio", "E-commerce", "Admin Dashboard"];

  for (let i = 0; i < 10; i++) {
    const category = templateCategories[i % templateCategories.length];
    const title = i === 0 ? "Luxury Dark Starter" : `${category} Dark Theme v${i}`;
    const desc = i === 0 
      ? "A custom luxury starter template utilizing Vite and Shadcn UI for AI agents." 
      : `Premium ${category.toLowerCase()} template with sleek animations and deep black aesthetics.`;
    const imageUrl = `https://picsum.photos/seed/${title.replace(/\s/g, "")}Tpl/1200/800`;

    await prisma.template.create({
      data: {
        title: title,
        description: desc,
        userId: users[0].id,
        thumbnail: imageUrl,
        status: STATUS.PUBLISHED,
        file: generateTailwindWebsite(title, desc, imageUrl),
      },
    });
  }

  // 5. Create Exactly 8 Blogs
  console.log("📝 Generating 8 Blog Posts...");
  const blogTopics = [
    "Vibe Coding and Multi-Agent Systems",
    "Mastering GSAP ScrollTrigger for Parallax",
    "Next.js App Router Architecture",
    "Why pnpm is the Superior Package Manager",
    "Connecting Prisma to Serverless Neon DB",
    "Framer Motion vs Lenis: Smooth Scrolling",
    "Building with Clerk and Firebase",
    "Designing Futuristic Dark Mode UIs"
  ];

  for (let i = 0; i < 8; i++) {
    const title = blogTopics[i];
    const imageUrl = `https://picsum.photos/seed/${title.replace(/\s/g, "")}Blog/1200/600`;

    await prisma.blog.create({
      data: {
        title: title,
        slug: `blog-post-${i}-${Date.now()}`,
        excerpt: `An in-depth technical analysis of ${title.toLowerCase()} and its impact on modern development.`,
        content: generateTailwindBlog(title, `Exploring the cutting edge of ${title.toLowerCase()}.`, imageUrl),
        coverImg: imageUrl,
        published: true,
        views: Math.floor(Math.random() * 2500),
        tags: ["Engineering", "Frontend", "AI", "Performance"].sort(() => 0.5 - Math.random()).slice(0, 2),
      },
    });
  }

  // 6. Create 10 Transactions
  console.log("💳 Generating 10 Transactions...");
  for (let i = 0; i < 10; i++) {
    const plan = plans[Math.floor(Math.random() * plans.length)];
    await prisma.transaction.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        planId: plan.id,
        title: `${plan.title} Plan Subscription`,
        amount: plan.price,
        status: TransactionStatus.SUCCESS,
      }
    });
  }

  // 7. Create 10 Submissions
  console.log("📬 Generating 10 Submissions...");
  for (let i = 0; i < 10; i++) {
    await prisma.submissions.create({
      data: {
        name: `Lead Generation ${i}`,
        email: `lead${i}@enterprise.com`,
        phone: `+1555${Math.floor(1000000 + Math.random() * 9000000)}`,
        city: ["San Francisco", "London", "Berlin"][Math.floor(Math.random() * 3)],
        message: "Looking to integrate your AI builder infrastructure into our current tech stack.",
        type: "QUERY",
      }
    });
  }

  // 8. Create 30 Days of Traffic Logs
  console.log("📈 Generating 30 Days of Analytics...");
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    await prisma.logTraffic.create({
      data: {
        date: date,
        views: 100 + Math.floor(Math.random() * 500),
      }
    });
  }

  console.log("✅ Database cleared and successfully re-seeded.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });