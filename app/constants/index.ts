export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#howitworks" },
  { label: "Pricing", href: "#pricing" },
  { label: "Roadmap", href: "#roadmap" },
];

export const collabApps = [
  { src: "/collabration/figma.png", name: "Figma" },
  { src: "/collabration/notion.png", name: "Notion" },
  { src: "/collabration/discord.png", name: "Discord" },
  { src: "/collabration/slack.png", name: "Slack" },
  { src: "/collabration/photoshop.png", name: "Photoshop" },
  { src: "/collabration/framer.png", name: "Framer" },
  { src: "/collabration/protopie.png", name: "Protopie" },
  { src: "/collabration/raindrop.png", name: "Raindrop" },
];

export const benefits = [
  { title: "Ask Anything", text: "Allows users to quickly find answers to their questions without any with the help of AI Model.", icon: "/benifits/icon-1.svg", card: "/benifits/card-1.svg", color: "#AC6AFF" },
  { title: "Improve Everyday", text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.", icon: "/benifits/icon-2.svg", card: "/benifits/card-2.svg", color: "#FFC876" },
  { title: "Connect Everywhere", text: "With just one click, you can quickly connect your AI chatbot to various third-party tools and apps.", icon: "/benifits/icon-3.svg", card: "/benifits/card-3.svg", color: "#FF776F" },
  { title: "Fast Responding", text: "Lets users quickly preview and identify the ideal AI tool for them with a visual interface.", icon: "/benifits/icon-4.svg", card: "/benifits/card-4.svg", color: "#7ADB78" },
  { title: "Ask Anything", text: "Allows users to quickly find answers to their questions without any with the help of AI Model.", icon: "/benifits/icon-1.svg", card: "/benifits/card-5.svg", color: "#858DFF" },
  { title: "Improve Everyday", text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.", icon: "/benifits/icon-2.svg", card: "/benifits/card-6.svg", color: "#FF98E2" },
];

export const pricingPlans = [
  {
    name: "Basic", price: "0", desc: "AI chatbot, personalized recommendations",
    features: ["An AI chatbot that can understand your queries", "Personalized recommendations based on your history", "Ability to explore the app and its features without any cost"],
    active: false,
  },
  {
    name: "Premium", price: "9.99", desc: "Advanced AI chatbot, priority access",
    features: ["An advanced AI chatbot that can understand complex queries", "An image generator tool to create realistic images", "Ability to explore the app and its features without any cost"],
    active: true,
  },
  {
    name: "Enterprise", price: "19.99", desc: "Custom AI chatbot, advanced analytics",
    features: ["An AI chatbot that can understand your queries", "Personalized recommendations based on your history", "Ability to explore the app and its features without any cost"],
    active: false,
  },
];

export const roadmapItems = [
  { img: "/roadmap/image-1.png", title: "Voice recognition", text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app.", status: "done", date: "May 2023" },
  { img: "/roadmap/image-2.png", title: "Gamification", text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.", status: "progress", date: "May 2023" },
  { img: "/roadmap/image-3.png", title: "Chatbot Customization", text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.", status: "done", date: "May 2023" },
  { img: "/roadmap/image-4.png", title: "Integration with APIs", text: "Allow the chatbot to access external services and data sources, such as weather APIs or news APIs, to provide more relevant and timely responses.", status: "progress", date: "May 2023" },
];

export const notifications = [
  { img: "/notification/image-2.png", name: "Code Star", text: "AI just helped 1,000+ users", time: "1m ago" },
  { img: "/notification/image-3.png", name: "Melody A", text: "New music generated!", time: "1m ago" },
  { img: "/notification/image-4.png", name: "Luna AI", text: "9 projects created this week.", time: "2m ago" },
];

export const socialLinks = [
  { icon: "/socials/discord.svg", href: "#", label: "Discord" },
  { icon: "/socials/twitter.svg", href: "#", label: "Twitter" },
  { icon: "/socials/instagram.svg", href: "#", label: "Instagram" },
  { icon: "/socials/telegram.svg", href: "#", label: "Telegram" },
  { icon: "/socials/facebook.svg", href: "#", label: "Facebook" },
];

export const footerLinks: Record<string, string[]> = {
  Products: ["Brainwave App", "Pricing", "Changelog", "Features"],
  Company: ["About Us", "Careers", "Blog", "Press"],
  Resources: ["Documentation", "API Reference", "Status", "Community"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Licenses"],
};