export interface StatItem {
  label: string;
  value: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  href: string;
}

export interface ServiceItem {
  service: string;
  description: string;
  iconName: "Code2" | "Frame" | "SearchCheck" | "MonitorSmartphone" | "Eye";
}

export interface PortfolioConfig {
  personal: {
    name: string;
    greeting: string;
    headline: string;
    tagline: string;
    aboutHeadline: string;
    aboutHighlightLink: {
      text: string;
      url: string;
    };
    aboutDescription: string;
    email: string;
    githubUsername: string;
    githubUrl: string;
    badges: string[];
    timeZone: string;
  };
  stats: StatItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
}

export const portfolioData: PortfolioConfig = {
  personal: {
    name: "Portfolio Kulphattnon Charoenwut",
    greeting: "🌸Konnichiwa",
    headline: "Kulphattnon Charoenwut",
    tagline:
      "Do everything well, and you won't have any regrets.",
    aboutHeadline:
      "ผมนายกุลพัทธนนท์ เจริญวุฒิ นักศึกษาปี 4 สาขาวิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์และเทคโนโลยีอุตสาหกรรมมหาวิทยาลัยราชภัฏพิบูลสงคราม ผมมีความสนใจด้าน Robot & Automation มีทักษะ PLC, Arduino, Python และการออกแบบชิ้นงานด้วย SolidWorks พร้อมก้าวไปข้างหน้ามีความรับผิดชอบต่องานและพัฒนาตนเองไปเรื่อยๆสู่สายงาน Robot & Automation",
    aboutHighlightLink: {
      text: "TypeScript, Tailwind, and Next.js",
      url: "https://create.t3.gg/",
    },
    aboutDescription:
      "I build responsive, high-performance web applications with stunning visual appeal and modern architecture.",
    email: "kulphattnon738@gmail.com",
    githubUsername: "godfospy-commits",
    githubUrl: "https://github.com/godfospy-commits",
    badges: ["next.js", "tailwindcss", "typescript", "react"],
    timeZone: "UTC+7",
  },
  stats: [
    { label: "Technologies mastered", value: "8" },
    { label: "Projects completed", value: "11" },
  ],
  projects: [
    {
      title: "cobot-markers-OpenCV-Image",
      description:
        "ระบบตรวจจับวัตถุจากภาพสำหรับโปรเจกต์ด้วยการประมวลผลรูปเดียว",
      href: "https://github.com/godfospy-commits/cobot-markers-OpenCV-Image.git",
    },
    {
      title: "Object Detection ROBO-DK YOLO",
      description:
        "โปรเจกต์ตรวจจับวัตถุด้วยโมเดล YOLO สำหรับใช้งานร่วมกับหุ่นยนต์ ROBO-DK",
      href: "https://github.com/godfospy-commits/Object-Detection-ROBO-DK-YOLO",
    },
    {
      title: "JavaApp",
      description:
        "แอปพลิเคชันที่พัฒนาด้วยภาษา Java ",
      href: "https://github.com/godfospy-commits/JavaApp",
    },
    {
      title: "Solidwork",
      description:
        "ผลงานออกแบบชิ้นงานสามมิติด้วย SolidWorks ",
      href: "https://github.com/godfospy-commits/Solidwork",
    },
    {
      title: "Content",
      description:
        "เนื้อหาโปรเจกต์หลัก",
      href: "https://github.com/godfospy-commits/content",
    },
    {
      title: "Key Project Examples",
      description:
        "ตัวอย่างการทำงาน",
      href: "https://drive.google.com/drive/folders/1uhWYZJx-iAI2WgfJxUuLvqJXPQbkxrKs?usp=sharing",
    },
    {
      title: "status_machinery_real-time",
      description:
        "เช็คสถานะเครื่องจักรแบบเรียลไทม์",
      href: "https://github.com/godfospy-commits/machine-status.git",
    },
    {
      title: "predictive-maintenance-demo",
      description:
        "เช็คสถานะเครื่องจักรแบบเรียลไทม์และคาลการสุขภาพเครื่องจักร ส่งข้อมูลกลับไปที่เครื่องจักร",
      href: "https://github.com/godfospy-commits/predictive-maintenance-demo.git",
    },
    {
      title: "more",
      description:
        "โปรเจกต์เพิ่มเติม",
      href: "https://github.com/godfospy-commits?tab=repositories",
    },
  ],
  services: [
    {
      service: "Frontend Development",
      description:
        "Creating stellar user interfaces and web experiences using the latest technologies.",
      iconName: "Code2",
    },
    {
      service: "UX Design",
      description:
        "Building intuitive, user-centric designs that drive engagement and conversion.",
      iconName: "Frame",
    },
    {
      service: "SEO Optimization",
      description:
        "Enhancing your website's visibility in search engines for increased organic traffic.",
      iconName: "SearchCheck",
    },
    {
      service: "Responsive Design",
      description:
        "Designing websites that look and perform equally well on all devices and screen sizes.",
      iconName: "MonitorSmartphone",
    },
    {
      service: "Backend Development",
      description:
        "Developing robust, scalable server-side logic for a wide range of web applications.",
      iconName: "Eye",
    },
  ],
};
