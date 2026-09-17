import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Box,
  Bot,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  HardDrive,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Wrench,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";

import { portfolioData } from "@/data/portfolio";

export default function Home() {
  const { personal, stats, projects } = portfolioData;
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [certCarouselApi, setCertCarouselApi] = useState<CarouselApi | null>(null);
  const [certCurrent, setCertCurrent] = useState<number>(1);
  const [certCount, setCertCount] = useState<number>(0);
  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!certCarouselApi) return;

    setCertCount(certCarouselApi.scrollSnapList().length);
    setCertCurrent(certCarouselApi.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCertCurrent(certCarouselApi.selectedScrollSnap() + 1);
    };

    certCarouselApi.on("select", handleSelect);
    return () => {
      certCarouselApi.off("select", handleSelect);
    };
  }, [certCarouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(
      document.querySelectorAll(".tilt-card"),
    );

    if (tilt.length === 0) return;

    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 1.02,
    });

    return () => {
      tilt.forEach((card) => {
        const tiltCard = card as HTMLElement & {
          vanillaTilt?: { destroy: () => void };
        };
        tiltCard.vanillaTilt?.destroy();
      });
    };
  }, [certCarouselApi]);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-24 flex w-full min-w-0 flex-col items-center px-1 sm:mt-32 xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-4xl tracking-tighter text-foreground sm:text-6xl 2xl:text-8xl">
                  {personal.greeting}
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-4xl sm:text-6xl 2xl:text-8xl">
                  {personal.headline}
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                {personal.tagline}
              </p>
            </div>
            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div className="mt-10 w-full min-w-0 max-w-2xl overflow-hidden rounded-2xl border border-primary/30 bg-[#030711]/95 shadow-[0_0_45px_rgba(59,130,246,0.12)] sm:mt-14 xl:mt-0">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4 font-mono text-xs text-slate-500">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3">terminal - bash</span>
            </div>
            <div className="space-y-4 px-5 py-6 font-mono text-sm leading-relaxed sm:px-8 sm:py-8 sm:text-base">
              <p>
                <span className="text-sky-400">~$</span>{" "}
                <span className="text-slate-200">whoami</span>
              </p>
              <p className="text-emerald-400">kulphattnon @ engineering-student</p>
              <p>
                <span className="text-sky-400">~$</span>{" "}
                <span className="text-slate-200">cat focus.txt</span>
              </p>
              <p className="text-emerald-400">
                Robot &amp; Automation · PLC · Arduino · Python · Solidwork
              </p>
              <p>
                <span className="text-sky-400">~$</span>{" "}
                <span className="text-slate-200">status --check</span>
              </p>
              <p className="text-emerald-400">✓ Open to opportunities</p>
              <p className="text-sky-400">
                ~$ <span className="inline-block h-5 w-2 animate-pulse bg-sky-400 align-middle" />
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mt-14 mb-0 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <div className="relative overflow-hidden border border-primary/20 bg-background/40 px-6 py-12 sm:px-10 xl:px-16 xl:py-20">
              <span className="clash-grotesk text-sm font-semibold tracking-[0.2em] text-primary">
                {"// ABOUT_ME"}
              </span>
              <h2 className="mt-5 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl xl:text-8xl">
                WHO <span className="text-gradient">I AM</span>
              </h2>
              <div className="mt-5 h-0.5 w-12 bg-primary" />
              <p className="mt-8 max-w-none text-base font-light leading-relaxed tracking-tight text-muted-foreground md:pr-56 lg:text-lg xl:text-lg">
                {personal.aboutHeadline}
              </p>
              <div className="relative mx-auto mt-12 h-[220px] w-[220px] md:absolute md:right-8 md:top-12 md:mx-0 md:mt-0">
                <div className="absolute inset-0 rounded-full border-2 border-primary/80 bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-1 shadow-[0_0_30px_rgba(121,128,254,0.25)]">
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-primary/20 bg-background">
                    <Image
                      src="/assets/IMG_4771.jpg"
                      alt="Kulphattnon Charoenwut"
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="mt-16 mb-0 sm:mt-24 xl:-mt-56">
            <div className="mb-12">
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-[0.2em]">
                {"// CERTIFICATES"}
              </span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight xl:text-6xl">
                Certificates
              </h2>
              <div className="mt-5 h-0.5 w-12 bg-primary" />
              <p className="mt-4 text-base tracking-tight text-muted-foreground xl:text-lg">
                ใบเกียรติบัตรและใบรับรองที่ได้รับจากการเรียนรู้และการฝึกอบรม
              </p>
              <div className="mt-10">
                <Carousel setApi={setCertCarouselApi} className="w-full">
                  <CarouselContent>
                    {[
                      {
                        title: "AI TECH STARTUP",
                        image: "/certificates/cert-system.png",
                        href: "/certificates/ระบบจัดการการอบรม.pdf",
                      },
                      {
                        title: "การควบคุมหุ่นยนต์อุตสาหกรรมสำหรับการจับชิ้นงาน",
                        image: "/certificates/cert-robot.png",
                        href: "/certificates/การควบคุมหุ่นยนต์อุตสาหกรรมสำหรับการจับชิ้นงาน.pdf",
                      },
                      {
                        title: "หลักสูตร PLC ระดับ ๑",
                        image: "/certificates/cert-plc.png",
                        href: "/certificates/หลักสูตร PLC ระดับ ๑.pdf",
                      },
                      {
                        title: "Python Essentials 1",
                        image: "/certificates/PythonEssentials1-preview.png",
                        href: "/certificates/PythonEssentials1.pdf",
                      },
                      {
                        title: "Fortinet Certified",
                        image: "/certificates/FERTINET.png",
                        href: "/certificates/FERTINET.png",
                      },
                    ].map((certificate) => (
                      <CarouselItem key={certificate.title} className="md:basis-1/2">
                        <Card className="tilt-card overflow-hidden">
                          <CardHeader className="p-0">
                            <Link href={certificate.href} target="_blank">
                              {certificate.image ? (
                                <Image
                                  src={certificate.image}
                                  alt={certificate.title}
                                  width={600}
                                  height={300}
                                  quality={100}
                                  className="aspect-video h-full w-full bg-primary object-cover transition duration-300 hover:scale-105"
                                />
                              ) : (
                                <iframe
                                  src={`${certificate.href}#toolbar=0&navpanes=0&scrollbar=0`}
                                  title={certificate.title}
                                  className="h-[300px] w-full bg-white"
                                />
                              )}
                            </Link>
                          </CardHeader>
                          <CardContent>
                            <CardTitle className="p-4 text-base font-normal tracking-tight">
                              {certificate.title}
                            </CardTitle>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground">
                  <span className="font-semibold">
                    {certCurrent} / {certCount}
                  </span>{" "}
                  certificates
                </div>
              </div>
            </div>
            <div className="mb-24">
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-[0.2em]">
                {"// TECHNICAL_SKILLS"}
              </span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight xl:text-6xl">
                Technical <span className="text-gradient">Skills</span>
              </h2>
              <div className="mt-5 h-0.5 w-12 bg-primary" />
              <div className="mt-12 rounded-2xl border border-white/10 bg-white/[3%] p-5 sm:p-8">
                <div className="flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-4">
                  <span className="flex items-center gap-3 font-semibold text-foreground">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                      <Wrench size={19} />
                    </span>
                    Tools
                  </span>
                  <span className="text-sm text-muted-foreground">8 skills</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { name: "CX Program", Icon: Code2 },
                    { name: "GX Works 3", Icon: Cpu },
                    { name: "ROBO DK", Icon: Bot },
                    { name: "Arduino IDE", Icon: Cpu },
                    { name: "Antigravity", Icon: Box },
                    { name: "VS Code", Icon: Code2 },
                    { name: "Android Studio", Icon: MonitorSmartphone },
                    { name: "SolidWorks 2019", Icon: Wrench },
                  ].map(({ name, Icon }) => (
                    <div
                      key={name}
                      className="group flex min-h-28 flex-col items-center justify-center rounded-xl border border-white/10 bg-background/60 p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10"
                    >
                      <Icon className="mb-3 text-primary transition-transform group-hover:scale-110" size={27} />
                      <span className="text-sm font-medium text-foreground">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Projects
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              รวมโปรเจคที่ทำและการออกแบบชิ้นงาน
            </p>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => {
                const isGoogleDriveProject = project.title === "Key Project Examples";
                return (
                  <Link
                    key={project.title}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-64 flex-col justify-between rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg"
                  >
                    {isGoogleDriveProject ? (
                      <HardDrive className="text-primary transition-transform duration-300 group-hover:scale-110" size={24} />
                    ) : (
                      <Github className="text-primary transition-transform duration-300 group-hover:scale-110" size={24} />
                    )}
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 tracking-tight text-muted-foreground">
                      {project.description}
                    </p>
                    <span className="mt-6 inline-block text-sm text-primary">
                      {isGoogleDriveProject ? "ดูบน Google Drive ↗" : "ดูบน GitHub ↗"}
                    </span>
                  </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="mt-24 mb-32 xl:-mt-32">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mx-auto flex max-w-5xl flex-col items-center text-center"
          >
            <span className="clash-grotesk text-sm font-semibold tracking-[0.2em] text-primary">
              {"// CONTACT"}
            </span>
            <h2 className="mt-5 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl xl:text-7xl">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="mt-5 h-0.5 w-12 bg-primary" />
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground xl:text-lg">
              I&apos;m currently open to opportunities and collaborative projects.
              Feel free to reach out anytime!
            </p>
            <div className="mt-12 grid w-full gap-4 md:grid-cols-2">
              <Link
                href={`mailto:${personal.email}`}
                className="group flex items-center justify-between rounded-xl border border-primary/30 bg-primary/[8%] p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-primary/[14%]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                    <Mail size={22} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Email
                    </span>
                    <span className="mt-1 block font-medium text-foreground">
                      {personal.email}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
              </Link>
              <Link
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[4%] p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/[8%]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                    <Github size={22} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      GitHub
                    </span>
                    <span className="mt-1 block font-medium text-foreground">
                      github.com/{personal.githubUsername}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
              </Link>
              <Link
                href="https://www.facebook.com/kullapatthanonjaroenwut"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[4%] p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/[8%]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl font-semibold text-primary">
                    f
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Facebook
                    </span>
                    <span className="mt-1 block font-medium text-foreground">
                      kullapatthanonjaroenwut
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
              </Link>
              <Link
                href="https://line.me/ti/p/qYYgQSYigx"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/[8%] p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-emerald-500/[14%]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                    <MessageCircle size={22} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      LINE
                    </span>
                    <span className="mt-1 block font-medium text-foreground">
                      LINE
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
              </Link>
            </div>
            <Button asChild className="mt-8 gap-2">
              <a href="/assets/CV.pdf" target="_blank" rel="noreferrer">
                <ExternalLink size={18} />
                Open CV
              </a>
            </Button>
          </div>
        </section>

      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
